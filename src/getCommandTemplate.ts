import mkdirp from 'mkdirp';
import path from 'path';
import { Global } from './global';
import { transpile } from './transpliler';
import { PuppeteerJson, PuppeteerJsonObj } from './type';

const getCapturePath = (
  fileIdx: number,
  idx: number,
  def: PuppeteerJsonObj
) => {
  const id = Object.entries(def)
    .map(([k, v]) => `${k}=${v}`)
    .join(',');
  const specFilePath = Global.JSONs[fileIdx];
  const fileName = `${path.basename(specFilePath)}_${idx.pad()}_${id}`
    .encode()
    .add('.png');

  const dirPath =
    Global.option.captureDir !== undefined
      ? path.join(Global.option.captureDir, path.dirname(specFilePath))
      : path.join(path.dirname(specFilePath), 'capture');
  mkdirp(dirPath);

  return path.join(path.relative(process.cwd(), dirPath), fileName);
};

export function getCommandTemplate(defs: PuppeteerJson, fileIdx: number) {
  return defs
    .map(transpile)
    .map(({ code, def }, idx) =>
      code
        .add(
          `
            await delay(${Global.option.delay})`
        )
        .add(
          Global.option.capture
            ? `
            await page.screenshot({
              path: "${getCapturePath(fileIdx, idx, def)}",
              type: 'png',
              fullPage: true
            });`
            : ``
        )
    )
    .map((code) =>
      code
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line !== '')
        .map((line) => `\t${line}`)
        .join('\n')
    )
    .join('\n\n');
}

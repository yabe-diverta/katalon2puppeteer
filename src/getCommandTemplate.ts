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

  return path.join(path.dirname(specFilePath), 'capture', fileName);
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

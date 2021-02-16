import path from 'path';
import { Global } from './global';
import { transpile } from './transpliler';
import { PuppeteerJson, PuppeteerJsonObj } from './type';

const getCaptureFilePath = (
  fileIdx: number,
  idx: number,
  def: PuppeteerJsonObj
) => {
  const id = Object.entries(def)
    .map(([k, v]) => `${k}=${v}`)
    .join(',');
  const specFilePath = Global.JSONs[fileIdx];
  return `${path.basename(specFilePath)}_${idx.pad()}_${id}`
    .encode()
    .add('.png');
};
export function getCommandTemplate(defs: PuppeteerJson, fileIdx: number) {
  return defs
    .map(transpile)
    .map(({ code, def }, idx) =>
      code.add(`
            await delay(${Global.option.delay})
      `).add(`
            await page.screenshot({
              path: \`\${captureDir}\${require('path').sep}${getCaptureFilePath(
                fileIdx,
                idx,
                def
              )}\`,
              type: 'png',
              fullPage: true
            });
      `)
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

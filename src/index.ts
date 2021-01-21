import fs from 'fs';
import glob from 'glob';
import mkdirp from 'mkdirp';
import path from 'path';
import './extensions';
import { Global } from './global';
import { transpile } from './transpliler';
import { CommandOption, PuppeteerJson, PuppeteerJsonObj } from './type';

const getWholeScriptTemplate = (commandTemplate: string) => `
const fs = require('fs')
const puppeteer = require('puppeteer');

function mkdir(dirName) {
  if (!fs.existsSync(dirName)){
    fs.mkdirSync(dirName);
  }
}
mkdir('${path.join(Global.option.output, 'capture')}');

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

(async () => {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: { width: 1920, height: 1080 },
      args: ['--start-maximized']
    });
    const page = await browser.newPage();
      try {
      const extensions = require('puppeteer-extensions')(page);
      extensions.turnOffAnimations();
    } catch (e) {
      const msg = \`
      \\x1b[33mpuppeteer-extensions would work better for your e2e testing,
      see https://github.com/HuddleEng/puppeteer-extensions#miscellaneous
      \\x1b[0m\${e}
      \`
        .split('\\n')
        .map((line) => line.trim())
        .join('\\n');
      console.info(msg);
    }
    let element, formElement, tabs;

${commandTemplate}

    await browser.close();
})();
`;

const getCapturePath = (
  jsonName: string,
  idx: number,
  def: PuppeteerJsonObj
) => {
  const id = Object.entries(def)
    .map(([k, v]) => `${k}=${v}`)
    .join(',');
  const fileName = `${jsonName}_${idx.pad()}_${id}`.encode().add('.png');
  return path.join(Global.option.output, 'capture', fileName);
};

const getCommandTemplate = (defs: PuppeteerJson, fileIdx: number) =>
  defs
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
            path: "${getCapturePath(
              path.basename(Global.JSONs[fileIdx]),
              idx,
              def
            )}",
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

export function create(option: CommandOption) {
  Global.option = option;
  Global.JSONs = glob.sync(option.input);

  Global.JSONs.map((p) => require(path.join(process.cwd(), p)) as PuppeteerJson)
    .map(getCommandTemplate)
    .map(getWholeScriptTemplate)
    .forEach((res, idx) => {
      const name = path.basename(Global.JSONs[idx]);
      const writeFileName = name.replace(/\.json$/gi, '.e2e.test.js');
      const p = path.join(option.output, writeFileName);
      mkdirp.sync(path.dirname(p));
      fs.writeFileSync(p, res, { encoding: 'utf8' });
    });
}

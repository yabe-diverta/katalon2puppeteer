import path from 'path';
import { Global } from './global';

export function getWholeScriptTemplate(commandTemplate: string, idx: number) {
  return `
const fs = require('fs')
const puppeteer = require('puppeteer');

function mkdir(dirName) {
  if (!fs.existsSync(dirName)){
    fs.mkdirSync(dirName);
  }
}
mkdir('${path.join(path.dirname(Global.JSONs[idx]), 'capture')}');

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

(async () => {
    const browser = await puppeteer.launch({
      headless: ${Global.option.headless},
      defaultViewport: {
        width: ${Global.option.viewportWidth},
        height: ${Global.option.viewportHeight}
      },
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
}

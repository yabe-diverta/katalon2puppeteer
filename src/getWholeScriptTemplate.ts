import path from 'path';
import { Global } from './global';

function getCaptureDir(idx: number) {
  const dirPath = path.join(path.dirname(Global.JSONs[idx]), 'capture');
  return path.relative(process.cwd(), dirPath);
}

function getAuthExecutorTemplate() {
  const basicAuth = Global.option.basicAuth;
  if (basicAuth === undefined || !basicAuth?.includes(':')) {
    return ``;
  }

  const [username, password] = basicAuth.split(':');
  return `
  await page.authenticate({
    username: '${username}',
    password: '${password}',
  });`;
}

export function getWholeScriptTemplate(commandTemplate: string, idx: number) {
  return `
const fs = require('fs')
const puppeteer = require('puppeteer');

function mkdir(dirName) {
  if (!fs.existsSync(dirName)){
    fs.mkdirSync(dirName);
  }
}
const captureDir = process.argv.slice(2)[0] !== undefined
  ? process.argv.slice(2)[0]
  : '${getCaptureDir(idx)}';
mkdir(captureDir);

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless:
        process.argv.slice(2)[1] !== undefined &&
        process.argv.slice(2)[1] === '--headless',
      defaultViewport: {
        width: ${Global.option.viewportWidth},
        height: ${Global.option.viewportHeight}
      },
      args: ['--start-maximized', '--lang=en-US']
    });
  
    const page = await browser.newPage();
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'language', {
        get: () => 'en-US',
      });
      Object.defineProperty(navigator, 'languages', {
        get: () => ['en-US', 'en'],
      });
    });
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US',
    });
  
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
  
${getAuthExecutorTemplate()}
  
${commandTemplate}
  
    await browser.close();
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
})();
`;
}

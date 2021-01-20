import './extensions';
import { transpile } from './transpliler';
import { CommandOption } from './type';
import path from 'path';
import glob from 'glob';
import fs from 'fs';

const getWholeScriptTemplate = (commandTemplate: string) => `
const puppeteer = require('puppeteer');

function delay(time) {
	return new Promise(function(resolve) { 
		setTimeout(resolve, time)
	});
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

const getCommandTemplate = (defs: any[]) =>
  defs
    .map(({ command, target, value, basicAuth: basicAuth }) => ({
      command: command.toLowerCase(),
      target: target.toLowerCase(),
      value,
      basicAuth,
    }))
    .map(transpile)
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
  const JSONs = glob.sync(option.input);
  const basicAuth = option.basicAuth?.split(':') ?? ['', ''];

  JSONs.map((p) => require(path.resolve(process.cwd(), p)))
    .map((def) =>
      def.map((d: any) => {
        d.basicAuth = basicAuth;
        return d;
      })
    )
    .map(getCommandTemplate)
    .map(getWholeScriptTemplate)
    .forEach((res, idx) => {
      const name = path.basename(JSONs[idx]);
      const writeFileName = name.replace(/\.json$/gi, '.e2e.test.js');
      const p = path.resolve(option.output, writeFileName);
      fs.writeFileSync(p, res, { encoding: 'utf8' });
    });
}

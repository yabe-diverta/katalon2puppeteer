import fs from 'fs';
import glob from 'glob';
import mkdirp from 'mkdirp';
import path from 'path';
import './extensions';
import { getWholeScriptTemplate } from './getWholeScriptTemplate';
import { getCommandTemplate } from './getCommandTemplate';
import { Global } from './global';
import { CommandOption, PuppeteerJson } from './type';

export function create(option: CommandOption) {
  Global.option = option;
  Global.JSONs = glob.sync(option.input);

  Global.JSONs.map((p) => require(path.join(process.cwd(), p)) as PuppeteerJson)
    .map(getCommandTemplate)
    .map(getWholeScriptTemplate)
    .forEach((res, idx) => {
      const filePath = Global.JSONs[idx].replace(/\.json$/gi, '.e2e.test.js');
      mkdirp.sync(path.dirname(filePath));
      fs.writeFileSync(filePath, res, { encoding: 'utf8' });
    });
}

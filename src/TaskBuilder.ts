import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';
import prettier from 'prettier';
import { absolutePath } from './path2abolutePath';
import transpile from './transpiler';
import { CommandOption, PuppeteerJson, PuppeteerJsonObj } from './type';

const prettierConfig = {
  parser: 'babel',
  trailingComma: 'es5' as 'es5',
  tabWidth: 4,
  semi: false,
  singleQuote: true,
};

export class TaskBuilder {
  newDirPath!: string;
  puppeteerJson!: PuppeteerJson;

  fileDefinitions: { fileName: string; code: string }[] = [];

  getTaskPath(...opt: string[]): string {
    return path.resolve(this.newDirPath, 'task', ...(opt || []));
  }

  init(jsonPath: string, newDirPath: string) {
    this.newDirPath = newDirPath;
    this.puppeteerJson = require(absolutePath(jsonPath)) as PuppeteerJson;
    return this;
  }

  createTaskFileDefinitions() {
    this.puppeteerJson.forEach((d, idx) =>
      this.createTaskFileDefinition(d, idx)
    );
    return this;
  }

  createTaskFileDefinition(puppeteerJsonObj: PuppeteerJsonObj, idx: number) {
    const def = {
      fileName: this.getTaskPath(
        `${this.puppeteerJson[idx].command}.${idx}.js`
      ),
      code: transpile(puppeteerJsonObj),
    };
    this.fileDefinitions.push(def);
    return this;
  }

  createIndexJsDefinition(option: CommandOption) {
    const srcsStr = this.fileDefinitions
      .map(({ fileName }) => path.basename(fileName).replace('.js', ''))
      .map((src) => `'${src}'`)
      .join(',\n');

    const code = `
    const fs = require('fs');
    const path = require('path');
    
    const waitMilliSecond = ${option.delay};
    
    const tasks = [
      ${srcsStr}
    ].map((promiseFactoryName) => ({
      promiseFactoryName,
      promiseFactory: require(path.resolve(__dirname, promiseFactoryName)),
      waitMilliSecond,
    }));
    
    module.exports = tasks;
    `;

    this.fileDefinitions.push({
      fileName: this.getTaskPath(`index.js`),
      code,
    });

    return this;
  }

  writeFiles() {
    mkdirp.sync(this.getTaskPath());
    this.fileDefinitions
      .map((d) => ({ ...d, code: prettier.format(d.code, prettierConfig) }))
      .forEach(({ fileName, code }) => {
        fs.writeFileSync(fileName, code, { encoding: 'utf8' });
      });
    return this;
  }
}

import './ext';
import glob from 'glob';
import { copyStaticTemplates } from './copyStaticTemplates';
import { createNewDir } from './createNewDir';
import { TaskBuilder } from './TaskBuilder';
import { CommandOption } from './type';

export function create(option: CommandOption) {
  glob.sync(option.input).forEach((jsonPath) => {
    const newDirPath = createNewDir(jsonPath);
    copyStaticTemplates(newDirPath);
    new TaskBuilder()
      .init(jsonPath, newDirPath)
      .createTaskFileDefinitions()
      .createIndexJsDefinition(option)
      .writeFiles()
  });
}

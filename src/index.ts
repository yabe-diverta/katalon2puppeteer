import './ext';
import { copyStaticTemplates } from './copyStaticTemplates';
import { createNewDir } from './createNewDir';
import { absolutePath } from './path2abolutePath';
import { TaskBuilder } from './TaskBuilder';
import { CommandOption } from './type';

export function create(jsonPaths: string[] = [], option: CommandOption) {
  jsonPaths.map(absolutePath).forEach((jsonPath) => {
    const newDirPath = createNewDir(jsonPath);
    copyStaticTemplates(newDirPath);
    new TaskBuilder()
      .init(jsonPath, newDirPath)
      .createTaskFileDefinitions()
      .createIndexJsDefinition(option)
      .writeFiles();
  });
}

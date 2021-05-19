import fs from 'fs';
import glob from 'glob';
import path from 'path';

export function copyStaticTemplates(newDirPath: string) {
  glob
    .sync(path.resolve(__dirname, '..', 'template', '*.js'))
    .forEach((staticTemplatePath) => {
      console.log(newDirPath, staticTemplatePath)
      const dist = path.resolve(newDirPath, path.basename(staticTemplatePath));
      fs.copyFileSync(staticTemplatePath, dist);
    });
}

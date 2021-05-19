import mkdirp from 'mkdirp';
import path from 'path';
import rimraf from 'rimraf';

export function createNewDir(jsonPath: string) {
  const basename = path.basename(jsonPath);
  const extTrimmedBaseName = basename.replace(path.extname(basename), '');
  const dirName = path.dirname(jsonPath);
  const newDir = path.resolve(dirName, extTrimmedBaseName);

  rimraf.sync(newDir);
  return mkdirp.sync(newDir) || (newDir as string);
}

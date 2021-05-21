import path from 'path';

export function absolutePath(relateOrAbsolutePath: string) {
  return path.isAbsolute(relateOrAbsolutePath)
    ? relateOrAbsolutePath
    : path.resolve(process.cwd(), relateOrAbsolutePath);
}

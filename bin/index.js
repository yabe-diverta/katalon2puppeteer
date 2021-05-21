#!/usr/bin/env node

'use strict';

const path = require('path');
const pkg = require(path.resolve(__dirname, '..', 'package.json'));

const Transpiler = require(path.resolve(__dirname, '../dist/index.js'));

/**
 * Module dependencies.
 */
const program = require('commander');

const jsonPaths = [];
program
  .name(Object.keys(pkg.bin)[0])
  .version(pkg.version)
  .usage('test/e2e/*.json [options]')
  .option(
    '--delay <ms>',
    'number that specifies dalaying after each operation executed.',
    0
  )
  .arguments('<jsonFilesPath>')
  .description(pkg.description, {
    jsonFilesPath: 'katalon json files path (blob)',
  })
  .action(() => {
    const args = process.argv.slice(2);
    const optionsIdx = args.findIndex((v) => /^-/.test(v));
    const pths = optionsIdx === -1 ? args : args.slice(0, optionsIdx);
    pths.forEach((p) => jsonPaths.push(p));
  })
  .parse();

if (Transpiler) {
  Transpiler.create(jsonPaths, program.opts());
  process.exit(0);
}

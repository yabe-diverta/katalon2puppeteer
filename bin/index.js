#!/usr/bin/env node

'use strict';

const path = require('path');
const pkg = require(path.resolve(__dirname, '..', 'package.json'));

/**
 * Module dependencies.
 */
const program = require('commander');

program
  .name('katalon-json-to-puppetter-transpiler')
  .usage('[options]')
  .version(pkg.version)
  .requiredOption(
    '-i, --input <value>',
    "path for JSON files (requires enclosing with single quotation when you use glob, e.g. './test/**/*.json')."
  )
  .option(
    '--delay <ms>',
    'number that specifies dalaying after each operation executed.',
    0
  )
  .parse(process.argv);

const Transpiler = require(path.resolve(__dirname, '../dist/index.js'));

if (Transpiler) {
  const options = program.opts();
  Transpiler.create(options);
  process.exit(0);
}

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
  .option('-o, --output <value>', 'Output directory', process.cwd())
  .option('--basicAuth <username>:<password>', 'BASIC authentication info.')
  .parse(process.argv);

const Transpiler = require(path.resolve(__dirname, '../dist/index.js'));

if (Transpiler) {
  const options = program.opts();
  // try {
  Transpiler.create(options);
  process.exit(0);
  // } catch (err) {
  //   console.error(error);
  //   process.exit(1);
  // }
}

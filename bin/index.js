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
  .option('--basicAuth <username>:<password>', 'BASIC authentication info.')
  .option('--capture', 'either cpture screenshot of not.', false)
  .option('--headless', 'either enable chrome headless mode.', false)
  .option(
    '--delay <ms>',
    'number that specifies dalaying after each operation executed.',
    0
  )
  .option('--viewportWidth <width>', 'viewport width.', 1920)
  .option('--viewportHeight <height>', 'viewport height.', 1080)
  .parse(process.argv);

const Transpiler = require(path.resolve(__dirname, '../dist/index.js'));

if (Transpiler) {
  const options = program.opts();
  options.basicAuth =
    options.basicAuth !== undefined ? options.basicAuth.split(':') : ['', ''];
  Transpiler.create(options);
  process.exit(0);
}

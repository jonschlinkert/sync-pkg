#!/usr/bin/env node

const chalk = require('chalk');
const cwd = require('cwd');

// Why more?
require('./')();

if(require(cwd('package.json')).version === require(cwd('bower.json')).version) {
  var v = require(cwd('bower.json')).version;
  console.log(chalk.green('>> Success.'), 'updated bower.json to ' + chalk.green(' v' + v));
}

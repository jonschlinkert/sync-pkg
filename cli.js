#!/usr/bin/env node

const chalk = require('chalk');

// Why more?
require('./')();

if(require('./package.json').version === require('./bower.json').version) {
  var v = require('./bower.json').version;
  console.log(chalk.green('>> Success.'), 'updated bower.json to ' + chalk.green(' v' + v));
}

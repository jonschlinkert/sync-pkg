#!/usr/bin/env node

'use strict';

var argv = require('minimist')(process.argv.slice(2));
var symbol = require('log-symbols');
var writeJson = require('write-json');
var sync = require('./');

var patterns = argv.p || argv.patterns  || [];
writeJson('bower.json', sync(patterns));

console.log();
console.log('  updated bower.json ' + symbol.success);
console.log();

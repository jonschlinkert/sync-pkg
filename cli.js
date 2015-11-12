#!/usr/bin/env node

'use strict';

var argv = require('minimist')(process.argv.slice(2));
var green = require('ansi-green');
var symbol = require('success-symbol');
var writeJson = require('write-json');
var sync = require('./');

var patterns = argv.p || argv.patterns  || [];
writeJson('bower.json', sync(patterns, argv));

console.log();
console.log('  updated bower.json ' + green(symbol.success));
console.log();

'use strict';

var fs = require('fs');
var path = require('path');
var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('bower-store', 'Bower');
require('diff');
require('extend-shallow', 'extend');
require('fs-exists-sync', 'exists');
require('load-pkg', 'pkg');
require('log-utils', 'log');
require('minimist');
require('normalize-pkg', 'Normalizer');
require('object.omit', 'omit');
require = fn;

utils.diffJson = function(a, b, method) {
  utils.diff[method || 'diffLines'](a, b).forEach(function(stat) {
    process.stderr.write(utils.log.colors[color(stat)](stat.value));
  });
  console.error();
};

function color(stat) {
  if (stat.removed) return 'red';
  if (stat.added) return 'green';
  return 'gray';
}

utils.ignore = [
  'node_modules',
  'bower_components',
  'actual',
  'fixtures',
  'test.js',
  'test',
  'temp',
  'tmp'
];

utils.remove = [
  'preferGlobal',
  'author',
  'verb'
];

/**
 * Cast `val` to an array
 */

utils.arrayify = function(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
};

/**
 * Expose `utils` modules
 */

module.exports = utils;

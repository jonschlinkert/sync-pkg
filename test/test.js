'use strict';

require('mocha');
var assert = require('assert');
var sync = require('..');

describe('fields', function() {
  describe('main', function() {
    it('should cast main to an array', function() {
      var pkg = {main: 'index.js', description: 'foo', author: 'Jon Schlinkert'};
      var bower = sync(pkg, {});
      assert(Array.isArray(bower.main));
    });
  });
});

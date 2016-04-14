'use strict';

require('mocha');
var assert = require('assert');
var sync = require('..');

describe('field.ignore', function() {
  it('should populate an ignore field with defaults if undefined', function() {
    var pkg = {main: 'index.js', description: 'foo', author: 'Jon Schlinkert'};
    var bower = sync(pkg, {});
    console.log(bower);
    assert(Array.isArray(bower.ignore));
  });
});

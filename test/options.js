'use strict';

require('mocha');
var assert = require('assert');
var sync = require('..');

describe('options', function() {
  describe('omit', function() {
    it('should omit the specified keys from bower.json', function() {
      var pkg = {main: 'index.js', description: 'foo', blah: ''};
      assert(!sync(pkg, {}, {omit: ['main']}).hasOwnProperty('main'));
      assert(!sync(pkg, {}, {omit: ['description']}).hasOwnProperty('description'));
    });

    it('should omit the specified keys', function() {
      var pkg = {main: 'index.js', description: 'foo', name: 'bar'};
      var bower = {};
      var config = sync(pkg, bower, {omit: ['main', 'description']});
      assert(!config.hasOwnProperty('main'));
      assert(!config.hasOwnProperty('description'));
      assert.equal(config.name, 'bar');
    });

    it('should omit empty properties', function() {
      var pkg = {main: 'index.js', description: '', name: 'bar', authors: []};
      var bower = {};
      var config = sync(pkg, bower, {omitEmpty: true});
      assert(config.hasOwnProperty('main'));
      assert(!config.hasOwnProperty('description'));
      assert(!config.hasOwnProperty('authors'));
      assert.equal(config.name, 'bar');
    });
  });
});

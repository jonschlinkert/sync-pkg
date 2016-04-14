'use strict';

require('mocha');
var assert = require('assert');
var sync = require('..');

describe('field.authors', function() {
  it('should convert an author string to authors array', function() {
    var config = sync({author: 'Jon Schlinkert'});
    assert.deepEqual(config.authors, ['Jon Schlinkert']);
  });

  it('should convert an author array to authors array', function() {
    var config = sync({author: ['Jon Schlinkert']});
    assert.deepEqual(config.authors, ['Jon Schlinkert']);
  });

  it('should convert an author object to authors array', function() {
    var config = sync({author: {name: 'Jon Schlinkert'}});
    assert.deepEqual(config.authors, ['Jon Schlinkert']);
  });

  it('should convert an author object with url to authors array', function() {
    var config = sync({author: {name: 'Jon Schlinkert', url: 'https://github.com/jonschlinkert'}});
    assert.deepEqual(config.authors, ['Jon Schlinkert (https://github.com/jonschlinkert)']);
  });

  it('should convert an authors object with url to authors array', function() {
    var config = sync({
      authors: [
        {name: 'Jon Schlinkert', url: 'https://github.com/jonschlinkert'},
        {name: 'Brian Woodward', url: 'https://github.com/doowb'}
      ]
    });
    assert.deepEqual(config.authors, [
      'Brian Woodward (https://github.com/doowb)',
      'Jon Schlinkert (https://github.com/jonschlinkert)',
    ]);
  });
});

describe('sync-pkg', function() {

  describe('contributors', function() {
    it('should add package contributors to bower contributors', function() {
      var config = sync({contributors: ['Anders D. Johnson']});
      assert.deepEqual(config.contributors, ['Anders D. Johnson']);
    });
  });
});

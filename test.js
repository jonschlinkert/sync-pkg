'use strict';

require('mocha');
var assert = require('assert');
var sync = require('./');

describe('sync', function () {
  it('should omit keys from bower.json', function () {
    assert.equal(sync(['!main']).main, null);
    assert.equal(sync(['!description']).description, null);
  });
});

describe('toAuthor', function () {
  it('should convert author string', function () {
    var actual = sync.toAuthor("Bruce Wayne");
    assert.equal(actual, "Bruce Wayne");
  });

  describe('should convert author object', function () {
    it('with name', function () {
      var actual = sync.toAuthor({
        name: "Bruce Wayne"
      });
      assert.deepEqual(actual, {
        name: "Bruce Wayne"
      });
    });
    it('with name and email', function () {
      var actual = sync.toAuthor({
        name: "Bruce Wayne",
        email: "bruce@batman.fakedomain"
      });
      assert.deepEqual(actual, {
        name: "Bruce Wayne",
        email: "bruce@batman.fakedomain"
      });
    });
    it('with name and url as homepage', function () {
      var actual = sync.toAuthor({
        name: "Bruce Wayne",
        url: "http://batman.fakedomain"
      });
      assert.deepEqual(actual, {
        name: "Bruce Wayne",
        homepage: "http://batman.fakedomain"
      });
    });
  });
});

describe('toAuthors', function () {
  it('with author', function () {
    var actual = sync.toAuthors({
      author: 'Selina Kyle'
    });
    assert.deepEqual(actual, ['Selina Kyle']);
  });

  it('with author and empty contributors', function () {
    var actual = sync.toAuthors({
      author: 'Selina Kyle',
      contributors: []
    });
    assert.deepEqual(actual, ['Selina Kyle']);
  });

  it('with author and contributors', function () {
    var actual = sync.toAuthors({
      author: 'Selina Kyle',
      contributors: ['Harvey Dent']
    });
    assert.deepEqual(actual, ['Selina Kyle', 'Harvey Dent']);
  });

  it('should not add duplicate entries', function () {
    var actual = sync.toAuthors({
      author: 'Selina Kyle',
      contributors: ['Selina Kyle']
    });
    assert.deepEqual(actual, ['Selina Kyle']);
  });
});

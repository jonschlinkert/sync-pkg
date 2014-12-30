'use strict';

var syncPkg = require('./');
var assert = require('assert');

describe('toAuthor', function () {
  it('should convert author string', function () {
    var actual = syncPkg.toAuthor("Bruce Wayne");
    assert.equal(actual, "Bruce Wayne");
  });
  describe('should convert author object', function () {
    it('with name', function () {
      var actual = syncPkg.toAuthor({
        name: "Bruce Wayne"
      });
      assert.deepEqual(actual, {
        name: "Bruce Wayne"
      });
    });
    it('with name and email', function () {
      var actual = syncPkg.toAuthor({
        name: "Bruce Wayne",
        email: "bruce@batman.fakedomain"
      });
      assert.deepEqual(actual, {
        name: "Bruce Wayne",
        email: "bruce@batman.fakedomain"
      });
    });
    it('with name and url as homepage', function () {
      var actual = syncPkg.toAuthor({
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
      var actual = syncPkg.toAuthors({
        author: 'Selina Kyle'
      });
      assert.deepEqual(actual, ['Selina Kyle']);
    });
    it('with author and empty contributors', function () {
      var actual = syncPkg.toAuthors({
        author: 'Selina Kyle',
        contributors: []
      });
      assert.deepEqual(actual, ['Selina Kyle']);
    });
    it('with author and contributors', function () {
      var actual = syncPkg.toAuthors({
        author: 'Selina Kyle',
        contributors: ['Harvey Dent']
      });
      assert.deepEqual(actual, ['Selina Kyle', 'Harvey Dent']);
    });
});

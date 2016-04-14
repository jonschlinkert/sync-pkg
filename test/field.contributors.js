'use strict';

require('mocha');
var assert = require('assert');
var sync = require('..');

describe('field.contributors', function() {
  it('should add package contributors to bower contributors', function() {
    var config = sync({contributors: ['Anders D. Johnson']});
    assert.deepEqual(config.contributors, ['Anders D. Johnson']);
  });
});

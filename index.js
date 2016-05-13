'use strict';

var utils = require('./lib/utils');

/**
 * Sync properties from package.json to bower.json.
 *
 * @param  {String} `patterns` Glob patterns for matching keys.
 * @param  {Object} `options`
 * @return {Object}
 */

module.exports = function(pkg, bower, options) {
  var defaults = {remove: utils.remove, omitEmpty: true, knownOnly: true};
  var opts = utils.extend(defaults, options);
  var config = utils.extend({}, bower, pkg);

  // pre-process `author` so we can use the built-in
  // author normalizer in `normalize-pkg`
  authors(config);

  // add custom fields to the schema
  var normalizer = new utils.Normalizer(opts)
    .field('private', 'boolean')
    .field('ignore', ['array', 'string'], {
      default: utils.ignore,
      normalize: function(val, key, config) {
        return utils.arrayify(val);
      }
    })
    .field('main', ['array', 'string'], {
      normalize: function(val, key, config) {
        return utils.arrayify(val);
      }
    });

  normalizer.schema.omit('engines');
  normalizer.schema.omit('scripts');
  normalizer.schema.omit('author');
  var res = normalizer.normalize(config);
  return utils.omit(res, utils.remove);
};

function authors(config) {
  if (typeof config.authors === 'undefined') {
    config.authors = utils.arrayify(config.author);
    delete config.author;
  }
}

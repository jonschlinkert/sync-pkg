/**
 * sync-pkg
 * http://github.com/jonschlinkert/sync-pkg
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors
 * Licensed under the MIT license.
 */

// Dependencies
const file   = require('fs-utils');
const _      = require('lodash');
const cwd    = require('cwd');

// If bower.json doesn't exist yet, add one.
if (!file.exists('bower.json')) {
  file.writeJSONSync('bower.json', {});
}

var config = module.exports = function(options) {
  options = options || {};
  var pkg = config.pkg || options.pkg;

  var opts = _.defaults(options, {
    name: pkg.name,
    version: pkg.version,
    main: [pkg.main],
    include: [],
    exclude: [],
    requireMain: config.requireMain || true
  });

  // Sync any properties listed in the "include" array.
  opts.include.forEach(function(key) {
    opts[key] = pkg[key];
  });

  // Sync authors
  var authors = config.toAuthors(pkg);
  if (authors) {
    opts.authors = authors;
  }

  // Format the 'main' property as an array for bower.json
  if (pkg.main || opts.main) {
    opts.main = _.union([], [pkg.main], (opts.main || ['']));
  }

  // Format the 'main' property as an array for bower.json
  if (pkg.main || opts.main) {
    opts.main = _.union([], [pkg.main], (opts.main || ['']));
  }

  var omissions = _.union(config.exclusions, opts.exclude);
  var bowerProps = _.omit(_.extend(config.bower, opts), omissions);

  if (!_.isString(pkg.main) && opts.requireMain === true) {
    console.warn('>> package.json is missing a "main" property.');
  }

  // Write bower.json to disk
  file.writeJSONSync('bower.json', bowerProps);

  // Specify another JSON file, such as plugin.jquery.json
  if(opts.alt) {
    var alt = file.readJSONSync(opts.alt);
    var altProps = _.omit(_.extend(alt, opts), _.union(omissions, ['main']));
    // Write the alternate JSON file
    file.writeJSONSync(opts.alt, altProps);
  }
};

/**
 * Convert a Bower author to an npm person.
 * 
 * @see https://github.com/bower/bower.json-spec#authors
 * @see https://www.npmjs.org/doc/json.html#people-fields-author-contributors
 * 
 * @param  {String|Array} npmAuthor A Bower author.
 * @return {?String|Array}          An npm person.
 */
config.toAuthor = function (npmAuthor) {
  var author;
  if (_.isPlainObject(npmAuthor)) {
    author = {};
    if (npmAuthor.name) {
      author.name = npmAuthor.name;
    }
    if (npmAuthor.email) {
      author.email = npmAuthor.email;
    }
    if (npmAuthor.url) {
      author.homepage = npmAuthor.url;
    }
  }
  else if (_.isString(npmAuthor)) {
    author = npmAuthor;
  }
  return author;
};

/**
 * Sync npm's 'author' and 'contributors' to Bower's 'authors'.
 * 
 * @param  {Object} pkg An npm package object.
 * @return {?Array}     An array of authors, or null.
 */
config.toAuthors = function (pkg) {
  pkg = pkg || {};
  var author;
  var authors = [];
  if (pkg.author) {
    author = config.toAuthor(pkg.author);
    if (author) {
      authors.push(author);
    }
  }
  if (pkg.contributors && _.isArray(pkg.contributors)) {
    pkg.contributors.forEach(function (contributor) {
      contributor = config.toAuthor(contributor);
      authors.push(contributor);
    });
  }
  return authors.length > 0 ? authors : null;
};

config.bower = require(cwd('bower.json'));
config.pkg = require(cwd('package.json'));
config.exclusions = ['exclude', 'include', 'alt', 'requireMain'];

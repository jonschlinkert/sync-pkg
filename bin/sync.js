#!/usr/bin/env node

var path = require('path');
var sync = require('../');
var utils = require('../lib/utils');
var argv = utils.minimist(process.argv.slice(2));

var Composer = require('composer');
var composer = new Composer();

var Questions = require('question-cache');
var questions = new Questions();

var task = argv.bower || argv.new || (utils.exists('bower.json') ? ['bower']: ['create']);
var cwd = argv.cwd ? path.resolve(argv.cwd) : process.cwd();

/**
 * Read `bower.json` (if exists) and `package.json`
 */

composer.task('bower', function(cb) {
  var bower = new utils.Bower(cwd);
  var pkg = utils.pkg.sync(cwd);
  bower.data = sync(pkg, bower.data, argv);
  bower.save();
  cb();
});

/**
 * Ask the user if they want to create a bower.json
 */

composer.task('create', function(cb) {
  questions.confirm(this.name, 'bower.json does not exist, do you want to create one?');
  questions.ask(this.name, function(err, answers) {
    if (err) return cb(err);
    if (answers.create === true) {
      try {
        var bower = new utils.Bower(cwd);
        var pkg = utils.pkg.sync(cwd);
        bower.data = sync(pkg, bower.data, argv);
        bower.save();
        cb();
      } catch (err) {
        console.error(err.stack);
        cb(err);
      }
    } else {
      cb();
    }
  });
});

/**
 * Run the specified "task"
 */

composer.build(task, function(err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.error('done', utils.log.success);
  process.exit();
});

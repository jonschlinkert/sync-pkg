#!/usr/bin/env node

var path = require('path');
var sync = require('../');
var utils = require('../lib/utils');
var argv = utils.minimist(process.argv.slice(2));
var Composer = require('composer');
var composer = new Composer();

var Questions = require('question-cache');
var questions = new Questions();

var cwd = argv.cwd ? path.resolve(argv.cwd) : process.cwd();

var tasks = argv._.length ? argv._ : argv.bower || argv.new;
if (typeof tasks === 'undefined') {
  tasks = (utils.exists('bower.json') ? ['bower'] : ['bower-prompt']);
}

/**
 * Read `bower.json` (if exists) and `package.json`
 */

composer.task('diff', function(cb) {
  var bower = new utils.Bower(cwd);
  var pkg = JSON.stringify(utils.pkg.sync(cwd), null, 2);
  utils.diffJson(pkg, JSON.stringify(bower.data, null, 2));
  cb();
});

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

composer.task('bower-prompt', function(cb) {
  questions.confirm(this.name, 'bower.json does not exist, do you want to create one?');
  questions.ask(this.name, function(err, answers) {
    if (err) return cb(err);
    if (answers['bower-prompt'] === true) {
      composer.build('bower', cb);
    } else {
      cb();
    }
  });
});

/**
 * Run the specified "task"
 */

composer.build(tasks, function(err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.error('done', utils.log.success);
  process.exit();
});

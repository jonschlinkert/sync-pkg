# sync-pkg [![NPM version](https://badge.fury.io/js/sync-pkg.svg)](http://badge.fury.io/js/sync-pkg)  [![Build Status](https://travis-ci.org/jonschlinkert/sync-pkg.svg)](https://travis-ci.org/jonschlinkert/sync-pkg) 

> CLI to sync only basic properties from package.json to bower.json.

## Usage

## Install globally with [npm](npmjs.org):

```bash
npm i -g sync-pkg
```

### cli

In the command line, run `sync` to create and/or update bower.json with the [following fields](https://github.com/bower/bower.json-spec) from package.json:

- `name` _required_
- `description` _recommended_
- `license` _recommended_
- `main` _recommended_
- `ignore` _recommended_
- `keywords` _recommended_

These fields are also included, but are considered optional by bower:

- `repository`
- `homepage`
- `authors`
- `dependencies`
- `devDependencies`

### API

```js
var sync = require('sync-pkg');

// omit fields using glob patterns
sync(['!description', '!foo*']);
```

## Related
 * [load-pkg](https://github.com/jonschlinkert/load-pkg): Load the package.json in the base of the user's current project.
 * [filter-object](https://github.com/jonschlinkert/filter-object): Return a copy of an object, filtered to have only keys that match the given glob patterns.
 * [omit-empty](https://github.com/jonschlinkert/omit-empty): Recursively omit empty properties from an object. Omits empty objects, arrays, strings or zero.

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/sync-pkg/issues)

## Running tests
Install dev dependencies:

```bash
npm i -d && npm test
```

## Author

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert) 

## License
Copyright (c) 2014-2015 Jon Schlinkert  
Released under the MIT license

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on April 02, 2015._

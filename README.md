# sync-pkg [![NPM version](https://badge.fury.io/js/sync-pkg.svg)](http://badge.fury.io/js/sync-pkg)

> Minimalist CLI to sync only basic properties from package.json to bower.json.

## Install globally with [npm](npmjs.org):

```bash
npm i -g sync-pkg
```

## Usage

### cli

In the command line, run `sync` to create and/or update bower.json with the [following fields](https://github.com/bower/bower.json-spec) from package.json:

  - `name`         (required)
  - `description`  (recommended)
  - `license`      (recommended)
  - `main`         (recommended)
  - `ignore`       (recommended)
  - `keywords`     (recommended)

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
sync(['!description', '!foo*'])
```

## Run tests

```bash
npm test
```

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/sync-pkg/issues)


## Author

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License
Copyright (c) 2014-2015 Jon Schlinkert
Released under the MIT license

***

_This file was generated by [verb](https://github.com/assemble/verb) on December 30, 2014._

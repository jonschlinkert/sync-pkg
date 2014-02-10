# sync-pkg [![NPM version](https://badge.fury.io/js/sync-pkg.png)](http://badge.fury.io/js/sync-pkg)

> Minimalist CLI to sync only basic properties from package.json to bower.json

If you find a bug or have a feature request, [please create an issue](https://github.com/helpers/sync-pkg/issues).

## Quickstart

### Install with [npm](npmjs.org):

```
npm i -g sync-pkg --save
```

## Usage


### cli

In the command line, run `sync` to create or update bower.json with the `name`, `version`, and `main` properties from package.json.

### api

```js
var sync = require('sync-pkg');

sync( options )
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.

## Authors

**Jon Schlinkert**

+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)
+ [github/jonschlinkert](https://github.com/jonschlinkert)


## License
Copyright (c) 2014 [Jon Schlinkert](https://github.com/jonschlinkert), contributors.
Released under the MIT license
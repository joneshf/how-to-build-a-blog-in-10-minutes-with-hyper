# [PureScript](https://github.com/purescript/purescript) wrapper for [Node.js](https://nodejs.org/)

[![NPM version](http://img.shields.io/npm/v/purescript.svg)](https://www.npmjs.com/package/purescript)
[![Build Status](http://img.shields.io/travis/purescript-contrib/node-purescript-bin.svg)](http://travis-ci.org/purescript-contrib/node-purescript-bin)
[![Coverage Status](https://img.shields.io/coveralls/purescript-contrib/node-purescript-bin.svg)](https://coveralls.io/github/purescript-contrib/node-purescript-bin?branch=master)
[![dependencies Status](https://david-dm.org/purescript-contrib/node-purescript-bin/status.svg)](https://david-dm.org/purescript-contrib/node-purescript-bin)
[![devDependencies Status](https://david-dm.org/purescript-contrib/node-purescript-bin/dev-status.svg)](https://david-dm.org/purescript-contrib/node-purescript-bin?type=dev)

[PureScript](http://www.purescript.org/) binary wrapper that makes it seamlessly available via [npm](https://www.npmjs.com/)

## Installation

[Use npm](https://docs.npmjs.com/cli/install) after making sure your development environment satisfies [the requirements](https://github.com/purescript/purescript/blob/ab5f139336c7343009e88c13b29c9cdf566b1713/INSTALL.md#the-curses-library).

```
npm install purescript
```

## Usage

```javascript
const {execFile} = require('child_process');
const purs = require('purescript');

// purs => '/path/to/proj/node_modules/purescript/vendor/purs'
execFile(purs, ['compile', 'input.purs', '--output', 'output.purs'], err => {
  if (err) {
    throw err;
  }

  console.log('Compiled.');
});
```

## API

### require('purescript')

Type: `String`

The path to the `purs` binary.

## CLI

You can use it via CLI by installing it [globally](https://docs.npmjs.com/files/folders#global-installation).

```
npm install -g purescript

purs --help
```

## License

Copyright (c) 2015 - 2017 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).

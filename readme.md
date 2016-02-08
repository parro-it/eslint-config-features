# eslint-config-features

> Automatically configure eslint ecmaFeatures according to package.json `engines` field.

[![Travis Build Status](https://img.shields.io/travis/parro-it/eslint-config-features.svg)](http://travis-ci.org/parro-it/eslint-config-features)
[![NPM module](https://img.shields.io/npm/v/eslint-config-features.svg)](https://npmjs.org/package/eslint-config-features)
[![NPM downloads](https://img.shields.io/npm/dt/eslint-config-features.svg)](https://npmjs.org/package/eslint-config-features)

# Usage

Install the module as a development dependency:

```bash
npm install -D eslint-config-features
```

Then, you have to configure it as a eslint configuration preset.
In your package.json files, add:

```js
  "eslintConfig": {
    "extends": [
      "features"
    ]
  },
```

You also need to add an `engines` section to `package.json`, to let this module know what minimum node version you target, e.g.:

```js
  "engines": {
    "node": ">=0.12"
  },
```

Now, whenever you lint your code with eslint, you get
the set of es2015 rules supported by node 0.12.

# How it works

It uses [babel-preset-es2015-auto](https://www.npmjs.com/package/babel-preset-es2015-auto) module to discover what babel-transforms are required by node version you specify in `engines` features.

The babel transforms not needed are already implemented natively by node, so they are converted
to eslint rules using [babelplugin-to-eslintrule](https://github.com/parro-it/babelplugin-to-eslintrule)

# Related modules

* [babel-preset-es2015-auto](https://github.com/jakepusateri/auto-babel) - a project that aims to bring autoprefixer-like functionality to babel.
* [babelplugin-to-eslintrule](https://github.com/parro-it/babelplugin-to-eslintrule) - Map babel plugins to corresponding eslint ecmaFeatures
* [semver-first-satisfied](https://github.com/parro-it/semver-first-satisfied) -Find minimum in an array of versions that satisfies a semver range.

# License

The MIT License (MIT)

Copyright (c) 2016 Andrea Parodi

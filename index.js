'use strict';

var map = require('map-obj');
var flatten = require('arr-flatten');
var firstSatisfied = require('semver-first-satisfied');
var autoBabelPlugins = require('babel-preset-es2015-auto/data.json');
var babel2eslint = require('babelplugin-to-eslintrule');
var arrayDiffer = require('arr-diff');
var readPkgUp = require('read-pkg-up');
var debug = require('debug')('eslint-config-features');

var allBabelFeatures = [
  'babel-plugin-transform-es2015-template-literals',
  'babel-plugin-transform-es2015-literals',
  'babel-plugin-transform-es2015-function-name',
  'babel-plugin-transform-es2015-arrow-functions',
  'babel-plugin-transform-es2015-block-scoped-functions',
  'babel-plugin-transform-es2015-classes',
  'babel-plugin-transform-es2015-object-super',
  'babel-plugin-transform-es2015-shorthand-properties',
  'babel-plugin-transform-es2015-computed-properties',
  'babel-plugin-transform-es2015-for-of',
  'babel-plugin-transform-es2015-sticky-regex',
  'babel-plugin-transform-es2015-unicode-regex',
  'babel-plugin-check-es2015-constants',
  'babel-plugin-transform-es2015-spread',
  'babel-plugin-transform-es2015-parameters',
  'babel-plugin-transform-es2015-destructuring',
  'babel-plugin-transform-es2015-block-scoping',
  'babel-plugin-transform-es2015-typeof-symbol',
  'babel-plugin-transform-es2015-modules-commonjs',
  'babel-plugin-transform-regenerator'
];

function convertToEslintFeature(babelFeature) {
  return babel2eslint(babelFeature.slice(23));
}

function keysToObject(_, key) {
  return [key, true];
}

function toEnginesArray(engine, range) {
  return [0,[engine, range]];
}

var engines = {
  node: {
    versionMatch: function (ver) {
      return /^v\d+/.test(ver);
    },
    toSemVer: function (ver) {
      return ver.slice(1);
    },
    keyFromVersion: function (ver) {
      return 'v' + ver;
    }
  },

  iojs: {
    versionMatch: function (ver) {
      return /^iojs-v\d+/.test(ver);
    },
    toSemVer: function (ver) {
      return ver.slice(6);
    },
    keyFromVersion: function (ver) {
      return 'iojs-v' + ver;
    }
  }
};


var eslintFeatures = {
  ecmaFeatures: null
};

eslintFeatures.versionForRange = function versionForRange(engine, range) {
  if (!engines.hasOwnProperty(engine)) {
    throw new Error('Unsupported engine ' + engine);
  }
  var eng = engines[engine];
  var versions = Object.keys(autoBabelPlugins);

  var engineVersions = versions
    .filter(eng.versionMatch)
    .map(eng.toSemVer);

  return firstSatisfied(range, engineVersions);
};

eslintFeatures.featureOfVersion = function featureOfVersion(engine, version) {
  var versionKey = engines[engine].keyFromVersion(version);
  debug('versionKey:' +versionKey);
  var babelFeatures = autoBabelPlugins[versionKey];
  debug('babelFeatures:' + babelFeatures
      .join(',')
      .replace(/babel-plugin-transform-/g, ''));
  var noBabelFeatures = arrayDiffer(allBabelFeatures, babelFeatures);
  debug('Superfluos Babel Features:' + noBabelFeatures
      .join(',')
      .replace(/babel-plugin-transform-/g, ''));
  var eslintFeatures = noBabelFeatures.map(convertToEslintFeature);
  debug('eslintFeatures:' +eslintFeatures);
  return map(flatten(eslintFeatures), keysToObject);
};

eslintFeatures.findSupportedEngines = function findSupportedEngines(cwd) {
  cwd = cwd || process.cwd();
  debug('findEcmaFeatures - cwd:' +cwd);
  var engines = readPkgUp.sync({ cwd: cwd }).pkg.engines;
  return map(engines, toEnginesArray)[0];
};

eslintFeatures.findEcmaFeatures = function findEcmaFeatures(cwd) {

  var pkgEngines = eslintFeatures.findSupportedEngines(cwd);
  debug('engine required: ' + pkgEngines);
  var minVersion = eslintFeatures.versionForRange(pkgEngines[0], pkgEngines[1]);
  debug('minimum required engine version: ' + minVersion);

  var features = eslintFeatures.featureOfVersion(pkgEngines[0], minVersion);
  debug('features found for engine: ' + minVersion);
  return features;
};

eslintFeatures.ecmaFeatures = eslintFeatures.findEcmaFeatures();


module.exports = eslintFeatures;

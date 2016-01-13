'use strict';

var filter = require('filter-obj');
var map = require('map-obj');
var values = require('object-values');
var babelFeatures = require('babel-features');
var flatten = require('arr-flatten');


var fieldMapping = {
  'es3-member-expression-literals': null,
  'es3-property-literals': null,
  'es5-property-mutators': null,
  'es2015-arrow-functions': 'arrowFunctions',
  'es2015-block-scoping': 'blockBindings',
  'es2015-classes': 'classes',
  'es2015-computed-properties': 'objectLiteralComputedProperties',
  'es2015-constants': 'blockBindings',
  'es2015-destructuring': 'destructuring',
  'es2015-for-of': 'forOf',
  'es2015-function-name': null,
  'es2015-literals': ['binaryLiterals', 'octalLiterals'],
  'es2015-object-super': 'superInFunctions',
  'es2015-parameters': 'defaultParams',
  'es2015-shorthand-properties': ['objectLiteralShorthandProperties'],
  'es2015-spread': 'spread',
  'es2015-sticky-regex': 'regexYFlag',
  'es2015-template-literals': 'templateStrings',
  'es2015-typeof-symbol': null,
  'es2015-unicode-regex': 'regexUFlag',
  'es2015-modules': 'modules',
  'es2015-generators': 'generators',
  'es3-function-scope': null
};



function convertToEslintFeature(babelFeature) {
  return [babelFeature, fieldMapping[babelFeature]];
}

function pairValueIsTrue(key, value) {
  return !!value;
}

function valueIsTrue(value) {
  return !!value;
}


var features = babelFeatures.test();
var workingFeatures = filter(features, pairValueIsTrue);
var eslintFeaturesObj = map(workingFeatures, convertToEslintFeature);
var eslintFeatures = {
  ecmaFeatures: flatten(values(eslintFeaturesObj)
    .filter(valueIsTrue))
};

module.exports = eslintFeatures;
console.log(eslintFeatures);

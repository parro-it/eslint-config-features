var test = require('tape');
var eslintConfigFeatures = require('./');

test('versionForRange - support node', function(t) {
  var result = eslintConfigFeatures.versionForRange('node', '>=4');
  t.equal(result, '4.0.0');
  t.end();
});

test('versionForRange - support iojs', function(t) {
  var result = eslintConfigFeatures.versionForRange('iojs', '^2.1.10');
  t.equal(result, '2.2.0');
  t.end();
});


test('findSupportedEngines - return engines field from pkg.json', function(t) {
  var result = eslintConfigFeatures.findSupportedEngines();
  t.deepEqual(result, ['node', '>=0.10']);
  t.end();
});


test('featureOfVersion - return ecmaFeatures for a version', function(t) {
  var result = eslintConfigFeatures.featureOfVersion('node','5.0.0');
  t.deepEqual(result, {
    arrowFunctions: true,
    binaryLiterals: true,
    blockBindings: true,
    classes: true,
    forOf: true,
    objectLiteralComputedProperties: true,
    objectLiteralShorthandProperties: true,
    octalLiterals: true,
    spread: true,
    superInFunctions: true,
    templateStrings: true
  });
  t.end();
});



test('ecmaFeatures - contains ecmaFeatures configs', function(t) {
  t.deepEqual(eslintConfigFeatures.ecmaFeatures, []);
  t.end();
});


test('findEcmaFeatures - return ecmaFeatures configs', function(t) {
  var pkgDir = __dirname + '/fixtures';
  t.deepEqual(
    eslintConfigFeatures.findEcmaFeatures(pkgDir),
    { forOf: true }
  );
  t.end();
});

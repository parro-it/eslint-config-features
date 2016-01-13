const test = require('tape');
const eslintConfigFeatures = require('./');

test('it work!', t => {
  const result = eslintConfigFeatures();
  t.equal(result, 42);
  t.end();
});

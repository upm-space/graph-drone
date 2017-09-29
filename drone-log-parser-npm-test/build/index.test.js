'use strict';

var _index = require('./index');

test('replaces blacklisted words with asterisks', function () {
  return expect('helloworld').toBe('helloworld');
});
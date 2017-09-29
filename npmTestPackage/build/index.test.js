'use strict';

var _index = require('./index');

test('replaces blacklisted words with asterisks', function () {
  return expect((0, _index.sensitiveWords)('The name of the NX will be the Nintendo Switch', ['switch'])).toBe('The name of the NX will be the Nintendo ***');
});

test('replaces multiple instances of blacklisted words', function () {
  return expect((0, _index.sensitiveWords)('The name of the NX will be the Nintendo Switch. The switch will be awesome!', ['switch'])).toBe('The name of the NX will be the Nintendo ***. The *** will be awesome!');
});
const {sensitiveWords} = require('npmtestpackage');

const filtered =
  sensitiveWords(
    'The new apple macbook pro will have a touchbar',
    ['pro', 'touchbar']
  )

console.log(filtered)
// The new apple macbook *** will have a ***

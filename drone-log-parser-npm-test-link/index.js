const { log2var } = require('drone-log-parser');

console.log('Defino mi variable');
let mylogvar = {};
const mylog = log2var('../sample-logs/SRM/5 21-02-2017 21-51-00.bin.log', (result) => {
  mylogvar = result;
  console.log(mylogvar);
})

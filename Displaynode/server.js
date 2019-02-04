//Hack work arround to help IIS find the actual run file, seeing it ignores common npm start or its own typescript index
require('./dist/index.js');

console.log(process.env);
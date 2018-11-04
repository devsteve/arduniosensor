// Require the serialport node module
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort('/dev/ttyACM0')

const parser = port.pipe(new Readline({ delimiter: '\r\n' }))

const getValue = (valueName,datastring) => {
  let regexString = valueName+":([0-9]*\.[0-9]*)";
  let regex = new RegExp(regexString,"g");
  let found = regex.exec(datastring);
  return found ? found[1] || null : null;
}

const parseDataFeed = (datastring) => {
  console.log(getValue('humidity',datastring));
  console.log(getValue('temp',datastring));
}
parser.on('data',parseDataFeed);
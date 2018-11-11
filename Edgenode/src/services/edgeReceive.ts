// Require the serialport node module
import SerialPort = require('serialport')
import Readline = require('@serialport/parser-readline')
import IngressDataHandler from '../classes/ingressDataHandler';

const port = new SerialPort('/dev/ttyACM0')


export default class edgeReceive {

  /**
   * Start new receiver
   */
  start(dataHandler : IngressDataHandler) {
    const parser = port.pipe(new Readline({ delimiter: '\r\n' }));
    parser.on('data',dataHandler.processDataString);
  }

}
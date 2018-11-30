// Require the serialport node module
import SerialPort = require('serialport')
import Readline = require('@serialport/parser-readline')
import IngressDataHandler from '../classes/ingressDataHandler';

import Config = require('../../config/env');


export default class edgeReceive {

  private _port : SerialPort;

  constructor() {
    if(!Config.dev) {
      this._port = new SerialPort(Config.env.incomingSerialMount);
    }
  }

  /**
   * Start new receiver
   */
  //start(dataHandler : IngressDataHandler) {
  start(processDataString) {  
    if(Config.dev) {
      this.debug(processDataString);
    } else {
      const parser = this._port.pipe(new Readline({ delimiter: '\r\n' }));
      parser.on('data',processDataString);
    }
  }

  /**
   * Start new receiver
   */
  debug(processDataString) {
    processDataString("humidity: 32, temp: 47");
  }
}
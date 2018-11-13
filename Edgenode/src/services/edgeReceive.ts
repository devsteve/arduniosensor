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
  start(dataHandler : IngressDataHandler) {
    if(Config.dev) {
      this.debug(dataHandler);
    } else {
      const parser = this._port.pipe(new Readline({ delimiter: '\r\n' }));
      parser.on('data',dataHandler.processDataString);
    }
  }

  /**
   * Start new receiver
   */
  debug(dataHandler : IngressDataHandler) {
    dataHandler.processDataString("humidity: 30, temp: 45");
  }
}
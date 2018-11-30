"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Require the serialport node module
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const Config = require("../../config/env");
class edgeReceive {
    constructor() {
        if (!Config.dev) {
            this._port = new SerialPort(Config.env.incomingSerialMount);
        }
    }
    /**
     * Start new receiver
     */
    //start(dataHandler : IngressDataHandler) {
    start(processDataString) {
        if (Config.dev) {
            this.debug(processDataString);
        }
        else {
            const parser = this._port.pipe(new Readline({ delimiter: '\r\n' }));
            parser.on('data', processDataString);
        }
    }
    /**
     * Start new receiver
     */
    debug(processDataString) {
        processDataString("humidity: 32, temp: 47");
    }
}
exports.default = edgeReceive;
//# sourceMappingURL=edgeReceive.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Require the serialport node module
const edgeReceive_1 = require("./services/edgeReceive");
const edgeSend_1 = require("./services/edgeSend");
const ingressDataHandler_1 = require("./classes/ingressDataHandler");
let sendInstance = new edgeSend_1.default();
let receive = new edgeReceive_1.default();
class dataHandler extends ingressDataHandler_1.default {
    constructor() {
        super();
        this._regex = ":([0-9]*\.[0-9]*)";
    }
    //Extract the custom string from the device and put into a format to send to IoT hub
    processDataString(dataString) {
        let dataObject = {
            humidity: this.getValue('humidity', dataString, true),
            temp: this.getValue('temp', dataString, true)
        };
        sendInstance.send(dataObject);
        return false;
    }
}
//Start receiving. Process will call send when data obtained
let edgeDataReceiver = new dataHandler();
receive.start(edgeDataReceiver);
//# sourceMappingURL=index.js.map
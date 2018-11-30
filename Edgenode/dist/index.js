"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Require the serialport node module
const edgeReceive_1 = require("./services/edgeReceive");
const edgeSend_1 = require("./services/edgeSend");
let sendInstance = new edgeSend_1.default();
let receive = new edgeReceive_1.default();
/*
class dataHandler extends classDataHandler {


  constructor() {
    super();
    this._regex = ":([0-9]*\.[0-9]*)";
  }


  //Extract the custom string from the device and put into a format to send to IoT hub
  public processDataString(dataString : string) {
   


    let dataObject = {
      humidity : this.getValue('humidity',dataString,true),
      temp :  this.getValue('temp',dataString,true)
    };

    sendInstance.send(dataObject);

    return false;
  }
}
*/
let processDataString = function (dataString) {
    let getValue = function (valueName, datastring, isInt = false) {
        //let regexString = valueName+this._regex;
        let regexString = valueName + ":([0-9]*\.[0-9]*)";
        let regex = new RegExp(regexString, "g");
        let found = regex.exec(datastring);
        return found && found[1] ? (isInt ? parseInt(found[1]) : found[1]) : null;
    };
    let dataObject = {
        humidity: getValue('humidity', dataString, true),
        temp: getValue('temp', dataString, true)
    };
    sendInstance.send(dataObject);
    return false;
};
//Start receiving. Process will call send when data obtained
receive.start(processDataString);
//# sourceMappingURL=index.js.map
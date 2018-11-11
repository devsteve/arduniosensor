// Require the serialport node module
//const edgeReceive = require('./services/edgeReceive');
//const edgeSend = require('./services/edgeSend');
import edgeReceive from './services/edgeReceive';
import edgeSend from './services/edgeSend';


import classDataHandler from './classes/ingressDataHandler';




let sendInstance = new edgeSend();
sendInstance.send();

let receive = new edgeReceive();
//let dataHandler : DataHandler; 

class dataHandler extends classDataHandler {

  constructor() {
    super();
    this._regex = ":([0-9]*\.[0-9]*)";
  }

  public processDataString(dataString : string) {
    console.log(this.getValue('humidity',dataString));
    console.log(this.getValue('temp',dataString));

    return false;
  }
}
let edgeDataReceiver = new dataHandler();


receive.start(edgeDataReceiver);
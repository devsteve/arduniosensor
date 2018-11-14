// Require the serialport node module
import edgeReceive from './services/edgeReceive';
import edgeSend from './services/edgeSend';


import classDataHandler from './classes/ingressDataHandler';




let sendInstance = new edgeSend();
let receive = new edgeReceive();

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

//Start receiving. Process will call send when data obtained
let edgeDataReceiver = new dataHandler();
receive.start(edgeDataReceiver);
// Require the serialport node module
import edgeReceive from './services/edgeReceive';
import dataStore from './services/dataStore';

const receive = new edgeReceive();
const dataInterface = new dataStore();

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

let processDataString = function(dataString : string) {
  
  let regexBase = ":([0-9]*\.[0-9]*)";

  let getIntValue = function(valueName,datastring) : number {
    //let regexString = valueName+this._regex;
    let regexString = valueName+regexBase;
    let regex = new RegExp(regexString,"g");
    let found = regex.exec(datastring);
    return found && found[1] ? parseInt(found[1]) : null;
  }

  let getStringValue = function(valueName,datastring) : string {
    let regexString = valueName+regexBase;
    let regex = new RegExp(regexString,"g");
    let found = regex.exec(datastring);
    return found && found[1] ? found[1] : null;
  }

  let temp = getIntValue('temp',dataString);
  //Convert to scale at 22 degrees read temp it is 24
  temp = temp !== null ? Math.floor(temp * (24/22)): null
  
  let dataObject = {
    humidity : getIntValue('humidity',dataString),
    temp : temp  
  };

  
  dataInterface.storeRecord(dataObject);
  //Update Skip IoT Hub and send straight to DB
  //sendInstance.send(dataObject);

  return false;
}

dataInterface.connect().then(schema => {  

  //Start receiving. Process will call send when data obtained
  receive.start(processDataString);
});
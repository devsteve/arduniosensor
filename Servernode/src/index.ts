import readHubData from './services/readHubData';
import dataStore from './services/dataStore';


const dataInterface = new dataStore();

dataInterface.connect().then(schema => {  

    /**
     * take in the message from the iot hub and send to the datastore 
     * @param message 
     */
    let storeMessage = function(message) { 
        console.log(message.body);
        dataInterface.storeRecord(message.body);
    };
    //Start the IoT Hub routine
    readHubData.readData(storeMessage);

    
});
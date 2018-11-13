
const { EventHubClient, EventPosition } = require('@azure/event-hubs');


import Config = require('../../config/env');


export default class readHubData {

  constructor() {
    if(!Config.dev) {
      
    }
  }


  printError(err) {
    console.log(err.message);
  }

  // Display the message content - telemetry and properties.
  // - Telemetry is sent in the message body
  // - The device can add arbitrary application properties to the message
  // - IoT Hub adds system properties, such as Device Id, to the message.
  printMessage(message) {
    console.log('Telemetry received: ');
    console.log(JSON.stringify(message.body));
    console.log('Application properties (set by device): ')
    console.log(JSON.stringify(message.applicationProperties));
    console.log('System properties (set by IoT Hub): ')
    console.log(JSON.stringify(message.annotations));
    console.log('');
  }

  // Connect to the partitions on the IoT Hub's Event Hubs-compatible endpoint.
  // This example only reads messages sent after this application started.
  readData() {  
    var ehClient;

    EventHubClient.createFromIotHubConnectionString(Config.env.connectionString).then(function (client) {
      console.log("Successully created the EventHub Client from iothub connection string.");
      ehClient = client;
      return ehClient.getPartitionIds();
    }).then(function (ids) {
      console.log("The partition ids are: ", ids);
      return ids.map(function (id) {
        return ehClient.receive(id, printMessage, printError, { eventPosition: EventPosition.fromEnqueuedTime(Date.now()) });
      });
    }).catch(printError);
  }
}
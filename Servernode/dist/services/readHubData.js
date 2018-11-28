"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { EventHubClient, EventPosition } = require('@azure/event-hubs');
const Config = require("../../config/env");
class readHubData {
    static _printError(err) {
        console.log(err.message);
    }
    // Display the message content - telemetry and properties.
    // - Telemetry is sent in the message body
    // - The device can add arbitrary application properties to the message
    // - IoT Hub adds system properties, such as Device Id, to the message.
    static _storeMessage(message) {
        console.log('Telemetry received: ');
        console.log(JSON.stringify(message.body));
        console.log('Application properties (set by device): ');
        console.log(JSON.stringify(message.applicationProperties));
        console.log('System properties (set by IoT Hub): ');
        console.log(JSON.stringify(message.annotations));
        console.log('');
    }
    // Connect to the partitions on the IoT Hub's Event Hubs-compatible endpoint.
    // This example only reads messages sent after this application started.
    static readData() {
        var ehClient;
        EventHubClient.createFromIotHubConnectionString(Config.env.connectionString).then(function (client) {
            console.log("Successully created the EventHub Client from iothub connection string.");
            ehClient = client;
            return ehClient.getPartitionIds();
        }).then(function (ids) {
            console.log("The partition ids are: ", ids);
            return ids.map(function (id) {
                return ehClient.receive(id, readHubData._storeMessage, readHubData._printError, { eventPosition: EventPosition.fromEnqueuedTime(Date.now()) });
            });
        }).catch(readHubData._printError);
    }
}
exports.default = readHubData;
//# sourceMappingURL=readHubData.js.map
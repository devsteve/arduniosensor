"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { EventHubClient, EventPosition } = require('@azure/event-hubs');
const Config = require("../../config/env");
class readHubData {
    static _printError(err) {
        console.log(err.message);
    }
    // Connect to the partitions on the IoT Hub's Event Hubs-compatible endpoint.
    // This example only reads messages sent after this application started.
    static readData(storeMessage) {
        var ehClient;
        EventHubClient.createFromIotHubConnectionString(Config.env.connectionString).then(function (client) {
            console.log("Successully created the EventHub Client from iothub connection string.");
            ehClient = client;
            return ehClient.getPartitionIds();
        }).then(function (ids) {
            console.log("The partition ids are: ", ids);
            return ids.map(function (id) {
                return ehClient.receive(id, storeMessage, readHubData._printError, { eventPosition: EventPosition.fromEnqueuedTime(Date.now()) });
            });
        }).catch(readHubData._printError);
    }
}
exports.default = readHubData;
//# sourceMappingURL=readHubData.js.map
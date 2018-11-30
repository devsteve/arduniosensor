"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readHubData_1 = require("./services/readHubData");
const dataStore_1 = require("./services/dataStore");
const dataInterface = new dataStore_1.default();
dataInterface.connect().then(schema => {
    /**
     * take in the message from the iot hub and send to the datastore
     * @param message
     */
    let storeMessage = function (message) {
        console.log(message.body);
        dataInterface.storeRecord(message.body);
    };
    //Start the IoT Hub routine
    readHubData_1.default.readData(storeMessage);
});
//# sourceMappingURL=index.js.map
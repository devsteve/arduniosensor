"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readHubData_1 = require("./services/readHubData");
const dataStore_1 = require("./services/dataStore");
const express = require("express");
const path = require("path");
const Config = require("../config/env");
const displayController_1 = require("./controllers/displayController");
//Start the IoT Hub routine
readHubData_1.default.readData();
const dataInterface = new dataStore_1.default();
dataInterface.storeRecord({ temp: 1, humidity: 1 });
dataInterface.retrieveRecords(2, function (err, result) {
    if (!err) {
        console.log(result);
    }
    else {
        // error handling
    }
    ;
});
dataInterface.retrieveLatestRecord(function (err, result) {
    if (!err) {
        console.log(result);
    }
    else {
        // error handling
    }
    ;
});
// The port the express app will listen on
const port = Config.env.port || 3030;
const app = express();
console.log(path.join(__dirname, '../Client/build'));
app.use(express.static(path.join(__dirname, '../Client/build')));
//Setup for all API requests
app.use('/api/', displayController_1.default);
// Serve the application at the given port
app.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
});
//# sourceMappingURL=index.js.map
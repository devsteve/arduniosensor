import readHubData from './services/readHubData';
import dataStore from './services/dataStore';
import express = require('express')
import path = require('path');
import Config = require('../config/env');
import displayController from './controllers/displayController';
//Start the IoT Hub routine
readHubData.readData();

const dataInterface = new dataStore();

dataInterface.storeRecord({ temp: 1, humidity: 1});

dataInterface.retrieveRecords(2,function(err, result) {
    if (!err) {
      console.log(result);
    } else {
      // error handling
    };
});

dataInterface.retrieveLatestRecord(function(err, result) {
    if (!err) {
      console.log(result);
    } else {
      // error handling
    };
});

// The port the express app will listen on
const port: number = Config.env.port || 3030;
const app = express();


console.log(path.join(__dirname, '../Client/build'));
app.use(express.static(path.join(__dirname, '../Client/build')));

//Setup for all API requests
app.use('/api/', displayController);


// Serve the application at the given port
app.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
});
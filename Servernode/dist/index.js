"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readHubData_1 = require("./services/readHubData");
const express = require("express");
const Config = require("../config/env");
const displayController_1 = require("./controllers/displayController");
//Start the IoT Hub routine
readHubData_1.default.readData();
// Create a new express application instance
const app = express();
// The port the express app will listen on
const port = Config.env.port || 3000;
// Mount the WelcomeController at the /welcome route
app.use('/', displayController_1.default());
// Serve the application at the given port
app.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
});
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const Config = require("../config/env");
const displayController_1 = require("./controllers/displayController");
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
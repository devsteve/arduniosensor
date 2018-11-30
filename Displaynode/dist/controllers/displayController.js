"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dataRetrieve_1 = require("../services/dataRetrieve");
/// Assign router to the express.Router() instance
const router = express_1.Router();
const dataInterface = new dataRetrieve_1.default();
dataInterface.connect().then(schema => {
    // The / here corresponds to the route that the WelcomeController
    // is mounted on in the server.ts file.
    // In this case it's /welcome
    router.get('/all', (req, res) => {
        // Reply with entire record
        res.setHeader('Content-Type', 'application/json');
        dataInterface.retrieveRecords(10, function (err, result) {
            if (!err) {
                res.send(result);
            }
            else {
                // error handling
            }
            ;
        });
        //res.send(JSON.stringify([{ temp: "5", humidity: "10", time: "10:14" },{ temp: "5", humidity: "10", time: "10:14" }]));
    });
    router.get('/:count', (req, res) => {
        //Number of records to return
        const { count } = req.params;
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ count: count }));
    });
});
// Export the express.Router() instance to be used by server.ts
exports.default = router;
//# sourceMappingURL=displayController.js.map
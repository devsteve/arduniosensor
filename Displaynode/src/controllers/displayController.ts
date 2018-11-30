import { Router, Request, Response } from 'express';
import dataRetrieve from '../services/dataRetrieve';

/// Assign router to the express.Router() instance
const router: Router = Router();

const dataInterface = new dataRetrieve();

dataInterface.connect().then(schema => { 

    // The / here corresponds to the route that the WelcomeController
    // is mounted on in the server.ts file.
    // In this case it's /welcome
    router.get('/all', (req: Request, res: Response) => {
        // Reply with entire record
        res.setHeader('Content-Type', 'application/json');

        
        dataInterface.retrieveRecords(10,function(err, result) {
            if (!err) {
                res.send(result);
            } else {
            // error handling
            };
        });

        //res.send(JSON.stringify([{ temp: "5", humidity: "10", time: "10:14" },{ temp: "5", humidity: "10", time: "10:14" }]));
    });

    router.get('/:count', (req: Request, res: Response) => {
        //Number of records to return
        const { count } = req.params;

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ count: count }));
    });
});

// Export the express.Router() instance to be used by server.ts
export default router;
import { Router, Request, Response } from 'express';
import dataRetrieve from '../services/dataRetrieve';

/// Assign router to the express.Router() instance
const router: Router = Router();

const dataInterface = new dataRetrieve();

dataInterface.connect().then(schema => { 

     // The / here corresponds to the route that the WelcomeController
    // is mounted on in the server.ts file.
    // In this case it's /welcome
    router.get('/latest', (req: Request, res: Response) => {
        // Reply with entire record
        res.setHeader('Content-Type', 'application/json');

        
        dataInterface.retrieveRecords(10,function(err, result) {
            if (!err) {
                res.send(result);
            } else {
                // error handling
                res.send(err);    
            };
        });
    });
    

    router.get('/count/:count/:segmentation', (req: Request, res: Response) => {
        //Number of records to return
        const { count, segmentation } = req.params;

        dataInterface.retrieveRecords(parseInt(count),function(err, result) {
            
            if (!err) {
                var ret = [];
                var count = 0;
                //Split the array via the segmentation
                if(segmentation && segmentation != 1 && segmentation > 0) {
                    result.forEach(element => {
                        if(count % segmentation === 0) {  
                            ret.push(element); 
                        }
                        count++;
                    });
                } else {
                    ret = result;
                }
                res.send(ret);
            } else {
                // error handling
                res.send(err);
            };
        });
    });
});

// Export the express.Router() instance to be used by server.ts
export default router;
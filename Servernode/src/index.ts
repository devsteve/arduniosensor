import readHubData from './services/readHubData';
import Application from 'express';
import Config = require('../config/env');
import displayController from './controllers/displayController';
//Start the IoT Hub routine
readHubData.readData();


// Create a new express application instance
const app: Application = express();
// The port the express app will listen on
const port: number = Config.env.port || 3000;

// Mount the WelcomeController at the /welcome route
app.use('/', displayController());

// Serve the application at the given port
app.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
});
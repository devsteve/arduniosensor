import express = require('express')
import path = require('path');
import displayController from './controllers/displayController';
import { config } from 'dotenv';



// The port the express app will listen on
const port = process.env.PORT || process.env.port || 1337;

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
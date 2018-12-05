const mongoose = require("mongoose"); 

import Schema from '../schema/schema';
import Config = require('../../config/env');



export default class dataStore { 

    private _schema : Schema;

    public constructor() {
        console.log('Called');
    }

    public async connect() {     
       const uristring = 'mongodb://'+Config.env.mongodb;
       await mongoose.connect(uristring, function (err, res) {
        if (err) {
        console.log ('ERROR connecting to: ' + uristring + '. ' + err);
        } else {
        console.log ('Succeeded connected to: ' + uristring);
        }
      });   
      //Build out the models
      this._schema = new Schema(mongoose);

      return this._schema;
    }  

    /**
     * Store generic data collection recordData in mongo db collection of Collectionname
     * @param collectionName 
     * @param recordData 
     */
    public storeRecord(recordData) {
        
        console.log('Saving');          
        console.log(recordData);


        let recordModel = this._schema.get('record');
        let created = new Date();
        recordModel.create({
            temp: recordData.temp, 
            humidity: recordData.humidity,
            created: created,
            timestamp: created.getTime() 
          },function (err) {
            if (err) console.log ('Error on save!')

            console.log('Saved');
          });
    }
}
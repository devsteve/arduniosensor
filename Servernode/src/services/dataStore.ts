const mongoose = require("mongoose"); 

import Schema from '../schema/schema';
import Config = require('../../config/env');



export default class dataStore { 

    private _schema : Schema;

    public constructor() {
       
       const uristring = 'mongodb://'+Config.env.mongodb;
       mongoose.connect(uristring, function (err, res) {
        if (err) {
        console.log ('ERROR connecting to: ' + uristring + '. ' + err);
        } else {
        console.log ('Succeeded connected to: ' + uristring);
        }
      });
      //Build out the models
      this._schema = new Schema(mongoose);
    }  

    /**
     * Store generic data collection recordData in mongo db collection of Collectionname
     * @param collectionName 
     * @param recordData 
     */
    public storeRecord(recordData) {
        

        let recordModel = this._schema.get('record');

        var record = new recordModel ({
            record: { 
                temp: recordData.temp, 
                humidity: recordData.humidity,
                created: new Date()}
          });
        
          // Saving it to the database.
          record.save(function (err) {if (err) console.log ('Error on save!')});
    }

    public retrieveRecords(count,callback) {
        let recordModel = this._schema.get('record');   
    
        recordModel.find({})
        .limit(count)
        .exec(callback);
    }

    public retrieveLatestRecord(callback) {
        let recordModel = this._schema.get('record');   
    
        recordModel.find({})
        .limit(1)
        .sort({'created' : -1})
        .exec(callback);
    }


}
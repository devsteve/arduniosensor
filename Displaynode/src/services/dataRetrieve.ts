const mongoose = require("mongoose"); 

import Schema from '../schema/schema';
import Config = require('../../config/env');



export default class dataRetrieve { 

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


    public retrieveRecords(count,callback) {
        let recordModel = this._schema.get('record');   
    
        recordModel.find()
        .limit(count)
        .sort({'timestamp' : -1})
        .exec(callback);
    }

    public retrieveLatestRecord(callback) {
        let recordModel = this._schema.get('record');   
    
        recordModel.find()
        .limit(1)
        .sort({'timestamp' : -1})
        .exec(callback);
    }


}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const schema_1 = require("../schema/schema");
const Config = require("../../config/env");
class dataStore {
    constructor() {
        /*
        if(!this._db) {
            console.log(Config.env.mongodb);
            const client = MongoClient(Config.env.mongodb);
            //Todo DB name should be set in the config
            client.connect(function(){
                let _db = client.db();
            });
        } else {
            return this._db;
        }
        */
        const uristring = 'mongodb://' + Config.env.mongodb;
        mongoose.connect(uristring, function (err, res) {
            if (err) {
                console.log('ERROR connecting to: ' + uristring + '. ' + err);
            }
            else {
                console.log('Succeeded connected to: ' + uristring);
            }
        });
        //Build out the models
        this._schema = new schema_1.default(mongoose);
    }
    /**
     * Store generic data collection recordData in mongo db collection of Collectionname
     * @param collectionName
     * @param recordData
     */
    storeRecord(recordData) {
        let recordModel = this._schema.get('record');
        var record = new recordModel({
            record: {
                temp: recordData.temp,
                humidity: recordData.humidity,
                created: new Date()
            }
        });
        // Saving it to the database.
        record.save(function (err) { if (err)
            console.log('Error on save!'); });
    }
    retrieveRecords(count, callback) {
        let recordModel = this._schema.get('record');
        recordModel.find({})
            .limit(count)
            .exec(callback);
    }
    retrieveLatestRecord(callback) {
        let recordModel = this._schema.get('record');
        recordModel.find({})
            .limit(1)
            .sort({ 'created': -1 })
            .exec(callback);
    }
}
exports.default = dataStore;
//# sourceMappingURL=dataStore.js.map
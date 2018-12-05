"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const schema_1 = require("../schema/schema");
const Config = require("../../config/env");
class dataStore {
    constructor() {
        console.log('Called');
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            const uristring = 'mongodb://' + Config.env.mongodb;
            yield mongoose.connect(uristring, function (err, res) {
                if (err) {
                    console.log('ERROR connecting to: ' + uristring + '. ' + err);
                }
                else {
                    console.log('Succeeded connected to: ' + uristring);
                }
            });
            //Build out the models
            this._schema = new schema_1.default(mongoose);
            return this._schema;
        });
    }
    /**
     * Store generic data collection recordData in mongo db collection of Collectionname
     * @param collectionName
     * @param recordData
     */
    storeRecord(recordData) {
        console.log('Saving');
        console.log(recordData);
        let recordModel = this._schema.get('record');
        let created = new Date();
        recordModel.create({
            temp: recordData.temp,
            humidity: recordData.humidity,
            created: created,
            timestamp: created.getTime()
        }, function (err) {
            if (err)
                console.log('Error on save!');
            console.log('Saved');
        });
    }
}
exports.default = dataStore;
//# sourceMappingURL=dataStore.js.map
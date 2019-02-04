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
class dataRetrieve {
    constructor() {
        console.log('Called');
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(process.env);
            const uristring = process.env.DISPLAY_MONGODB || '';
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
    retrieveRecords(count, callback) {
        let recordModel = this._schema.get('record');
        recordModel.find()
            .limit(count)
            .sort({ 'timestamp': -1 })
            .exec(callback);
    }
    retrieveLatestRecord(callback) {
        let recordModel = this._schema.get('record');
        recordModel.find()
            .limit(1)
            .sort({ 'timestamp': -1 })
            .exec(callback);
    }
}
exports.default = dataRetrieve;
//# sourceMappingURL=dataRetrieve.js.map
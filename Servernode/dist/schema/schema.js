"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Schema {
    constructor(mongoose) {
        this._schema = {
            record: {
                temp: { type: String, trim: true },
                humidity: { type: String, trim: true },
                created: { type: String, trim: true }
            }
        };
        this.models = {
            record: null
        };
        let recordContainer = new mongoose.Schema(this._schema.record);
        let recordModel = mongoose.model('records', recordContainer);
        this.models.record = recordModel;
    }
    get(modelName) {
        return this.models[modelName] || null;
    }
}
exports.default = Schema;
;
//# sourceMappingURL=schema.js.map
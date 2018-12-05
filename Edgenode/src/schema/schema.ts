export default class Schema {
    
    private _schema = {
        record: {
              temp: { type: String, trim: true },
              humidity: { type: String, trim: true },
              created: { type: String, trim: true },
              timestamp: { type: String }
        }
    }

    public models = {
        record: null
    }

    public constructor(mongoose) {

        let recordContainer = new mongoose.Schema(this._schema.record);    
        let recordModel = mongoose.model('records', recordContainer);


        this.models.record = recordModel;
    }

    public get(modelName) { 
        return this.models[modelName] || null;
    }
};




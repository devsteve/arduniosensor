"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ingressDataHandler {
    constructor() {
        /**
         * Extract based on string pattern
         */
        this.getValue = (valueName, datastring, isInt = false) => {
            let regexString = valueName + this._regex;
            let regex = new RegExp(regexString, "g");
            let found = regex.exec(datastring);
            return found && found[1] ? (isInt ? parseInt(found[1]) : found[1]) : null;
        };
    }
}
exports.default = ingressDataHandler;
//# sourceMappingURL=ingressDataHandler.js.map
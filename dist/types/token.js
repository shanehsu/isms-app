"use strict";
class Token {
    constructor(json) {
        Object.assign(this, json);
    }
    get id() {
        return this._id;
    }
}
exports.Token = Token;
//# sourceMappingURL=token.js.map
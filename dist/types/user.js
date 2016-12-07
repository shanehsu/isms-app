"use strict";
const token_1 = require('./token');
class User {
    constructor(json) {
        Object.assign(this, json);
        for (var i = 0; i < this.tokens.length; i++) {
            this.tokens[i] = new token_1.Token(this.tokens[i]);
        }
    }
    get id() { return this._id; }
}
exports.User = User;
//# sourceMappingURL=user.js.map
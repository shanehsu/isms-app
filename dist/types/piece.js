"use strict";
class Piece {
    constructor(json) {
        Object.assign(this, json);
    }
    get id() {
        return this._id;
    }
}
exports.Piece = Piece;
//# sourceMappingURL=piece.js.map
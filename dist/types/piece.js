"use strict";
var Piece = (function () {
    function Piece(json) {
        Object.assign(this, json);
    }
    Object.defineProperty(Piece.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    return Piece;
}());
exports.Piece = Piece;
//# sourceMappingURL=piece.js.map
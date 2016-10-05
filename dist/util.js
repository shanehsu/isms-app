"use strict";
function RandomString(length) {
    var str = "";
    var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var size = charset.length;
    for (var i = 0; i < length; i++) {
        str += charset.charAt(Math.floor(Math.random() * size));
    }
    return str;
}
exports.RandomString = RandomString;
//# sourceMappingURL=util.js.map
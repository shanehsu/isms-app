System.register(['./group-name.pipe', './unit-name.pipe'], function(exports_1) {
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (group_name_pipe_1_1) {
                exportStar_1(group_name_pipe_1_1);
            },
            function (unit_name_pipe_1_1) {
                exportStar_1(unit_name_pipe_1_1);
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=pipes.js.map
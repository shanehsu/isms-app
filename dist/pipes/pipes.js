System.register(['./group-name.pipe', './unit-name.pipe', './user-name.pipe', './chinese-date.pipe'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters:[
            function (group_name_pipe_1_1) {
                exports_1({
                    "GroupNamePipe": group_name_pipe_1_1["GroupNamePipe"]
                });
            },
            function (unit_name_pipe_1_1) {
                exports_1({
                    "UnitNamePipe": unit_name_pipe_1_1["UnitNamePipe"]
                });
            },
            function (user_name_pipe_1_1) {
                exports_1({
                    "UserNamePipe": user_name_pipe_1_1["UserNamePipe"]
                });
            },
            function (chinese_date_pipe_1_1) {
                exports_1({
                    "ChineseDatePipe": chinese_date_pipe_1_1["ChineseDatePipe"]
                });
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=pipes.js.map
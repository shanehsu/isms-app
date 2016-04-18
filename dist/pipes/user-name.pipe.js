System.register(['angular2/core', './../services/user.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, user_service_1;
    var UserNamePipe;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            }],
        execute: function() {
            UserNamePipe = (function () {
                function UserNamePipe(userService) {
                    var _this = this;
                    this._users = {};
                    userService.get().then(function (users) {
                        for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
                            var user = users_1[_i];
                            _this._users[user.id] = user.name;
                        }
                    });
                }
                UserNamePipe.prototype.transform = function (id) {
                    return this._users[id];
                };
                UserNamePipe = __decorate([
                    core_1.Pipe({ name: 'userName', pure: false }), 
                    __metadata('design:paramtypes', [user_service_1.UserService])
                ], UserNamePipe);
                return UserNamePipe;
            }());
            exports_1("UserNamePipe", UserNamePipe);
        }
    }
});
//# sourceMappingURL=user-name.pipe.js.map
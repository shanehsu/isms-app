"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// Angular 2
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
// Services
var user_service_1 = require('./../../../services/user.service');
var unit_service_1 = require('./../../../services/unit.service');
// Pipes
var pipes_1 = require('./../../../pipes/pipes');
var UserListComponent = (function () {
    function UserListComponent(_router, _userService) {
        this._router = _router;
        this._userService = _userService;
    }
    UserListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._users = [];
        this._userService.get().then(function (users) { return _this._users = users; })
            .catch(function (err) { return console.error(err); });
    };
    UserListComponent.prototype.new = function () {
        var _this = this;
        this._userService.new()
            .then(function (id) { return _this.edit(id); })
            .catch(console.error);
    };
    UserListComponent.prototype.edit = function (id) {
        this._router.navigate(['/', id]);
    };
    UserListComponent.prototype.delete = function (id) {
        var _this = this;
        if (!confirm('確定刪除該名使用者?')) {
            return;
        }
        this._userService.delete(id).then(function () {
            _this._userService.get().then(function (users) { return _this._users = users; })
                .catch(function (err) { return console.error(err); });
        });
    };
    UserListComponent = __decorate([
        core_1.Component({
            selector: 'user-list',
            templateUrl: '/app/admin/user-admin/user-list/user-list.template.html',
            providers: [user_service_1.UserService, unit_service_1.UnitService],
            pipes: [pipes_1.GroupNamePipe, pipes_1.UnitNamePipe]
        }), 
        __metadata('design:paramtypes', [router_1.Router, user_service_1.UserService])
    ], UserListComponent);
    return UserListComponent;
}());
exports.UserListComponent = UserListComponent;
//# sourceMappingURL=user-list.component.js.map
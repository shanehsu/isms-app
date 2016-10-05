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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
// Services
var user_service_1 = require("./../../services/user.service");
var UsersListComponent = (function () {
    function UsersListComponent(router, route, userService) {
        this.router = router;
        this.route = route;
        this.userService = userService;
    }
    UsersListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.users = [];
        this.userService.get().then(function (users) { return _this.users = users; })
            .catch(function (err) { return console.error(err); });
    };
    UsersListComponent.prototype.new = function () {
        var _this = this;
        this.userService.new()
            .then(function (id) { return _this.edit(id); })
            .catch(console.error);
    };
    UsersListComponent.prototype.edit = function (id) {
        this.router.navigate([id], { relativeTo: this.route });
    };
    UsersListComponent.prototype.delete = function (id) {
        var _this = this;
        if (!confirm('確定刪除該名使用者?')) {
            return;
        }
        this.userService.delete(id).then(function () {
            _this.userService.get().then(function (users) { return _this.users = users; })
                .catch(function (err) { return console.error(err); });
        });
    };
    return UsersListComponent;
}());
UsersListComponent = __decorate([
    core_1.Component({
        template: "\n    <div class=\"ui one column grid\">\n      <form class=\"ui form right aligned column\">\n        <button type=\"button\" class=\"ui right floated blue labeled icon button\" (click)=\"new()\">\n          <i class=\"plus icon\"></i>\u65B0\u589E\u4F7F\u7528\u8005\n        </button>\n      </form>\n    </div>\n\n    <table class=\"ui striped table\">\n      <thead>\n        <tr>\n          <th style=\"min-width: 7em;\">\u59D3\u540D</th>\n          <th style=\"width: 70%\">\u96FB\u5B50\u90F5\u4EF6</th>\n          <th style=\"width: 30%\">\u55AE\u4F4D</th>\n          <th style=\"min-width: 5em;\">\u6B0A\u9650</th>\n          <th style=\"min-width: 12em;\">\u52D5\u4F5C</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor=\"let user of users\">\n          <td>{{user.name}}</td>\n          <td>{{user.email}}</td>\n          <td>{{user.unit | unitName}}</td>\n          <td>{{user.group | groupName}}</td>\n          <td style=\"text-align: center;\">\n            <div class=\"small ui buttons\">\n              <button type=\"button\" class=\"ui basic teal button\" (click)=\"edit(user.id)\">\u7DE8\u8F2F</button>\n              <button type=\"button\" class=\"ui basic red button\" (click)=\"delete(user.id)\">\u522A\u9664</button>\n            </div>\n          </td>\n        </tr>\n      </tbody>\n    </table>"
    }),
    __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, user_service_1.UserService])
], UsersListComponent);
exports.UsersListComponent = UsersListComponent;
//# sourceMappingURL=users-list.component.js.map
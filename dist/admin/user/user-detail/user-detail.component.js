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
var core_1 = require("@angular/core");
var user_service_1 = require("./../../../services/user.service");
var unit_service_1 = require("./../../../services/unit.service");
var unit_name_pipe_1 = require("./../../../pipes/unit-name.pipe");
var router_1 = require("@angular/router");
var UserDetailComponent = (function () {
    function UserDetailComponent(_router, _routeSegment, _userService) {
        this._router = _router;
        this._routeSegment = _routeSegment;
        this._userService = _userService;
    }
    UserDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._user = this._userService.emptyUser();
        this._id = this._routeSegment.getParam('id');
        this._userService.get(this._id).then(function (user) { return _this._user = user[0]; }).catch(console.error);
    };
    UserDetailComponent.prototype.ngAfterViewInit = function () {
        $('#unit_label').popup({
            inline: true,
            hoverable: true
        });
        $('div#groupRadio div.ui.radio.checkbox').checkbox();
    };
    UserDetailComponent.prototype.submit = function () {
        var _this = this;
        this._userService.update(this._user)
            .then(function () { return _this._router.navigate(['admin', 'user']); })
            .catch(console.error);
    };
    UserDetailComponent.prototype.cancel = function () {
        this._router.navigate(['admin', 'user']);
    };
    UserDetailComponent.prototype.gotoUnit = function (unitID) {
        this._router.navigate(['admin', 'unit', unitID]);
    };
    return UserDetailComponent;
}());
UserDetailComponent = __decorate([
    core_1.Component({
        selector: 'user-detail',
        templateUrl: '/app/admin/user-admin/user-detail/user-detail.template.html',
        pipes: [unit_name_pipe_1.UnitNamePipe],
        providers: [user_service_1.UserService, unit_service_1.UnitService]
    }),
    __metadata("design:paramtypes", [router_1.Router, typeof (_a = typeof router_1.RouteSegment !== "undefined" && router_1.RouteSegment) === "function" && _a || Object, user_service_1.UserService])
], UserDetailComponent);
exports.UserDetailComponent = UserDetailComponent;
var _a;
//# sourceMappingURL=user-detail.component.js.map
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var auth_service_1 = require('./../services/auth.service');
var navigation_login_component_1 = require('./isms-nav-login/navigation-login.component');
var NavigationComponent = (function () {
    function NavigationComponent(router, _location, _authService, _config) {
        this.router = router;
        this._location = _location;
        this._authService = _authService;
        this._config = _config;
    }
    NavigationComponent.prototype.ngOnInit = function () {
        console.dir(this.router.routeTree);
        this.userGroup = 4;
        this.navigationItems = this._config.navigationItems;
    };
    NavigationComponent.prototype.navigate = function (item) {
        console.log(item.path);
        this.router.navigate([item.path]);
    };
    NavigationComponent.prototype.isActive = function (item) {
        return this._location.path().startsWith(item.path);
    };
    NavigationComponent.prototype.renewPrivilege = function () {
        var _this = this;
        if (!this._authService.has_token()) {
            this.userGroup = 4;
        }
        else {
            this._authService.me().then(function (user) {
                _this.userGroup = user.group;
            });
        }
    };
    NavigationComponent = __decorate([
        core_1.Component({
            selector: 'isms-nav',
            templateUrl: '/app/isms-nav/navigation.template.html',
            directives: [navigation_login_component_1.NavigationLoginComponent]
        }),
        __param(3, core_1.Inject('app.config')), 
        __metadata('design:paramtypes', [router_1.Router, common_1.Location, auth_service_1.AuthService, Object])
    ], NavigationComponent);
    return NavigationComponent;
}());
exports.NavigationComponent = NavigationComponent;
//# sourceMappingURL=navigation.component.js.map
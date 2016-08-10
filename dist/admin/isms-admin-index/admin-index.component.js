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
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var auth_service_1 = require('./../../services/auth.service');
var news_admin_component_1 = require('./../news-admin/news-admin.component');
var user_admin_component_1 = require('./../user-admin/user-admin.component');
var unit_admin_component_1 = require('./../unit-admin/unit-admin.component');
var form_admin_component_1 = require('./../form-admin/form-admin.component');
var AdminIndexComponent = (function () {
    function AdminIndexComponent(router, location, _authService, _config) {
        this.router = router;
        this.location = location;
        this._authService = _authService;
        this._config = _config;
    }
    AdminIndexComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.privilege = 4;
        this.adminItems = this._config.adminItems;
        this._authService.privilege().then(function (p) { return _this.privilege = p; });
        if (this.location.path() == "/admin") {
            this.router.navigate(['/admin/news']);
        }
    };
    AdminIndexComponent.prototype.isActive = function (item) {
        return this.location.path().startsWith('/admin' + item.path);
    };
    AdminIndexComponent.prototype.navigate = function (item) {
        this.router.navigate(['/admin' + item.path]);
    };
    AdminIndexComponent = __decorate([
        core_1.Component({
            selector: 'isms-admin-index',
            templateUrl: '/app/admin/isms-admin-index/admin-index.template.html',
            directives: [router_1.ROUTER_DIRECTIVES]
        }),
        router_1.Routes([
            {
                path: '/news',
                component: news_admin_component_1.NewsAdminComponent,
            },
            {
                path: '/user',
                component: user_admin_component_1.UserAdminComponent
            },
            {
                path: '/unit',
                component: unit_admin_component_1.UnitAdminComponent
            },
            {
                path: '/form',
                component: form_admin_component_1.FormAdminComponent
            }
        ]),
        __param(3, core_1.Inject('app.config')), 
        __metadata('design:paramtypes', [router_1.Router, common_1.Location, auth_service_1.AuthService, Object])
    ], AdminIndexComponent);
    return AdminIndexComponent;
}());
exports.AdminIndexComponent = AdminIndexComponent;
//# sourceMappingURL=admin-index.component.js.map
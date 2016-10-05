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
var core_1 = require("@angular/core");
var auth_service_1 = require("./../services/auth.service");
var AdminComponent = (function () {
    function AdminComponent(authService, config) {
        this.authService = authService;
        this.config = config;
    }
    AdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.privilege = 4;
        this.adminItems = this.config.adminItems;
        this.authService.privilege().then(function (p) { return _this.privilege = p; });
    };
    return AdminComponent;
}());
AdminComponent = __decorate([
    core_1.Component({
        template: "\n  <h2 class=\"ui header\">\u7BA1\u7406\u5340</h2>\n  <div class=\"ui grid\">\n    <div class=\"sixteen wide mobile two wide computer column\">\n      <div class=\"ui secondary stacking fluid vertical pointing menu\">\n        <template ngFor let-item [ngForOf]=\"adminItems\">\n          <a class=\"active item\" *ngIf=\"privilege <= item.group\" [routerLink]=\"item.path\" routerLinkActive=\"active\">\n            {{item.name}}\n          </a>\n        </template>\n      </div>\n    </div>\n    <div id=\"content\" class=\"sixteen wide mobile fourteen wide computer column\">\n      <router-outlet></router-outlet>\n    </div>\n  </div>"
    }),
    __param(1, core_1.Inject('app.config')),
    __metadata("design:paramtypes", [auth_service_1.AuthService, Object])
], AdminComponent);
exports.AdminComponent = AdminComponent;
//# sourceMappingURL=admin.component.js.map
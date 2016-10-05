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
// 路由器
var router_1 = require("@angular/router");
// 服務
var form_service_1 = require("./../../../services/form.service");
var FormListComponent = (function () {
    function FormListComponent(_formService, _router, routeSegment) {
        this._formService = _formService;
        this._router = _router;
        this.routeSegment = routeSegment;
    }
    FormListComponent.prototype.refresh = function () {
        var _this = this;
        this._formService.forms()
            .then(function (forms) { return _this._forms = forms; })
            .catch(console.error);
    };
    FormListComponent.prototype.ngOnInit = function () {
        this.refresh();
    };
    FormListComponent.prototype.new = function () {
        var _this = this;
        this._formService.new()
            .then(function (id) { return _this._router.navigate([id], _this.routeSegment); })
            .catch(console.error);
    };
    FormListComponent.prototype.edit = function (id) {
        this._router.navigate([id], this.routeSegment);
    };
    FormListComponent.prototype.delete = function (id) {
        var _this = this;
        this._formService.delete(id)
            .then(function () { return _this.refresh(); })
            .catch(console.error);
    };
    return FormListComponent;
}());
FormListComponent = __decorate([
    core_1.Component({
        selector: 'form-list',
        templateUrl: '/app/admin/form-admin/form-list/form-list.template.html',
        providers: [form_service_1.FormService]
    }),
    __metadata("design:paramtypes", [form_service_1.FormService,
        router_1.Router, typeof (_a = typeof router_1.RouteSegment !== "undefined" && router_1.RouteSegment) === "function" && _a || Object])
], FormListComponent);
exports.FormListComponent = FormListComponent;
var _a;
//# sourceMappingURL=form-list.component.js.map
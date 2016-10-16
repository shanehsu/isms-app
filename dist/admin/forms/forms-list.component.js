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
// 路由器
var router_1 = require('@angular/router');
// 服務
var form_service_1 = require('./../../services/form.service');
var FormsListComponent = (function () {
    function FormsListComponent(formService, router, route) {
        this.formService = formService;
        this.router = router;
        this.route = route;
    }
    FormsListComponent.prototype.refresh = function () {
        var _this = this;
        this.formService.forms()
            .then(function (forms) { return _this._forms = forms; })
            .catch(console.error);
    };
    FormsListComponent.prototype.ngOnInit = function () {
        this.refresh();
    };
    FormsListComponent.prototype.new = function () {
        var _this = this;
        this.formService.new()
            .then(function (id) { return _this.router.navigate([id], { relativeTo: _this.route }); })
            .catch(console.error);
    };
    FormsListComponent.prototype.edit = function (id) {
        this.router.navigate([id], { relativeTo: this.route });
    };
    FormsListComponent.prototype.delete = function (id) {
        var _this = this;
        this.formService.delete(id)
            .then(function () { return _this.refresh(); })
            .catch(console.error);
    };
    FormsListComponent = __decorate([
        core_1.Component({
            template: "\n  <div class=\"ui one column grid\">\n    <form class=\"ui form right aligned column\">\n      <button type=\"button\" class=\"ui right floated blue labeled icon button\" (click)=\"new()\">\n        <i class=\"plus icon\"></i>\n        \u65B0\u589E\u8868\u55AE\n      </button>\n    </form>\n  </div>\n\n  <table class=\"ui striped table\">\n    <thead>\n      <tr>\n        <th>\u8868\u55AE ID</th>\n        <th>\u8868\u55AE</th>\n        <th style=\"width: 12em;\">\u52D5\u4F5C</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr *ngFor=\"let form of _forms\">\n        <td>{{form.identifier}}</td>\n        <td>{{form.name}}</td>\n        <td style=\"text-align: center;\">\n          <div class=\"small ui buttons\">\n            <button type=\"button\" class=\"ui basic teal button\" (click)=\"edit(form._id)\">\u7DE8\u8F2F</button>\n            <button type=\"button\" class=\"ui basic red button\" (click)=\"delete(form._id)\">\u522A\u9664</button>\n          </div>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n  "
        }), 
        __metadata('design:paramtypes', [form_service_1.FormService, router_1.Router, router_1.ActivatedRoute])
    ], FormsListComponent);
    return FormsListComponent;
}());
exports.FormsListComponent = FormsListComponent;
//# sourceMappingURL=forms-list.component.js.map
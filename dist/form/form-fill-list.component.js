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
var form_service_1 = require("./../services/form.service");
var router_1 = require("@angular/router");
var FormFillListComponent = (function () {
    function FormFillListComponent(formService, router, routeSegment) {
        this.formService = formService;
        this.router = router;
        this.routeSegment = routeSegment;
    }
    FormFillListComponent.prototype.refresh = function () {
        var _this = this;
        this.formService.fillableForms()
            .then(function (forms) { return _this._forms = forms; })
            .catch(console.error);
    };
    FormFillListComponent.prototype.ngOnInit = function () {
        this.refresh();
    };
    FormFillListComponent.prototype.fill = function (id) {
        this.router.navigate([id], this.routeSegment);
    };
    return FormFillListComponent;
}());
FormFillListComponent = __decorate([
    core_1.Component({
        selector: 'isms-form-list',
        template: "\n  <h2 class=\"ui header\">\u700F\u89BD\u8868\u55AE</h2>\n  <table class=\"ui striped basic table\">\n    <thead>\n      <tr>\n        <th style=\"width: 10em;\">\u8868\u55AE ID</th>\n        <th style=\"\">\u8868\u55AE</th>\n        <th class=\"center aligned\" style=\"width: 10em;\">\u52D5\u4F5C</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr *ngFor=\"let form of _forms\">\n        <td>{{form.identifier}}</td>\n        <td><h4 class=\"ui header\">{{form.name}}</h4></td>\n        <td class=\"center aligned selectable\"><a class=\"link\" (click)=\"fill(form._id)\">\u586B\u5BEB</a></td>\n      </tr>\n    </tbody>\n  </table>",
        providers: [form_service_1.FormService],
        directives: []
    }),
    __metadata("design:paramtypes", [form_service_1.FormService, router_1.Router, typeof (_a = typeof router_1.RouteSegment !== "undefined" && router_1.RouteSegment) === "function" && _a || Object])
], FormFillListComponent);
exports.FormFillListComponent = FormFillListComponent;
var _a;
//# sourceMappingURL=form-fill-list.component.js.map
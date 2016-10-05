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
// 子元件
var form_list_component_1 = require("./form-list/form-list.component");
var form_detail_component_1 = require("./form-detail/form-detail.component");
var FormAdminComponent = (function () {
    function FormAdminComponent() {
    }
    return FormAdminComponent;
}());
FormAdminComponent = __decorate([
    core_1.Component({
        selector: 'form-admin',
        templateUrl: '/app/admin/form-admin/form-admin.template.html',
        directives: [router_1.ROUTER_DIRECTIVES]
    }),
    Routes([
        {
            path: '/',
            component: form_list_component_1.FormListComponent,
        },
        {
            path: '/:id',
            component: form_detail_component_1.FormDetailComponent
        }
    ]),
    __metadata("design:paramtypes", [])
], FormAdminComponent);
exports.FormAdminComponent = FormAdminComponent;
//# sourceMappingURL=form-admin.component.js.map
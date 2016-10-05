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
var form_list_component_1 = require("./form-list.component");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var routes = [
    {
        path: 'forms',
        component: form_list_component_1.FormListComponent,
    }
];
var newsRoutingModule = router_1.RouterModule.forRoot(routes);
var FormsModule = (function () {
    function FormsModule() {
    }
    return FormsModule;
}());
FormsModule = __decorate([
    core_1.NgModule({
        declarations: [
            form_list_component_1.FormListComponent
        ],
        imports: [
            common_1.CommonModule,
            newsRoutingModule
        ]
    }),
    __metadata("design:paramtypes", [])
], FormsModule);
exports.FormsModule = FormsModule;
//# sourceMappingURL=form.module.js.map
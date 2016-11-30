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
var form_component_1 = require("./form.component");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var form_controls_module_1 = require("./../controls/form-controls.module");
var FormsComponent = (function () {
    function FormsComponent() {
    }
    return FormsComponent;
}());
FormsComponent = __decorate([
    core_1.Component({
        template: "<router-outlet></router-outlet>"
    }),
    __metadata("design:paramtypes", [])
], FormsComponent);
var routes = [
    {
        path: 'forms',
        component: FormsComponent,
        children: [
            { path: '', component: form_list_component_1.FormListComponent },
            { path: ':id', component: form_component_1.FormComponent }
        ]
    }
];
var newsRoutingModule = router_1.RouterModule.forRoot(routes);
var formsModule = (function () {
    function formsModule() {
    }
    return formsModule;
}());
formsModule = __decorate([
    core_1.NgModule({
        declarations: [
            FormsComponent,
            form_list_component_1.FormListComponent,
            form_component_1.FormComponent
        ],
        imports: [
            common_1.CommonModule,
            router_1.RouterModule,
            forms_1.FormsModule,
            newsRoutingModule,
            form_controls_module_1.formControlsModule
        ]
    }),
    __metadata("design:paramtypes", [])
], formsModule);
exports.formsModule = formsModule;
//# sourceMappingURL=forms.module.js.map
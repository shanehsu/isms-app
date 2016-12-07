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
const core_1 = require('@angular/core');
const navigation_component_1 = require('./navigation.component');
const directives_module_1 = require('./../directives/directives.module');
const common_1 = require('@angular/common');
const router_1 = require('@angular/router');
const forms_1 = require('@angular/forms');
const ng_semantic_1 = require("ng-semantic");
let navigationModule = class navigationModule {
};
navigationModule = __decorate([
    core_1.NgModule({
        declarations: [
            navigation_component_1.NavigationComponent
        ],
        exports: [
            navigation_component_1.NavigationComponent
        ],
        imports: [
            directives_module_1.directivesModule,
            common_1.CommonModule,
            router_1.RouterModule,
            forms_1.FormsModule,
            ng_semantic_1.NgSemanticModule
        ]
    }), 
    __metadata('design:paramtypes', [])
], navigationModule);
exports.navigationModule = navigationModule;
//# sourceMappingURL=navigation.module.js.map
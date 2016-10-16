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
var core_1 = require('@angular/core');
var navigation_component_1 = require('./navigation.component');
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var navigationModule = (function () {
    function navigationModule() {
    }
    navigationModule = __decorate([
        core_1.NgModule({
            declarations: [
                navigation_component_1.NavigationComponent
            ],
            exports: [
                navigation_component_1.NavigationComponent
            ],
            imports: [
                common_1.CommonModule,
                router_1.RouterModule
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], navigationModule);
    return navigationModule;
}());
exports.navigationModule = navigationModule;
//# sourceMappingURL=navigation.module.js.map
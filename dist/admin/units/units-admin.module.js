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
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var pipes_module_1 = require('./../../pipes/pipes.module');
var units_list_component_1 = require('./units-list.component');
exports.UnitsListComponent = units_list_component_1.UnitsListComponent;
var unit_detail_component_1 = require('./unit-detail.component');
exports.UnitDetailComponent = unit_detail_component_1.UnitDetailComponent;
var UnitAdminComponent = (function () {
    function UnitAdminComponent() {
    }
    UnitAdminComponent = __decorate([
        core_1.Component({
            template: "<router-outlet></router-outlet>"
        }), 
        __metadata('design:paramtypes', [])
    ], UnitAdminComponent);
    return UnitAdminComponent;
}());
exports.UnitAdminComponent = UnitAdminComponent;
var unitsAdminModule = (function () {
    function unitsAdminModule() {
    }
    unitsAdminModule = __decorate([
        core_1.NgModule({
            declarations: [
                UnitAdminComponent,
                units_list_component_1.UnitsListComponent,
                unit_detail_component_1.UnitDetailComponent
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule,
                pipes_module_1.pipesModule
            ],
            exports: [
                UnitAdminComponent,
                units_list_component_1.UnitsListComponent,
                unit_detail_component_1.UnitDetailComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], unitsAdminModule);
    return unitsAdminModule;
}());
exports.unitsAdminModule = unitsAdminModule;
//# sourceMappingURL=units-admin.module.js.map
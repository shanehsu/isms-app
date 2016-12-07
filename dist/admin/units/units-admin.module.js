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
const common_1 = require('@angular/common');
const forms_1 = require('@angular/forms');
const router_1 = require('@angular/router');
const pipes_module_1 = require('./../../pipes/pipes.module');
const units_list_component_1 = require('./units-list.component');
exports.UnitsListComponent = units_list_component_1.UnitsListComponent;
const unit_detail_component_1 = require('./unit-detail.component');
exports.UnitDetailComponent = unit_detail_component_1.UnitDetailComponent;
let UnitAdminComponent = class UnitAdminComponent {
};
UnitAdminComponent = __decorate([
    core_1.Component({
        template: `<router-outlet></router-outlet>`
    }), 
    __metadata('design:paramtypes', [])
], UnitAdminComponent);
exports.UnitAdminComponent = UnitAdminComponent;
let unitsAdminModule = class unitsAdminModule {
};
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
exports.unitsAdminModule = unitsAdminModule;
//# sourceMappingURL=units-admin.module.js.map
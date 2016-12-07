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
const records_list_component_1 = require('./records-list.component');
const record_component_1 = require('./record.component');
const record_data_display_component_1 = require('./record-data-display.component');
const common_1 = require('@angular/common');
const forms_1 = require('@angular/forms');
const router_1 = require('@angular/router');
let RecordsComponent = class RecordsComponent {
};
RecordsComponent = __decorate([
    core_1.Component({
        template: `<router-outlet></router-outlet>`
    }), 
    __metadata('design:paramtypes', [])
], RecordsComponent);
let routes = [
    {
        path: 'records',
        component: RecordsComponent,
        children: [
            { path: '', component: records_list_component_1.RecordsListComponent },
            { path: ':id', component: record_component_1.RecordComponent }
        ]
    }
];
const recordsRoutingModule = router_1.RouterModule.forChild(routes);
let recordsModule = class recordsModule {
};
recordsModule = __decorate([
    core_1.NgModule({
        declarations: [
            RecordsComponent,
            records_list_component_1.RecordsListComponent,
            record_component_1.RecordComponent,
            record_data_display_component_1.RecordDataDisplay
        ],
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            recordsRoutingModule
        ]
    }), 
    __metadata('design:paramtypes', [])
], recordsModule);
exports.recordsModule = recordsModule;
//# sourceMappingURL=records.module.js.map
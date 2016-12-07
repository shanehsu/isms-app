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
const custom_controls_module_1 = require('./../../controls/custom-controls.module');
const forms_list_component_1 = require('./forms-list.component');
exports.FormsListComponent = forms_list_component_1.FormsListComponent;
const form_detail_component_1 = require('./form-detail.component');
exports.FormDetailComponent = form_detail_component_1.FormDetailComponent;
const revision_component_1 = require('./revision.component');
const field_component_1 = require('./field.component');
const field_metadata_component_1 = require('./field-metadata.component');
let FieldTypes = [
    {
        label: '單行文字',
        value: 'shortText'
    },
    {
        label: '多行文字',
        value: 'longText'
    },
    {
        label: '日期',
        value: 'date'
    },
    {
        label: '時間',
        value: 'time'
    },
    {
        label: '選擇',
        value: 'options'
    },
    {
        label: '表格',
        value: 'table'
    }
];
let FieldTypePipe = class FieldTypePipe {
    transform(value) {
        if (!value) {
            return '';
        }
        return FieldTypes.find(type => type.value == value).label;
    }
};
FieldTypePipe = __decorate([
    core_1.Pipe({
        name: 'fieldType'
    }), 
    __metadata('design:paramtypes', [])
], FieldTypePipe);
let FormAdminComponent = class FormAdminComponent {
};
FormAdminComponent = __decorate([
    core_1.Component({
        template: `<router-outlet></router-outlet>`
    }), 
    __metadata('design:paramtypes', [])
], FormAdminComponent);
exports.FormAdminComponent = FormAdminComponent;
let formsAdminModule = class formsAdminModule {
};
formsAdminModule = __decorate([
    core_1.NgModule({
        declarations: [
            FormAdminComponent,
            forms_list_component_1.FormsListComponent,
            form_detail_component_1.FormDetailComponent,
            revision_component_1.RevisionComponent,
            field_component_1.FieldComponent,
            field_metadata_component_1.EmptyFieldMetadataComponent,
            field_metadata_component_1.OptionFieldMetadataComponent,
            field_metadata_component_1.TableFieldMetadataComponent,
            FieldTypePipe
        ],
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            router_1.RouterModule,
            custom_controls_module_1.customControlsModule
        ],
        providers: [
            { provide: 'fieldTypes', useValue: FieldTypes }
        ],
        exports: [
            FormAdminComponent,
            forms_list_component_1.FormsListComponent,
            form_detail_component_1.FormDetailComponent
        ]
    }), 
    __metadata('design:paramtypes', [])
], formsAdminModule);
exports.formsAdminModule = formsAdminModule;
//# sourceMappingURL=forms-admin.module.js.map
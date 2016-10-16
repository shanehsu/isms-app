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
var pipes_module_1 = require('./../pipes/pipes.module');
var date_form_controls_1 = require('./form-controls/date-form-controls');
var dropdown_options_form_control_1 = require('./form-controls/dropdown-options-form-control');
var multi_line_text_form_control_1 = require('./form-controls/multi-line-text-form-control');
var multi_options_form_control_1 = require('./form-controls/multi-options-form-control');
var single_line_text_form_control_1 = require('./form-controls/single-line-text-form-control');
var single_options_form_control_1 = require('./form-controls/single-options-form-control');
var table_form_control_1 = require('./form-controls/table-form-control');
var time_form_control_1 = require('./form-controls/time-form-control');
var fields_component_1 = require('./form-controls/fields.component');
var formControlsModule = (function () {
    function formControlsModule() {
    }
    formControlsModule = __decorate([
        core_1.NgModule({
            declarations: [
                date_form_controls_1.DateFormControl,
                dropdown_options_form_control_1.DropdownOptionsFormControl,
                multi_line_text_form_control_1.MultiLineTextFormControl,
                multi_options_form_control_1.MultiOptionsFormControl,
                single_line_text_form_control_1.SingleLineTextFormControl,
                single_options_form_control_1.SingleOptionsFormControl,
                table_form_control_1.TableFormControl,
                time_form_control_1.TimeFormControl,
                fields_component_1.FieldsComponent
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                pipes_module_1.pipesModule
            ],
            exports: [
                date_form_controls_1.DateFormControl,
                dropdown_options_form_control_1.DropdownOptionsFormControl,
                multi_line_text_form_control_1.MultiLineTextFormControl,
                multi_options_form_control_1.MultiOptionsFormControl,
                single_line_text_form_control_1.SingleLineTextFormControl,
                single_options_form_control_1.SingleOptionsFormControl,
                table_form_control_1.TableFormControl,
                time_form_control_1.TimeFormControl,
                fields_component_1.FieldsComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], formControlsModule);
    return formControlsModule;
}());
exports.formControlsModule = formControlsModule;
//# sourceMappingURL=form-controls.module.js.map
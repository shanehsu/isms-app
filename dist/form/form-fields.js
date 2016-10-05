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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var isms_form_controls_1 = require("./../controls/isms-form-controls");
var isms_single_options_form_control_1 = require("./../controls/isms-form-controls/isms-single-options-form-control");
var isms_multi_options_form_control_1 = require("./../controls/isms-form-controls/isms-multi-options-form-control");
var isms_dropdown_options_form_control_1 = require("./../controls/isms-form-controls/isms-dropdown-options-form-control");
var isms_table_form_control_1 = require("./../controls/isms-form-controls/isms-table-form-control");
var core_2 = require("@angular/core");
var common_1 = require("@angular/common");
var FormFields = (function () {
    function FormFields(cd, debug) {
        this.debug = debug;
        this._onChanged = function (_) { };
        this._onTouched = function () { };
        this._nested = false;
        this.cd = cd;
        cd.valueAccessor = this;
    }
    FormFields.prototype.ngOnInit = function () {
    };
    // 與 Value Accessor 有關的
    // 從 Value Accessor 接收資料
    FormFields.prototype.writeValue = function (value) {
        this._model = value;
    };
    FormFields.prototype.registerOnChange = function (fn) {
        this._onChanged = fn;
    };
    FormFields.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    return FormFields;
}());
__decorate([
    core_1.Input("fields"),
    __metadata("design:type", Array)
], FormFields.prototype, "_fields", void 0);
__decorate([
    core_1.Input("nested"),
    __metadata("design:type", Boolean)
], FormFields.prototype, "_nested", void 0);
FormFields = __decorate([
    core_1.Component({
        selector: 'isms-form-fields',
        template: "\n  <template ngFor let-item [ngForOf]=\"_fields\" let-i=\"index\">\n      <template [ngIf]=\"item.type == 'shortText'\">\n        <div class=\"field\">\n          <label>{{item.name}}</label>\n          <form-control type=\"text\" row=\"single\" [(ngModel)]=\"_model[i]\"></form-control>\n        </div>\n      </template>\n      \n      <template [ngIf]=\"item.type == 'longText'\">\n        <div class=\"field\">\n          <label>{{item.name}}</label>\n          <form-control type=\"text\" row=\"multi\" [(ngModel)]=\"_model[i]\"></form-control>\n        </div>\n      </template>\n      \n      <template [ngIf]=\"item.type == 'date'\">\n        <div class=\"field\">\n          <label>{{item.name}}</label>\n          <form-control type=\"date\" [(ngModel)]=\"_model[i]\"></form-control>\n        </div>\n      </template>\n      \n      <template [ngIf]=\"item.type == 'time'\">\n        <div class=\"field\">\n          <label>{{item.name}}</label>\n          <form-control type=\"time\" [(ngModel)]=\"_model[i]\"></form-control>\n        </div>\n      </template>\n      \n      <template [ngIf]=\"item.type == 'options'\">\n        <template [ngIf]=\"item.metadata.presentation == 'radio'\">\n          <div class=\"field\">\n            <label>{{item.name}}</label>\n            <form-control type=\"options\" presentation=\"single\" [metadata]=\"item.metadata\" [(ngModel)]=\"_model[i]\"></form-control>\n          </div>\n        </template>\n        <template [ngIf]=\"item.metadata.presentation == 'checkbox'\">\n          <div class=\"field\">\n            <label>{{item.name}}</label>\n            <form-control type=\"options\" presentation=\"multi\" [metadata]=\"item.metadata\" [(ngModel)]=\"_model[i]\"></form-control>\n          </div>\n        </template>\n        <template [ngIf]=\"item.metadata.presentation == 'select'\">\n          <div class=\"field\">\n            <label>{{item.name}}</label>\n            <form-control type=\"options\" presentation=\"dropdown\" [metadata]=\"item.metadata\" [(ngModel)]=\"_model[i]\"></form-control>\n          </div>\n        </template>\n      </template>\n      \n      <template [ngIf]=\"item.type == 'table'\">\n        <div class=\"field\">\n          <label>{{item.name}}</label>\n          <form-control type=\"table\" [metadata]=\"item.metadata\" [(ngModel)]=\"_model[i]\"></form-control>\n        </div>\n      </template>\n  </template>",
        directives: [isms_form_controls_1.SingleLineTextFormControl,
            isms_form_controls_1.MultiLineTextFormControl,
            isms_form_controls_1.DateFormControl,
            isms_form_controls_1.TimeFormControl,
            isms_multi_options_form_control_1.MultiOptionsFormControl,
            isms_dropdown_options_form_control_1.DropdownOptionsFormControl,
            core_2.forwardRef(function () { return isms_single_options_form_control_1.SingleOptionsFormControl; }),
            isms_table_form_control_1.TableFormControl
        ]
    }),
    __param(0, core_2.Self()), __param(1, core_1.Inject("app.debug")),
    __metadata("design:paramtypes", [common_1.NgModel, Object])
], FormFields);
exports.FormFields = FormFields;
//# sourceMappingURL=form-fields.js.map
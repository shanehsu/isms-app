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
var core_1 = require('@angular/core');
var isms_form_controls_1 = require('./../controls/isms-form-controls');
var isms_single_options_form_control_1 = require('./../controls/isms-form-controls/isms-single-options-form-control');
var isms_multi_options_form_control_1 = require('./../controls/isms-form-controls/isms-multi-options-form-control');
var isms_dropdown_options_form_control_1 = require('./../controls/isms-form-controls/isms-dropdown-options-form-control');
var isms_table_form_control_1 = require('./../controls/isms-form-controls/isms-table-form-control');
var core_2 = require('@angular/core');
var common_1 = require('@angular/common');
var FormFields = (function () {
    function FormFields(cd, debug) {
        this.debug = debug;
        this._onChanged = function (_) { };
        this._onTouched = function () { };
        this._inline = false;
        this.cd = cd;
        cd.valueAccessor = this;
    }
    FormFields.prototype.ngOnInit = function () {
        console.log(this.debug);
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
    __decorate([
        core_1.Input("fields"), 
        __metadata('design:type', Array)
    ], FormFields.prototype, "_fields", void 0);
    __decorate([
        core_1.Input("inline"), 
        __metadata('design:type', Boolean)
    ], FormFields.prototype, "_inline", void 0);
    FormFields = __decorate([
        core_1.Component({
            selector: 'isms-form-fields',
            template: "<br *ngIf=\"_inline && _fields.length > 0\">\n<div>\n  <template ngFor let-item [ngForOf]=\"_fields\" let-i=\"index\">\n    <div class=\"form-group\" [class.row]=\"!_inline\">\n      <label class=\"form-control-label\" [class.col-sm-2]=\"!_inline\"\n      [style.text-align]=\"_inline ? 'left' : 'right'\"\n      [style.padding-left]=\"_inline ? '0' : 'inherit'\">{{item.name}}</label>\n      <div [class.col-sm-10]=\"!_inline\" [ngSwitch]=\"item.type\">\n        <template ngSwitchWhen=\"shortText\">\n          <form-control type=\"text\" row=\"single\" [(ngModel)]=\"_model[i]\"></form-control>\n        </template>\n\n        <template ngSwitchWhen=\"longText\">\n          <form-control type=\"text\" row=\"multi\" [(ngModel)]=\"_model[i]\"></form-control>\n        </template>\n\n        <template ngSwitchWhen=\"date\">\n          <form-control type=\"date\" [(ngModel)]=\"_model[i]\"></form-control>\n        </template>\n\n        <template ngSwitchWhen=\"time\">\n          <form-control type=\"time\" [(ngModel)]=\"_model[i]\"></form-control>\n        </template>\n        \n        <template ngSwitchWhen=\"options\">\n          <div [ngSwitch]=\"item.metadata.presentation\">\n            <template ngSwitchWhen=\"radio\">\n              <form-control type=\"options\" presentation=\"single\" [metadata]=\"item.metadata\" [(ngModel)]=\"_model[i]\"></form-control>\n            </template>\n            <template ngSwitchWhen=\"checkbox\">\n              <form-control type=\"options\" presentation=\"multi\" [metadata]=\"item.metadata\" [(ngModel)]=\"_model[i]\"></form-control>\n            </template>\n            <template ngSwitchWhen=\"select\">\n              <form-control type=\"options\" presentation=\"dropdown\" [metadata]=\"item.metadata\" [(ngModel)]=\"_model[i]\"></form-control>\n            </template>\n            <template ngSwitchDefault>\u9078\u64C7\u6B04\u4F4D\uFF1A\u4E0D\u652F\u63F4\u7684\u8868\u793A\u65B9\u6CD5</template>\n          </div>\n        </template>\n\n        <template ngSwitchWhen=\"table\">\n          <form-control type=\"table\" [metadata]=\"item.metadata\" [(ngModel)]=\"_model[i]\"></form-control>\n        </template>\n        \n        <template ngSwitchDefault>\u4E0D\u652F\u63F4\u7684\u6B04\u4F4D\uFF0C\u8ACB\u806F\u7D61\u7BA1\u7406\u54E1\uFF01</template>\n      </div>\n    </div>\n  </template>\n</div>\n\n<div class=\"card\" *ngIf=\"!_inline && debug\">\n  <div class=\"card-block\">\n    <h4 class=\"card-title\">\u9664\u932F\u8CC7\u8A0A</h4>\n    <h6 class=\"card-subtitle text-muted\">\u8868\u55AE JSON</h6>\n  </div>\n  <div class=\"card-block\">\n    <pre class=\"card-text\">{{_model | json}}</pre>\n  </div>\n</div>",
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
        __param(0, core_2.Self()),
        __param(1, core_1.Inject("app.debug")), 
        __metadata('design:paramtypes', [common_1.NgModel, Object])
    ], FormFields);
    return FormFields;
}());
exports.FormFields = FormFields;
//# sourceMappingURL=form-fields.js.map
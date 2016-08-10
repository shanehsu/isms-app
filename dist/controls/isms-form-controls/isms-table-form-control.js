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
// Angular 2
var core_1 = require('@angular/core');
var core_2 = require('@angular/core');
var common_1 = require('@angular/common');
var record_service_1 = require('./../../services/record.service');
var isms_form_controls_1 = require('./../isms-form-controls');
var isms_single_options_form_control_1 = require('./isms-single-options-form-control');
var isms_multi_options_form_control_1 = require('./isms-multi-options-form-control');
var isms_dropdown_options_form_control_1 = require('./isms-dropdown-options-form-control');
// THIS WILL NOT EMIT VALUE BY DEFAULT, NEED TO BIND TO (change) EVENT!
var TableFormControl = (function () {
    function TableFormControl(cd, recordService) {
        this.recordService = recordService;
        this._onChanged = function (_) { };
        this._onTouched = function () { };
        this.cd = cd;
        cd.valueAccessor = this;
    }
    // 與 Value Accessor 有關的
    // 從 Value Accessor 接收資料
    TableFormControl.prototype.writeValue = function (value) {
        this._dataModel = value;
    };
    TableFormControl.prototype.registerOnChange = function (fn) {
        this._onChanged = fn;
    };
    TableFormControl.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    TableFormControl.prototype.new = function () {
        this._dataModel.push(this.recordService.emptyRecordForFields(this._metadata.fields));
    };
    __decorate([
        core_1.Input('metadata'), 
        __metadata('design:type', Object)
    ], TableFormControl.prototype, "_metadata", void 0);
    TableFormControl = __decorate([
        core_1.Component({
            selector: 'form-control[type=table]',
            template: "<table class=\"table\">\n    <thead>\n      <tr>\n        <th *ngFor=\"let item of _metadata.fields\">{{item.name}}</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr *ngFor=\"let record of _dataModel; let recordIndex = index\">\n        <td *ngFor=\"let item of _metadata.fields; let fieldIndex = index\" [ngSwitch]=\"item.type\">\n          <template ngSwitchWhen=\"shortText\">\n            <form-control type=\"text\" row=\"single\" [(ngModel)]=\"_dataModel[recordIndex][fieldIndex]\"></form-control>\n          </template>\n\n          <template ngSwitchWhen=\"longText\">\n            <form-control type=\"text\" row=\"multi\" [(ngModel)]=\"_dataModel[recordIndex][fieldIndex]\"></form-control>\n          </template>\n\n          <template ngSwitchWhen=\"date\">\n            <form-control type=\"date\" [(ngModel)]=\"_dataModel[recordIndex][fieldIndex]\"></form-control>\n          </template>\n\n          <template ngSwitchWhen=\"time\">\n            <form-control type=\"time\" [(ngModel)]=\"_dataModel[recordIndex][fieldIndex]\"></form-control>\n          </template>\n          \n          <template ngSwitchWhen=\"options\">\n            <div [ngSwitch]=\"item.metadata.presentation\">\n              <template ngSwitchWhen=\"radio\">\n                <form-control type=\"options\" presentation=\"single\" [metadata]=\"item.metadata\" [(ngModel)]=\"_dataModel[recordIndex][fieldIndex]\"></form-control>\n              </template>\n              <template ngSwitchWhen=\"checkbox\">\n                <form-control type=\"options\" presentation=\"multi\" [metadata]=\"item.metadata\" [(ngModel)]=\"_dataModel[recordIndex][fieldIndex]\"></form-control>\n              </template>\n              <template ngSwitchWhen=\"select\">\n                <form-control type=\"options\" presentation=\"dropdown\" [metadata]=\"item.metadata\" [(ngModel)]=\"_dataModel[recordIndex][fieldIndex]\"></form-control>\n              </template>\n              <template ngSwitchDefault>\u9078\u64C7\u6B04\u4F4D\uFF1A\u4E0D\u652F\u63F4\u7684\u8868\u793A\u65B9\u6CD5</template>\n            </div>\n          </template>\n\n          <template ngSwitchWhen=\"table\">\n            <form-control type=\"table\" [metadata]=\"item.metadata\" [(ngModel)]=\"_dataModel[recordIndex][fieldIndex]\"></form-control>\n          </template>\n          \n          <template ngSwitchDefault>\u4E0D\u652F\u63F4\u7684\u6B04\u4F4D\uFF0C\u8ACB\u806F\u7D61\u7BA1\u7406\u54E1\uFF01</template>\n        </td>\n      </tr>\n      <tr>\n        <td [attr.colspan]=\"_metadata.fields.length\">\n          <button type=\"button\" class=\"btn btn-primary btn-block\" (click)=\"new()\">\u65B0\u589E</button>\n        </td>\n      </tr>\n    </tbody>\n  </table>",
            directives: [core_2.forwardRef(function () { return isms_form_controls_1.SingleLineTextFormControl; }),
                core_2.forwardRef(function () { return isms_form_controls_1.MultiLineTextFormControl; }),
                core_2.forwardRef(function () { return isms_form_controls_1.DateFormControl; }),
                core_2.forwardRef(function () { return isms_form_controls_1.TimeFormControl; }),
                core_2.forwardRef(function () { return isms_single_options_form_control_1.SingleOptionsFormControl; }),
                core_2.forwardRef(function () { return isms_multi_options_form_control_1.MultiOptionsFormControl; }),
                core_2.forwardRef(function () { return isms_dropdown_options_form_control_1.DropdownOptionsFormControl; })]
        }),
        __param(0, core_2.Self()), 
        __metadata('design:paramtypes', [common_1.NgModel, record_service_1.RecordService])
    ], TableFormControl);
    return TableFormControl;
}());
exports.TableFormControl = TableFormControl;
//# sourceMappingURL=isms-table-form-control.js.map
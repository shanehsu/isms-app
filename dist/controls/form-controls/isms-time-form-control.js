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
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var forms_1 = require("@angular/forms");
var TimeFormControl = (function () {
    function TimeFormControl(cd) {
        this._onChanged = function (_) { };
        this._onTouched = function () { };
        this.cd = cd;
        cd.valueAccessor = this;
        this._editing = false;
    }
    // 與 Value Accessor 有關的
    // 從 Value Accessor 接收資料
    TimeFormControl.prototype.writeValue = function (value) {
        this._dataModel = value;
    };
    TimeFormControl.prototype.edit = function () {
        // 進入編輯模式
        this._editing = true;
    };
    TimeFormControl.prototype.doneEdit = function () {
        this._editing = false;
    };
    TimeFormControl.prototype.validate = function (hour, minute) {
        // 檢查是否有任何一個是非數字
        if (!(hour.valueAsNumber >= 0 && hour.valueAsNumber <= 23)) {
            hour.value = "0";
        }
        if (!(minute.valueAsNumber >= 0 && minute.valueAsNumber <= 59)) {
            minute.value = "0";
        }
        this._onChanged(this._dataModel);
    };
    TimeFormControl.prototype.registerOnChange = function (fn) {
        this._onChanged = fn;
    };
    TimeFormControl.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    return TimeFormControl;
}());
TimeFormControl = __decorate([
    core_1.Component({
        selector: 'form-control[type=time]',
        template: "<a *ngIf=\"!_editing\" class=\"link\" (click)=\"edit()\">{{_dataModel.hour + ' \u6642 ' + _dataModel.minute + ' \u5206'}}</a>\n  <div class=\"inline fields\" *ngIf=\"_editing\">\n    <input type=\"number\" style=\"width: 5em; text-align: center;\" [(ngModel)]=\"_dataModel.hour\" min=\"0\" max=\"23\" (blur)=\"_onTouched()\" (change)=\"validate(hour, minute)\" #hour>\n    <label style=\"margin: 0 0.5em 0 0.5em;\">\u6642</label>\n    <input type=\"number\" style=\"width: 5em; text-align: center;\" [(ngModel)]=\"_dataModel.minute\" min=\"0\" max=\"59\" (blur)=\"_onTouched()\" (change)=\"validate(hour, minute)\" #minute>\n    <label style=\"margin: 0 0.5em 0 0.5em;\">\u5206</label>\n    <a class=\"link\" (click)=\"doneEdit()\">\u5B8C\u6210</a>\n  </div>"
    }),
    __param(0, core_2.Self()),
    __metadata("design:paramtypes", [forms_1.NgModel])
], TimeFormControl);
exports.TimeFormControl = TimeFormControl;
//# sourceMappingURL=isms-time-form-control.js.map
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
// export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
//     provide: NG_VALUE_ACCESSOR,
//     useExisting: forwardRef(() => CustomInputComponent),
//     multi: true
// };
var DateFormControl = (function () {
    function DateFormControl(cd) {
        // CVA
        this._onChanged = function (_) { };
        this._onTouched = function () { };
        this.cd = cd;
        cd.valueAccessor = this;
        this._editing = false;
    }
    // 與 View 有關
    DateFormControl.prototype.edit = function () {
        // 進入編輯模式
        this._editing = true;
    };
    DateFormControl.prototype.doneEdit = function () {
        this._editing = false;
    };
    DateFormControl.prototype.days = function (year, month) {
        return new Date(year, month, 0).getDate();
    };
    DateFormControl.prototype.validate = function (yearInput, monthInput, dayInput) {
        // 檢查是否有任何一個是非數字
        if (!(yearInput.valueAsNumber >= 1900 && yearInput.valueAsNumber <= 2999)) {
            yearInput.value = new Date().getFullYear().toString();
        }
        if (!(monthInput.valueAsNumber >= 1 && monthInput.valueAsNumber <= 12)) {
            monthInput.value = "1";
        }
        if (!(dayInput.valueAsNumber >= 1 && dayInput.valueAsNumber <= this.days(yearInput.valueAsNumber, monthInput.valueAsNumber))) {
            dayInput.value = this.days(yearInput.valueAsNumber, monthInput.valueAsNumber).toString();
        }
        this._dataModel = new Date(yearInput.valueAsNumber, monthInput.valueAsNumber - 1, dayInput.valueAsNumber);
        this._onChanged(this._dataModel);
    };
    // Control Value Accessor
    DateFormControl.prototype.writeValue = function (value) {
        if (value) {
            this._year = value.getFullYear();
            this._month = value.getMonth() + 1;
            this._day = value.getDate();
        }
        this._dataModel = value;
    };
    DateFormControl.prototype.registerOnChange = function (fn) {
        this._onChanged = fn;
    };
    DateFormControl.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    return DateFormControl;
}());
DateFormControl = __decorate([
    core_1.Component({
        selector: 'form-control[type=date]',
        template: "<a class=\"link\" *ngIf=\"!_editing\" (click)=\"edit()\">{{_dataModel | chineseDate}}</a>\n  <div class=\"inline fields\" *ngIf=\"_editing\">\n    <input type=\"number\" class=\"form-control\" style=\"width: 7em; text-align: center;\" [(ngModel)]=\"_year\" min=\"1900\" max=\"2999\" (blur)=\"_onTouched()\" (change)=\"validate(year, month, day)\" #year>\n    <label style=\"margin: 0 0.5em 0 0.5em;\">\u5E74</label>\n    <input type=\"number\" class=\"form-control\" style=\"width: 5em; text-align: center;\" [(ngModel)]=\"_month\" min=\"1\" max=\"12\" (blur)=\"_onTouched()\" (change)=\"validate(year, month, day)\" #month>\n    <label style=\"margin: 0 0.5em 0 0.5em;\">\u6708</label>\n    <input type=\"number\" class=\"form-control\" style=\"width: 5em; text-align: center;\" [(ngModel)]=\"_day\" min=\"1\" [max]=\"days(year.value, month.value)\" (blur)=\"_onTouched()\" (change)=\"validate(year, month, day)\" #day>\n    <label style=\"margin: 0 0.5em 0 0.5em;\">\u65E5</label>\n    <a class=\"link\" (click)=\"doneEdit()\">\u5B8C\u6210</a>\n  </div>"
    }),
    __param(0, core_2.Self()),
    __metadata("design:paramtypes", [forms_1.NgModel])
], DateFormControl);
exports.DateFormControl = DateFormControl;
//# sourceMappingURL=date-form-controls.js.map
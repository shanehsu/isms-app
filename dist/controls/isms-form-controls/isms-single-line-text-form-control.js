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
var common_1 = require("@angular/common");
var SingleLineTextFormControl = (function () {
    function SingleLineTextFormControl(cd) {
        this._onChanged = function (_) { };
        this._onTouched = function () { };
        this.cd = cd;
        cd.valueAccessor = this;
    }
    // 與 Value Accessor 有關的
    // 從 Value Accessor 接收資料
    SingleLineTextFormControl.prototype.writeValue = function (value) {
        this._dataModel = value;
    };
    SingleLineTextFormControl.prototype.registerOnChange = function (fn) {
        this._onChanged = fn;
    };
    SingleLineTextFormControl.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    return SingleLineTextFormControl;
}());
SingleLineTextFormControl = __decorate([
    core_1.Component({
        selector: 'form-control[type=text][row=single]',
        template: "<input type=\"text\" [(ngModel)]=\"_dataModel\" (blur)=\"_onTouched()\" (keyup)=\"_onChanged(control.value)\" #control/>"
    }),
    __param(0, core_2.Self()),
    __metadata("design:paramtypes", [common_1.NgModel])
], SingleLineTextFormControl);
exports.SingleLineTextFormControl = SingleLineTextFormControl;
//# sourceMappingURL=isms-single-line-text-form-control.js.map
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
var MultiLineTextFormControl = (function () {
    function MultiLineTextFormControl(cd) {
        this._onChanged = function (_) { };
        this._onTouched = function () { };
        this.cd = cd;
        cd.valueAccessor = this;
    }
    // 與 Value Accessor 有關的
    // 從 Value Accessor 接收資料
    MultiLineTextFormControl.prototype.writeValue = function (value) {
        this._dataModel = value;
    };
    MultiLineTextFormControl.prototype.registerOnChange = function (fn) {
        this._onChanged = fn;
    };
    MultiLineTextFormControl.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    MultiLineTextFormControl = __decorate([
        core_1.Component({
            selector: 'form-control[type=text][row=multi]',
            template: "<textarea class=\"form-control\" rows=\"5\" [(ngModel)]=\"_dataModel\" (keyup)=\"_onChanged(control.value)\" (blur)=\"_onTouched()\" #control></textarea>"
        }),
        __param(0, core_2.Self()), 
        __metadata('design:paramtypes', [common_1.NgModel])
    ], MultiLineTextFormControl);
    return MultiLineTextFormControl;
}());
exports.MultiLineTextFormControl = MultiLineTextFormControl;
//# sourceMappingURL=isms-multi-line-text-form-control.js.map
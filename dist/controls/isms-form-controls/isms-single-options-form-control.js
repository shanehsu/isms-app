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
var form_fields_1 = require('./../../isms-form/form-fields');
var SingleOptionsFormControl = (function () {
    function SingleOptionsFormControl(cd) {
        this._onChanged = function (_) { };
        this._onTouched = function () { };
        this.cd = cd;
        cd.valueAccessor = this;
        this._uid = randomString(5);
    }
    // 與 Value Accessor 有關的
    // 從 Value Accessor 接收資料
    SingleOptionsFormControl.prototype.writeValue = function (value) {
        this._dataModel = value;
    };
    SingleOptionsFormControl.prototype.select = function (index) {
        this._dataModel.selected = this._dataModel.selected.map(function () { return false; });
        this._dataModel.selected[index] = true;
        this._onChanged(this._dataModel);
    };
    SingleOptionsFormControl.prototype.registerOnChange = function (fn) {
        this._onChanged = fn;
    };
    SingleOptionsFormControl.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    __decorate([
        core_1.Input('metadata'), 
        __metadata('design:type', Object)
    ], SingleOptionsFormControl.prototype, "_metadata", void 0);
    SingleOptionsFormControl = __decorate([
        core_1.Component({
            selector: 'form-control[type=options][presentation=single]',
            template: "<template ngFor let-item [ngForOf]=\"_metadata.options\" let-i=\"index\">\n    <div class=\"radio form-control\">\n      <label>\n        <input [name]=\"_uid\" type=\"radio\" (change)=\"select(i)\" [checked]=\"_dataModel.selected[i]\">\n        {{item.value}}\n      </label>\n      <div *ngIf=\"_dataModel.selected[i]\">\n        <isms-form-fields [inline]=\"true\" [fields]=\"_metadata.options[i].fields\" [(ngModel)]=\"_dataModel.values[i]\"></isms-form-fields>\n      </div>\n    </div>\n  </template>",
            directives: [core_2.forwardRef(function () { return form_fields_1.FormFields; })]
        }),
        __param(0, core_2.Self()), 
        __metadata('design:paramtypes', [common_1.NgModel])
    ], SingleOptionsFormControl);
    return SingleOptionsFormControl;
}());
exports.SingleOptionsFormControl = SingleOptionsFormControl;
var randomString = function (length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
//# sourceMappingURL=isms-single-options-form-control.js.map
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
// 控制的元件
var fields_form_component_1 = require('./fields-form.component');
var CUSTOM_VALUE_ACCESSOR = {
    provide: common_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return FieldsFormValueAccessor; }),
    multi: true
};
var FieldsFormValueAccessor = (function () {
    function FieldsFormValueAccessor(_host) {
        this._host = _host;
        this._onChanged = function (_) { };
        this._onTouched = function () { };
    }
    FieldsFormValueAccessor.prototype.writeValue = function (value) {
        this._host.setValue(value);
    };
    FieldsFormValueAccessor.prototype.registerOnChange = function (fn) {
        this._onChanged = fn;
    };
    FieldsFormValueAccessor.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    FieldsFormValueAccessor = __decorate([
        core_1.Directive({
            selector: 'fields-form',
            host: {
                '(fields-changed)': '_onChanged($event)',
                '(control-touched)': '_onTouched()'
            },
            providers: [CUSTOM_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [fields_form_component_1.FieldsFormComponent])
    ], FieldsFormValueAccessor);
    return FieldsFormValueAccessor;
}());
exports.FieldsFormValueAccessor = FieldsFormValueAccessor;
//# sourceMappingURL=fields-form-value-accessor.directive.js.map
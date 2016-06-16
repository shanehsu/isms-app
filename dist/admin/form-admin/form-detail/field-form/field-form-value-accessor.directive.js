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
var field_form_component_1 = require('./field-form.component');
var CUSTOM_VALUE_ACCESSOR = {
    provide: common_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return FieldFormValueAccessor; }),
    multi: true
};
var FieldFormValueAccessor = (function () {
    function FieldFormValueAccessor(_host) {
        this._host = _host;
        this._onChanged = function (_) { };
        this._onTouched = function () { };
    }
    FieldFormValueAccessor.prototype.writeValue = function (value) {
        this._host.setValue(value);
    };
    FieldFormValueAccessor.prototype.registerOnChange = function (fn) {
        this._onChanged = fn;
    };
    FieldFormValueAccessor.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    FieldFormValueAccessor = __decorate([
        core_1.Directive({
            selector: 'field-form',
            host: {
                '(field-changed)': '_onChanged($event)',
                '(control-touched)': '_onTouched()'
            },
            providers: [CUSTOM_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [field_form_component_1.FieldFormComponent])
    ], FieldFormValueAccessor);
    return FieldFormValueAccessor;
}());
exports.FieldFormValueAccessor = FieldFormValueAccessor;
//# sourceMappingURL=field-form-value-accessor.directive.js.map
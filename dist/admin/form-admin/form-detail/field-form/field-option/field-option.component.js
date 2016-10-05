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
// Angular 2
var core_1 = require('@angular/core');
// 元件
var editable_text_input_component_1 = require('./../../../../../controls/editable-text-input/editable-text-input.component');
var editable_text_input_value_accessor_directive_1 = require('./../../../../../controls/editable-text-input/editable-text-input-value-accessor.directive');
var FieldOptionComponent = (function () {
    function FieldOptionComponent(_dcl, _injector, elementRef, _changeDetectorRef) {
        this._dcl = _dcl;
        this._injector = _injector;
        this.elementRef = elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        this._metadataChanged = new core_1.EventEmitter();
        this._controlTouched = new core_1.EventEmitter();
    }
    FieldOptionComponent.prototype.setValue = function (value) {
        this._metadata = value;
    };
    FieldOptionComponent.prototype.pull_option = function (index) {
        this._metadata.options.splice(index, 1);
        this._changeDetectorRef.detectChanges();
        this.changed();
    };
    FieldOptionComponent.prototype.push_option = function (option, optionControl) {
        if (!this._metadata.options) {
            this._metadata.options = [];
        }
        if (option != "")
            (this._metadata.options).push({
                value: option,
                fields: []
            });
        optionControl.value = '';
        this.changed();
    };
    FieldOptionComponent.prototype.changed = function () {
        this._metadataChanged.emit(this._metadata);
    };
    FieldOptionComponent.prototype.touched = function () {
        this._controlTouched.emit(null);
    };
    FieldOptionComponent.prototype.ngOnInit = function () {
        this._metadata.fields = false;
    };
    __decorate([
        core_1.Input('field-type'), 
        __metadata('design:type', String)
    ], FieldOptionComponent.prototype, "_fieldType", void 0);
    __decorate([
        core_1.Output('metadata-changed'), 
        __metadata('design:type', Object)
    ], FieldOptionComponent.prototype, "_metadataChanged", void 0);
    __decorate([
        core_1.Output('control-touched'), 
        __metadata('design:type', Object)
    ], FieldOptionComponent.prototype, "_controlTouched", void 0);
    FieldOptionComponent = __decorate([
        core_1.Component({
            selector: 'field-option',
            templateUrl: '/app/admin/form-admin/form-detail/field-form/field-option/field-option.template.html',
            directives: [editable_text_input_component_1.EditableTextInputComponent, editable_text_input_value_accessor_directive_1.EditableTextInputValueAccessor, core_1.forwardRef(function () { return FieldsFormComponent; })]
        }), 
        __metadata('design:paramtypes', [core_1.DynamicComponentLoader, core_1.Injector, core_1.ElementRef, core_1.ChangeDetectorRef])
    ], FieldOptionComponent);
    return FieldOptionComponent;
}());
exports.FieldOptionComponent = FieldOptionComponent;
var randomString = function (length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
//# sourceMappingURL=field-option.component.js.map
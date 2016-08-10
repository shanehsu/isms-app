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
var field_form_component_1 = require('./../field-form/field-form.component');
var field_form_value_accessor_directive_1 = require('./../field-form/field-form-value-accessor.directive');
var form_service_1 = require('./../../../../services/form.service');
var FieldsFormComponent = (function () {
    function FieldsFormComponent(_elementRef, _formService, detRef) {
        this._elementRef = _elementRef;
        this._formService = _formService;
        this.detRef = detRef;
        // 與 Value Accessor 有關的
        this._fieldsChanged = new core_1.EventEmitter();
        this._controlTouched = new core_1.EventEmitter();
        this._change = new core_1.EventEmitter();
        this._inline = false;
        this._detectorRef = detRef;
    }
    // 與 Value Accessor 有關的
    FieldsFormComponent.prototype.setValue = function (value) {
        this._fields = value;
        this._detectorRef.detectChanges();
    };
    FieldsFormComponent.prototype.setMode = function (mode) {
        if (mode == 'inline') {
            this._inline = true;
            this._detectorRef.detectChanges();
        }
    };
    FieldsFormComponent.prototype.update_field = function (index) {
        var _this = this;
        if (this._inline) {
            this._fieldsChanged.emit(this._fields);
            this._detectorRef.detectChanges();
            return;
        }
        this._formService.updateField(this._formID, this._revisionID, this._fields[index])
            .then(function () { return _this._change.emit(null); })
            .catch(console.error);
    };
    FieldsFormComponent.prototype.delete_field = function (index) {
        var _this = this;
        console.log("index = " + index);
        if (this._inline) {
            this._fields.splice(index, 1);
            this._fieldsChanged.emit(this._fields);
            this._detectorRef.detectChanges();
            return;
        }
        this._formService.deleteField(this._formID, this._revisionID, this._fields[index]._id)
            .then(function () { return _this._change.emit(null); })
            .catch(console.error);
    };
    FieldsFormComponent.prototype.new_field = function () {
        var _this = this;
        if (this._inline) {
            this._fields.push({
                _id: '' + this._fields.length,
                name: '新欄位',
                type: 'shortText',
                metadata: {}
            });
            this._fieldsChanged.emit(this._fields);
            this._detectorRef.detectChanges();
            return;
        }
        this._formService.newField(this._formID, this._revisionID)
            .then(function () { return _this._change.emit(null); })
            .catch(console.error);
    };
    __decorate([
        core_1.Output('fields-changed'), 
        __metadata('design:type', Object)
    ], FieldsFormComponent.prototype, "_fieldsChanged", void 0);
    __decorate([
        core_1.Output('control-touched'), 
        __metadata('design:type', Object)
    ], FieldsFormComponent.prototype, "_controlTouched", void 0);
    __decorate([
        core_1.Output('shouldUpdate'), 
        __metadata('design:type', Object)
    ], FieldsFormComponent.prototype, "_change", void 0);
    __decorate([
        core_1.Input('form-id'), 
        __metadata('design:type', String)
    ], FieldsFormComponent.prototype, "_formID", void 0);
    __decorate([
        core_1.Input('revision-id'), 
        __metadata('design:type', String)
    ], FieldsFormComponent.prototype, "_revisionID", void 0);
    FieldsFormComponent = __decorate([
        core_1.Component({
            selector: 'fields-form',
            templateUrl: '/app/admin/form-admin/form-detail/fields-form/fields-form.template.html',
            directives: [field_form_component_1.FieldFormComponent, field_form_value_accessor_directive_1.FieldFormValueAccessor]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, form_service_1.FormService, core_1.ChangeDetectorRef])
    ], FieldsFormComponent);
    return FieldsFormComponent;
}());
exports.FieldsFormComponent = FieldsFormComponent;
//# sourceMappingURL=fields-form.component.js.map
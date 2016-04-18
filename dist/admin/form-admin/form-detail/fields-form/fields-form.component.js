System.register(['angular2/core', './../field-form/field-form.component', './../field-form/field-form-value-accessor.directive', './../../../../services/form.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, field_form_component_1, field_form_value_accessor_directive_1, form_service_1;
    var FieldsFormComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (field_form_component_1_1) {
                field_form_component_1 = field_form_component_1_1;
            },
            function (field_form_value_accessor_directive_1_1) {
                field_form_value_accessor_directive_1 = field_form_value_accessor_directive_1_1;
            },
            function (form_service_1_1) {
                form_service_1 = form_service_1_1;
            }],
        execute: function() {
            FieldsFormComponent = (function () {
                function FieldsFormComponent(_elementRef, _formService) {
                    this._elementRef = _elementRef;
                    this._formService = _formService;
                    // 與 Value Accessor 有關的
                    this._fieldsChanged = new core_1.EventEmitter();
                    this._controlTouched = new core_1.EventEmitter();
                    this._change = new core_1.EventEmitter();
                    this._inline = false;
                }
                // 與 Value Accessor 有關的
                FieldsFormComponent.prototype.setValue = function (value) {
                    this._fields = value;
                };
                FieldsFormComponent.prototype.setMode = function (mode) {
                    if (mode == 'inline') {
                        this._inline = true;
                    }
                };
                FieldsFormComponent.prototype.update_field = function (index) {
                    var _this = this;
                    if (this._inline) {
                        return;
                    }
                    this._formService.updateField(this._formID, this._revisionID, this._fields[index])
                        .then(function () { return _this._change.emit(null); })
                        .catch(console.error);
                };
                FieldsFormComponent.prototype.delete_field = function (index) {
                    var _this = this;
                    if (this._inline) {
                        delete this._fields[index];
                        this._elementRef._appElement.parentView.changeDetector.ref.detectChanges();
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
                        this._elementRef._appElement.parentView.changeDetector.ref.detectChanges();
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
                    __metadata('design:paramtypes', [core_1.ElementRef, form_service_1.FormService])
                ], FieldsFormComponent);
                return FieldsFormComponent;
            }());
            exports_1("FieldsFormComponent", FieldsFormComponent);
        }
    }
});
//# sourceMappingURL=fields-form.component.js.map
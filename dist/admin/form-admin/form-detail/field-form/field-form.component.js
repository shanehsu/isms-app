System.register(['angular2/core', './../../../../services/form.service', './constants', './field-option/field-option.component', './field-option/field-option-value-accessor.directive'], function(exports_1, context_1) {
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
    var core_1, form_service_1, constants_1, field_option_component_1, field_option_value_accessor_directive_1;
    var FieldFormComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (form_service_1_1) {
                form_service_1 = form_service_1_1;
            },
            function (constants_1_1) {
                constants_1 = constants_1_1;
            },
            function (field_option_component_1_1) {
                field_option_component_1 = field_option_component_1_1;
            },
            function (field_option_value_accessor_directive_1_1) {
                field_option_value_accessor_directive_1 = field_option_value_accessor_directive_1_1;
            }],
        execute: function() {
            FieldFormComponent = (function () {
                // 服務
                function FieldFormComponent(_formService) {
                    this._formService = _formService;
                    this._metadataChanged = new core_1.EventEmitter();
                    this._controlTouched = new core_1.EventEmitter();
                    this._update = new core_1.EventEmitter();
                    this._delete = new core_1.EventEmitter();
                    this.fieldTypes = constants_1.FieldTypes; // 從 constants 來的常數值
                    // 表單模型
                    this._field = {};
                }
                // 初始化
                FieldFormComponent.prototype.ngOnInit = function () { };
                FieldFormComponent.prototype.setValue = function (value) {
                    this._field = value;
                };
                // 更新與刪除
                FieldFormComponent.prototype.submit_field = function () {
                    this._update.emit(this._field);
                };
                FieldFormComponent.prototype.delete_field = function () {
                    this._delete.emit(null);
                };
                __decorate([
                    core_1.Output('field-changed'), 
                    __metadata('design:type', Object)
                ], FieldFormComponent.prototype, "_metadataChanged", void 0);
                __decorate([
                    core_1.Output('control-touched'), 
                    __metadata('design:type', Object)
                ], FieldFormComponent.prototype, "_controlTouched", void 0);
                __decorate([
                    core_1.Output('update'), 
                    __metadata('design:type', Object)
                ], FieldFormComponent.prototype, "_update", void 0);
                __decorate([
                    core_1.Output('delete'), 
                    __metadata('design:type', Object)
                ], FieldFormComponent.prototype, "_delete", void 0);
                FieldFormComponent = __decorate([
                    core_1.Component({
                        selector: 'field-form',
                        templateUrl: '/app/admin/form-admin/form-detail/field-form/field-form.template.html',
                        directives: [field_option_component_1.FieldOptionComponent, field_option_value_accessor_directive_1.FieldOptionValueAccessor]
                    }), 
                    __metadata('design:paramtypes', [form_service_1.FormService])
                ], FieldFormComponent);
                return FieldFormComponent;
            }());
            exports_1("FieldFormComponent", FieldFormComponent);
        }
    }
});
//# sourceMappingURL=field-form.component.js.map
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
// 服務
var form_service_1 = require('./../../../../services/form.service');
// 常數
var constants_1 = require('./constants');
// 子元件
var field_option_component_1 = require('./field-option/field-option.component');
var field_option_value_accessor_directive_1 = require('./field-option/field-option-value-accessor.directive');
var FieldFormComponent = (function () {
    // 服務
    function FieldFormComponent(_formService, _changeDetector) {
        this._formService = _formService;
        this._changeDetector = _changeDetector;
        this._metadataChanged = new core_1.EventEmitter();
        this._controlTouched = new core_1.EventEmitter();
        this._update = new core_1.EventEmitter();
        this._delete = new core_1.EventEmitter();
        this._inline = false;
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
    FieldFormComponent.prototype.detectChanges = function () {
        this._changeDetector.detectChanges();
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
    __decorate([
        core_1.Input('inline'), 
        __metadata('design:type', Boolean)
    ], FieldFormComponent.prototype, "_inline", void 0);
    FieldFormComponent = __decorate([
        core_1.Component({
            selector: 'field-form',
            templateUrl: '/app/admin/form-admin/form-detail/field-form/field-form.template.html',
            directives: [field_option_component_1.FieldOptionComponent, field_option_value_accessor_directive_1.FieldOptionValueAccessor]
        }), 
        __metadata('design:paramtypes', [form_service_1.FormService, core_1.ChangeDetectorRef])
    ], FieldFormComponent);
    return FieldFormComponent;
}());
exports.FieldFormComponent = FieldFormComponent;
//# sourceMappingURL=field-form.component.js.map
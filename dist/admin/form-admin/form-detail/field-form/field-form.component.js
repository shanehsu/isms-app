System.register(['angular2/core', './../../../../services/form.service', './constants', './field-option/field-option.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, form_service_1, constants_1, field_option_component_1;
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
            }],
        execute: function() {
            FieldFormComponent = (function () {
                // 服務
                function FieldFormComponent(_formService) {
                    this._formService = _formService;
                    this.fieldTypes = constants_1.FieldTypes; // 從 constants 來的常數值
                    // 輸出
                    this._fieldDidDelete = new core_1.EventEmitter();
                }
                // 初始化
                FieldFormComponent.prototype.ngOnInit = function () {
                    // 空資料
                    this._field = {};
                    // 取得資料
                    this.reload_field();
                };
                FieldFormComponent.prototype.reload_field = function () {
                    var _this = this;
                    this._formService.field(this._formID, this._revisionID, this._fieldID)
                        .then(function (field) { return _this._field = field; })
                        .catch(console.error);
                };
                FieldFormComponent.prototype.submit_field = function () {
                    var _this = this;
                    this._formService.updateField(this._formID, this._revisionID, this._field)
                        .then(function () { return _this.reload_field(); })
                        .catch(console.error);
                };
                FieldFormComponent.prototype.delete_field = function () {
                    var _this = this;
                    this._formService.deleteField(this._formID, this._revisionID, this._fieldID)
                        .then(function () { return _this._fieldDidDelete.emit(null); })
                        .catch(console.error);
                };
                FieldFormComponent.prototype.pushOption = function (item) {
                    if (!this._field.metadata.options) {
                        this._field.metadata.options = [];
                    }
                    this._field.metadata.options.push(item);
                };
                __decorate([
                    // 從 constants 來的常數值
                    core_1.Input('field'), 
                    __metadata('design:type', String)
                ], FieldFormComponent.prototype, "_fieldID", void 0);
                __decorate([
                    core_1.Input('revision'), 
                    __metadata('design:type', String)
                ], FieldFormComponent.prototype, "_revisionID", void 0);
                __decorate([
                    core_1.Input('form'), 
                    __metadata('design:type', String)
                ], FieldFormComponent.prototype, "_formID", void 0);
                __decorate([
                    core_1.Output('fieldDidDelete'), 
                    __metadata('design:type', Object)
                ], FieldFormComponent.prototype, "_fieldDidDelete", void 0);
                FieldFormComponent = __decorate([
                    core_1.Component({
                        selector: 'field-form',
                        templateUrl: '/app/admin/form-admin/form-detail/field-form/field-form.template.html',
                        directives: [field_option_component_1.FieldOptionComponent]
                    }), 
                    __metadata('design:paramtypes', [form_service_1.FormService])
                ], FieldFormComponent);
                return FieldFormComponent;
            })();
            exports_1("FieldFormComponent", FieldFormComponent);
        }
    }
});
//# sourceMappingURL=field-form.component.js.map
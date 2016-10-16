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
var forms_1 = require('@angular/forms');
// 服務
var form_service_1 = require('./../../services/form.service');
var util_1 = require('./../../util');
var FieldComponent = (function () {
    // 建構子：服務
    function FieldComponent(model, _formService, fieldTypes) {
        this.model = model;
        this._formService = _formService;
        this.fieldTypes = fieldTypes;
        // 事件：更新或是刪除一個欄位
        this.reload = new core_1.EventEmitter();
        this.update = new core_1.EventEmitter();
        this.delete = new core_1.EventEmitter();
        model.valueAccessor = this;
    }
    // 生命週期
    FieldComponent.prototype.ngOnInit = function () {
        this.field = {};
        this.isUpdating = false;
        this.isDeleting = false;
        this.isCollapsed = false;
        this._radioUID = util_1.RandomString(10);
        if (this.shouldShowUpdateButton == undefined) {
            this.shouldShowUpdateButton = true;
        }
    };
    FieldComponent.prototype.ngAfterViewInit = function () {
        $('div#' + this._radioUID + ' .ui.radio.checkbox').checkbox();
    };
    FieldComponent.prototype.writeValue = function (value) {
        this.field = value;
    };
    // 按鈕動作：更新與刪除
    FieldComponent.prototype.reloadField = function () {
        var _this = this;
        this.isReloading = true;
        this.reload.emit(function () { _this.isReloading = false; });
    };
    FieldComponent.prototype.updateField = function () {
        var _this = this;
        this.isUpdating = true;
        this.update.emit(function () { _this.isUpdating = false; });
    };
    FieldComponent.prototype.deleteField = function () {
        this.isDeleting = true;
        this.delete.emit(null);
    };
    // 按鈕動作：展開、收合
    FieldComponent.prototype.toggleCollapse = function () {
        this.isCollapsed = !this.isCollapsed;
    };
    // ControlValueAccessor - 註冊函數
    FieldComponent.prototype.registerOnChange = function (fn) {
        this.change = fn;
    };
    FieldComponent.prototype.registerOnTouched = function (fn) {
        this.touched = fn;
    };
    FieldComponent.prototype.emitValue = function () {
        this.change(this.field);
    };
    __decorate([
        core_1.Input('update-button'), 
        __metadata('design:type', Boolean)
    ], FieldComponent.prototype, "shouldShowUpdateButton", void 0);
    __decorate([
        core_1.Output('reload'), 
        __metadata('design:type', Object)
    ], FieldComponent.prototype, "reload", void 0);
    __decorate([
        core_1.Output('update'), 
        __metadata('design:type', Object)
    ], FieldComponent.prototype, "update", void 0);
    __decorate([
        core_1.Output('delete'), 
        __metadata('design:type', Object)
    ], FieldComponent.prototype, "delete", void 0);
    FieldComponent = __decorate([
        core_1.Component({
            selector: 'field',
            template: "\n  <a class=\"link\" style=\"float: right; position: relative; z-index: 1;\" (click)=\"toggleCollapse()\">\u5C55\u958B\uFF0F\u6536\u5408\u6B64\u6B04\u4F4D</a>\n  <div [style.display]=\"isCollapsed ? 'initial' : 'none'\">\n    <p>\u540D\u7A31\uFF1A{{field.name}}</p>\n    <p>\u985E\u578B\uFF1A{{field.type | fieldType}}</p>\n  </div>\n  <form class=\"ui form\" (ngSubmit)=\"updateField()\" #fieldForm=\"ngForm\" [style.display]=\"isCollapsed ? 'none' : 'initial'\">\n    <div class=\"field\" style=\"clear: none;\">\n      <label>ID</label>\n      <p>{{field._id}}</p>\n    </div>\n    <div class=\"field\">\n      <label>\u540D\u7A31</label>\n      <input type=\"text\" [(ngModel)]=\"field.name\" name=\"name\" (change)=\"emitValue()\" required>\n    </div>\n    <div class=\"field\">\n      <label>\u985E\u578B</label>\n      <div class=\"inline fields\" [id]=\"_radioUID\">\n        <div class=\"field\" *ngFor=\"let fieldType of fieldTypes\">\n          <div class=\"ui radio checkbox\">\n            <input type=\"radio\" name=\"typeRadio\" [value]=\"fieldType.value\" [checked]=\"field.type == fieldType.value\" (change)=\"field.type = fieldType.value; emitValue();\">\n            <label>{{fieldType.label}}</label>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"field\">\n      <label>\u63D0\u9192\u6587\u5B57</label>\n      <input type=\"text\" [(ngModel)]=\"field.hint\" name=\"hint\" (change)=\"emitValue()\">\n    </div>\n    \n    <field-metadata *ngIf=\"field.type != 'table' && field.type != 'options'\" type=\"empty\" [(ngModel)]=\"field.metadata\" name=\"metadata\"></field-metadata>\n    <field-metadata *ngIf=\"field.type == 'options'\" type=\"options\" [(ngModel)]=\"field.metadata\" name=\"metadata\"></field-metadata>\n    <field-metadata *ngIf=\"field.type == 'table'\" type=\"table\" [(ngModel)]=\"field.metadata\" name=\"metadata\"></field-metadata>\n    \n    <div style=\"text-align: right;\">\n      <button type=\"button\" class=\"ui yellow basic button\" *ngIf=\"shouldShowUpdateButton\" (click)=\"reloadField()\" [class.loading]=\"isReloading\">\u91CD\u65B0\u8F09\u5165</button>\n      <button type=\"button\" class=\"ui red basic button\" (click)=\"deleteField()\" [class.loading]=\"isDeleting\">\u522A\u9664</button>\n      <button type=\"submit\" class=\"ui basic button\" *ngIf=\"shouldShowUpdateButton\" [class.green]=\"fieldForm.form.valid\" [class.red]=\"!fieldForm.form.valid\"\n        [disabled]=\"!fieldForm.form.valid\" [class.loading]=\"isUpdating\">\u66F4\u65B0</button>\n    </div>\n  </form>\n  "
        }),
        __param(0, core_1.Self()),
        __param(2, core_1.Inject('fieldTypes')), 
        __metadata('design:paramtypes', [forms_1.NgModel, form_service_1.FormService, Array])
    ], FieldComponent);
    return FieldComponent;
}());
exports.FieldComponent = FieldComponent;
//# sourceMappingURL=field.component.js.map
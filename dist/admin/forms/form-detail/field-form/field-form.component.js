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
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
// 服務
var form_service_1 = require("./../../../../services/form.service");
// 子元件
var field_metadata_component_1 = require("./../field-metadata/field-metadata.component");
var util_1 = require("./../../../../util");
var core_2 = require("@angular/core");
// 常數
var FieldTypes = [
    {
        label: '單行文字',
        value: 'shortText'
    },
    {
        label: '多行文字',
        value: 'longText'
    },
    {
        label: '日期',
        value: 'date'
    },
    {
        label: '時間',
        value: 'time'
    },
    {
        label: '選擇',
        value: 'options'
    },
    {
        label: '表格',
        value: 'table'
    }
];
var FieldTypePipe = (function () {
    function FieldTypePipe() {
    }
    FieldTypePipe.prototype.transform = function (value) {
        return FieldTypes.find(function (type) { return type.value == value; }).label;
    };
    return FieldTypePipe;
}());
FieldTypePipe = __decorate([
    core_2.Pipe({
        name: 'fieldType'
    }),
    __metadata("design:paramtypes", [])
], FieldTypePipe);
var FieldFormComponent = (function () {
    // 建構子：服務
    function FieldFormComponent(model, _formService) {
        this.model = model;
        this._formService = _formService;
        // 事件：更新或是刪除一個欄位
        this.reload = new core_1.EventEmitter();
        this.update = new core_1.EventEmitter();
        this.delete = new core_1.EventEmitter();
        // 類型
        this.fieldTypes = FieldTypes;
        model.valueAccessor = this;
    }
    // 生命週期
    FieldFormComponent.prototype.ngOnInit = function () {
        this.isUpdating = false;
        this.isDeleting = false;
        this.isCollapsed = false;
        this._radioUID = util_1.RandomString(10);
        if (this.shouldShowUpdateButton == undefined) {
            this.shouldShowUpdateButton = true;
        }
    };
    FieldFormComponent.prototype.ngAfterViewInit = function () {
        $('div#' + this._radioUID + ' .ui.radio.checkbox').checkbox();
    };
    FieldFormComponent.prototype.writeValue = function (value) {
        this.field = value;
    };
    // 按鈕動作：更新與刪除
    FieldFormComponent.prototype.reloadField = function () {
        var _this = this;
        this.isReloading = true;
        this.reload.emit(function () { _this.isReloading = false; });
    };
    FieldFormComponent.prototype.updateField = function () {
        var _this = this;
        this.isUpdating = true;
        this.update.emit(function () { _this.isUpdating = false; });
    };
    FieldFormComponent.prototype.deleteField = function () {
        this.isDeleting = true;
        this.delete.emit(null);
    };
    // 按鈕動作：展開、收合
    FieldFormComponent.prototype.toggleCollapse = function () {
        this.isCollapsed = !this.isCollapsed;
    };
    // ControlValueAccessor - 註冊函數
    FieldFormComponent.prototype.registerOnChange = function (fn) {
        this.change = fn;
    };
    FieldFormComponent.prototype.registerOnTouched = function (fn) {
        this.touched = fn;
    };
    FieldFormComponent.prototype.emitValue = function () {
        this.change(this.field);
    };
    return FieldFormComponent;
}());
__decorate([
    core_1.Input('update-button'),
    __metadata("design:type", Boolean)
], FieldFormComponent.prototype, "shouldShowUpdateButton", void 0);
__decorate([
    core_1.Output('reload'),
    __metadata("design:type", Object)
], FieldFormComponent.prototype, "reload", void 0);
__decorate([
    core_1.Output('update'),
    __metadata("design:type", Object)
], FieldFormComponent.prototype, "update", void 0);
__decorate([
    core_1.Output('delete'),
    __metadata("design:type", Object)
], FieldFormComponent.prototype, "delete", void 0);
FieldFormComponent = __decorate([
    core_1.Component({
        selector: 'field-form',
        template: "\n  <a class=\"link\" style=\"float: right; position: relative; z-index: 1;\" (click)=\"toggleCollapse()\">\u5C55\u958B\uFF0F\u6536\u5408\u6B64\u6B04\u4F4D</a>\n  <div [style.display]=\"isCollapsed ? 'initial' : 'none'\">\n    <p>\u540D\u7A31\uFF1A{{field.name}}</p>\n    <p>\u985E\u578B\uFF1A{{field.type | fieldType}}</p>\n  </div>\n  <form class=\"ui form\" (ngSubmit)=\"updateField()\" #fieldForm=\"ngForm\" [style.display]=\"isCollapsed ? 'none' : 'initial'\">\n    <div class=\"field\" style=\"clear: none;\">\n      <label>ID</label>\n      <p>{{field._id}}</p>\n    </div>\n    <div class=\"field\">\n      <label>\u540D\u7A31</label>\n      <input type=\"text\" [(ngModel)]=\"field.name\" ngControl=\"name\" (change)=\"emitValue()\" required>\n    </div>\n    <div class=\"field\">\n      <label>\u985E\u578B</label>\n      <div class=\"inline fields\" [id]=\"_radioUID\">\n        <div class=\"field\" *ngFor=\"let fieldType of fieldTypes\">\n          <div class=\"ui radio checkbox\">\n            <input type=\"radio\" name=\"typeRadio\" [value]=\"fieldType.value\" [checked]=\"field.type == fieldType.value\" (change)=\"field.type = fieldType.value; emitValue();\">\n            <label>{{fieldType.label}}</label>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"field\">\n      <label>\u63D0\u9192\u6587\u5B57</label>\n      <input type=\"text\" [(ngModel)]=\"field.hint\" ngControl=\"hint\" (change)=\"emitValue()\">\n    </div>\n    \n    <field-metadata *ngIf=\"field.type != 'table' && field.type != 'options'\" type=\"empty\" [(ngModel)]=\"field.metadata\"></field-metadata>\n    <field-metadata *ngIf=\"field.type == 'options'\" type=\"options\" [(ngModel)]=\"field.metadata\"></field-metadata>\n    <field-metadata *ngIf=\"field.type == 'table'\" type=\"table\" [(ngModel)]=\"field.metadata\"></field-metadata>\n\n    <div style=\"text-align: right;\">\n      <button type=\"button\" class=\"ui yellow basic button\" *ngIf=\"shouldShowUpdateButton\" (click)=\"reloadField()\" [class.loading]=\"isReloading\">\u91CD\u65B0\u8F09\u5165</button>\n      <button type=\"button\" class=\"ui red basic button\" (click)=\"deleteField()\" [class.loading]=\"isDeleting\">\u522A\u9664</button>\n      <button type=\"submit\" class=\"ui basic button\" *ngIf=\"shouldShowUpdateButton\" [class.green]=\"fieldForm.form.valid\" [class.red]=\"!fieldForm.form.valid\"\n        [disabled]=\"!fieldForm.form.valid\" [class.loading]=\"isUpdating\">\u66F4\u65B0</button>\n    </div>\n  </form>\n  ",
        directives: [field_metadata_component_1.EmptyFieldMetadataComponent, field_metadata_component_1.TableFieldMetadataComponent, field_metadata_component_1.OptionFieldMetadataComponent],
        pipes: [FieldTypePipe]
    }),
    __param(0, core_1.Self()),
    __metadata("design:paramtypes", [common_1.NgModel, form_service_1.FormService])
], FieldFormComponent);
exports.FieldFormComponent = FieldFormComponent;
//# sourceMappingURL=field-form.component.js.map
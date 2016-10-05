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
        templateUrl: '/app/admin/form-admin/form-detail/field-form/field-form.template.html',
        directives: [field_metadata_component_1.EmptyFieldMetadataComponent, field_metadata_component_1.TableFieldMetadataComponent, field_metadata_component_1.OptionFieldMetadataComponent],
        pipes: [FieldTypePipe]
    }),
    __param(0, core_1.Self()),
    __metadata("design:paramtypes", [common_1.NgModel, form_service_1.FormService])
], FieldFormComponent);
exports.FieldFormComponent = FieldFormComponent;
//# sourceMappingURL=field-form.component.js.map
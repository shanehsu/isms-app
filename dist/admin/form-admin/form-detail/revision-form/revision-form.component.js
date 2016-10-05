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
var field_form_component_1 = require("./../field-form/field-form.component");
/**
 * 「表單版本」的表單元件
 */
var RevisionFormComponent = (function () {
    // 服務
    // 簡單初始化
    function RevisionFormComponent(_formService, _model) {
        this._formService = _formService;
        this._model = _model;
        // 輸出
        this._shouldUpdate = new core_1.EventEmitter();
        this._shouldDelete = new core_1.EventEmitter();
        this._shouldPublish = new core_1.EventEmitter();
        this.fields = [];
        _model.valueAccessor = this;
    }
    // 生命週期掛鉤
    RevisionFormComponent.prototype.ngOnInit = function () {
        this.isDeleting = false;
        this.isPublishing = false;
        this.isUpdating = false;
        this.isLoadingFields = false;
        this.areFieldsCollapsed = false;
    };
    RevisionFormComponent.prototype.ngAfterViewInit = function () {
        $('form#revisionForm * * * .ui.radio.checkbox').checkbox();
    };
    RevisionFormComponent.prototype.ngOnChanges = function () {
    };
    // 收合子元件
    RevisionFormComponent.prototype.toggleCollapse = function () {
        var expectedState = !this.areFieldsCollapsed;
        this.fieldFormComponents.forEach(function (fieldFormComponent) {
            fieldFormComponent.isCollapsed = expectedState;
        });
        this.areFieldsCollapsed = expectedState;
    };
    // 動作
    RevisionFormComponent.prototype.submit_revision = function () {
        var _this = this;
        this.isUpdating = true;
        this._shouldUpdate.emit(function () { _this.isUpdating = false; });
    };
    RevisionFormComponent.prototype.publish_revision = function () {
        var _this = this;
        this.isPublishing = true;
        this._shouldPublish.emit(function () { _this.isPublishing = false; });
    };
    RevisionFormComponent.prototype.delete_revision = function () {
        this.isDeleting = true;
        this._shouldDelete.emit(null);
    };
    // ControlValueAccessor - 註冊函數
    RevisionFormComponent.prototype.registerOnChange = function (fn) {
        this.change = fn;
    };
    RevisionFormComponent.prototype.registerOnTouched = function (fn) {
        this.touched = fn;
    };
    // ControlValueAccessor - 接收資料
    RevisionFormComponent.prototype.writeValue = function (value) {
        var _this = this;
        // 換到另外一個 Revision 了
        this.isDeleting = false;
        this.isPublishing = false;
        this.isUpdating = false;
        this.isCreatingField = false;
        if (!value) {
            this._revision = {};
        }
        else {
            this._revision = value;
            this.isLoadingFields = this._revision.fields.length > 0;
            this.fields = this._revision.fields.map(function (_) { return undefined; });
            this._revision.fields.forEach(function (id, index) {
                _this._formService.field(_this._formID, _this._revision._id, id).then(function (field) {
                    _this.fields[index] = field;
                    if (_this.fields.indexOf(undefined) < 0) {
                        _this.isLoadingFields = false;
                    }
                }).catch(function (err) {
                    console.error('無法取得欄位');
                    console.error(err);
                });
            });
        }
    };
    // SECTION - 欄位
    RevisionFormComponent.prototype.reloadField = function (field, finishedReloading) {
        var _this = this;
        var id = field._id;
        this._formService.field(this._formID, this._revision._id, id).then(function (fetchedField) {
            var index = _this.fields.findIndex(function (field) { return field._id == id; });
            if (index >= 0)
                _this.fields[index] = fetchedField;
            finishedReloading();
        }).catch(function (err) {
            console.error('欄位載入失敗');
            console.error(err);
        });
    };
    RevisionFormComponent.prototype.updateField = function (field, finishedUpdating) {
        this._formService.updateField(this._formID, this._revision._id, field).then(function () {
            console.log('欄位更新成功');
            finishedUpdating();
        }).catch(function (err) {
            console.error('欄位更新失敗');
            console.error(err);
        });
    };
    RevisionFormComponent.prototype.deleteField = function (field) {
        var _this = this;
        this._formService.deleteField(this._formID, this._revision._id, field._id).then(function () {
            console.log('欄位刪除成功');
            _this.fields.splice(_this.fields.indexOf(field), 1);
        }).catch(function (err) {
            console.error('欄位刪除失敗');
            console.error(err);
        });
    };
    RevisionFormComponent.prototype.createField = function (field) {
        var _this = this;
        this.isCreatingField = true;
        this._formService.newField(this._formID, this._revision._id).then(function (id) {
            console.log('增加欄位成功，嘗試取得欄位');
            _this._formService.field(_this._formID, _this._revision._id, id).then(function (field) {
                _this.fields.push(field);
                _this.isCreatingField = false;
            }).catch(function (err) {
                console.error('取得剛剛增加的欄位失敗');
                console.error(err);
            });
        }).catch(function (err) {
            console.error('增加欄位失敗');
            console.error(err);
        });
    };
    return RevisionFormComponent;
}());
__decorate([
    core_1.Input('form-id'),
    __metadata("design:type", String)
], RevisionFormComponent.prototype, "_formID", void 0);
__decorate([
    core_1.Output('update'),
    __metadata("design:type", Object)
], RevisionFormComponent.prototype, "_shouldUpdate", void 0);
__decorate([
    core_1.Output('delete'),
    __metadata("design:type", Object)
], RevisionFormComponent.prototype, "_shouldDelete", void 0);
__decorate([
    core_1.Output('publish'),
    __metadata("design:type", Object)
], RevisionFormComponent.prototype, "_shouldPublish", void 0);
__decorate([
    core_1.ViewChildren(field_form_component_1.FieldFormComponent),
    __metadata("design:type", core_1.QueryList)
], RevisionFormComponent.prototype, "fieldFormComponents", void 0);
RevisionFormComponent = __decorate([
    core_1.Component({
        selector: 'revision-form',
        templateUrl: '/app/admin/form-admin/form-detail/revision-form/revision-form.template.html',
        directives: [field_form_component_1.FieldFormComponent]
    }),
    __param(1, core_1.Self()),
    __metadata("design:paramtypes", [form_service_1.FormService, common_1.NgModel])
], RevisionFormComponent);
exports.RevisionFormComponent = RevisionFormComponent;
//# sourceMappingURL=revision-form.component.js.map
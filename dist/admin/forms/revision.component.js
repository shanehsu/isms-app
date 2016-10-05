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
var forms_1 = require("@angular/forms");
// 服務
var form_service_1 = require("./../../services/form.service");
// 子元件
var field_component_1 = require("./field.component");
var RevisionComponent = (function () {
    // 服務
    // 簡單初始化
    function RevisionComponent(_formService, _model) {
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
    RevisionComponent.prototype.ngOnInit = function () {
        this.isDeleting = false;
        this.isPublishing = false;
        this.isUpdating = false;
        this.isLoadingFields = false;
        this.areFieldsCollapsed = false;
    };
    RevisionComponent.prototype.ngAfterViewInit = function () {
        $('form#revisionForm * * * .ui.radio.checkbox').checkbox();
    };
    RevisionComponent.prototype.ngOnChanges = function () {
    };
    // 收合子元件
    RevisionComponent.prototype.toggleCollapse = function () {
        var expectedState = !this.areFieldsCollapsed;
        this.fieldFormComponents.forEach(function (fieldFormComponent) {
            fieldFormComponent.isCollapsed = expectedState;
        });
        this.areFieldsCollapsed = expectedState;
    };
    // 動作
    RevisionComponent.prototype.submit_revision = function () {
        var _this = this;
        this.isUpdating = true;
        this._shouldUpdate.emit(function () { _this.isUpdating = false; });
    };
    RevisionComponent.prototype.publish_revision = function () {
        var _this = this;
        this.isPublishing = true;
        this._shouldPublish.emit(function () { _this.isPublishing = false; });
    };
    RevisionComponent.prototype.delete_revision = function () {
        this.isDeleting = true;
        this._shouldDelete.emit(null);
    };
    // ControlValueAccessor - 註冊函數
    RevisionComponent.prototype.registerOnChange = function (fn) {
        this.change = fn;
    };
    RevisionComponent.prototype.registerOnTouched = function (fn) {
        this.touched = fn;
    };
    // ControlValueAccessor - 接收資料
    RevisionComponent.prototype.writeValue = function (value) {
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
    RevisionComponent.prototype.reloadField = function (field, finishedReloading) {
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
    RevisionComponent.prototype.updateField = function (field, finishedUpdating) {
        this._formService.updateField(this._formID, this._revision._id, field).then(function () {
            console.log('欄位更新成功');
            finishedUpdating();
        }).catch(function (err) {
            console.error('欄位更新失敗');
            console.error(err);
        });
    };
    RevisionComponent.prototype.deleteField = function (field) {
        var _this = this;
        this._formService.deleteField(this._formID, this._revision._id, field._id).then(function () {
            console.log('欄位刪除成功');
            _this.fields.splice(_this.fields.indexOf(field), 1);
        }).catch(function (err) {
            console.error('欄位刪除失敗');
            console.error(err);
        });
    };
    RevisionComponent.prototype.createField = function (field) {
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
    return RevisionComponent;
}());
__decorate([
    core_1.Input('form-id'),
    __metadata("design:type", String)
], RevisionComponent.prototype, "_formID", void 0);
__decorate([
    core_1.Output('update'),
    __metadata("design:type", Object)
], RevisionComponent.prototype, "_shouldUpdate", void 0);
__decorate([
    core_1.Output('delete'),
    __metadata("design:type", Object)
], RevisionComponent.prototype, "_shouldDelete", void 0);
__decorate([
    core_1.Output('publish'),
    __metadata("design:type", Object)
], RevisionComponent.prototype, "_shouldPublish", void 0);
__decorate([
    core_1.ViewChildren(field_component_1.FieldComponent),
    __metadata("design:type", core_1.QueryList)
], RevisionComponent.prototype, "fieldFormComponents", void 0);
RevisionComponent = __decorate([
    core_1.Component({
        selector: 'revision',
        template: "\n  <form id=\"revisionForm\" class=\"ui form\" (ngSubmit)=\"submit_revision()\" #revisionForm=\"ngForm\">\n    <div class=\"field\">\n      <label>ID</label>\n      <p>{{_revision?._id}}</p>\n    </div>\n    <div class=\"field\">\n      <label>\u5DF2\u767C\u4F48</label>\n      <p>{{_revision?.published ? '\u662F' : '\u5426'}}</p>\n    </div>\n    <div class=\"field\">\n      <label>\u7248\u672C</label>\n      <input type=\"number\" min=\"1.0\" step=\"0.1\" [(ngModel)]=\"_revision.revision\" name=\"revision\" required>\n    </div>\n\n    <div class=\"field\">\n      <label>\u7C3D\u6838</label>\n      <div class=\"inline fields\">\n        <div class=\"field\">\n          <div class=\"ui radio checkbox\">\n            <input type=\"radio\" name=\"signaturesRadio\" value=\"false\" [checked]=\"_revision.signatures == false\" (change)=\"_revision.signatures = false\">\n            <label>\u4E0D\u9700\u8981</label>\n          </div>\n        </div>\n        <div class=\"field\">\n          <div class=\"ui radio checkbox\">\n            <input type=\"radio\" name=\"signaturesRadio\" value=\"true\" [checked]=\"_revision.signatures == true\" (change)=\"_revision.signatures = true\">\n            <label>\u9700\u8981</label>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"field\">\n      <label>\u7D44\u9577\u7C3D\u6838</label>\n      <div class=\"inline fields\">\n        <div class=\"field\">\n          <div class=\"ui radio checkbox\">\n            <input type=\"radio\" name=\"officerSignatureRadio\" value=\"false\" [checked]=\"_revision.officerSignature == false\" (change)=\"_revision.officerSignature = false\">\n            <label>\u4E0D\u9700\u8981</label>\n          </div>\n        </div>\n        <div class=\"field\">\n          <div class=\"ui radio checkbox\">\n            <input type=\"radio\" name=\"officerSignatureRadio\" value=\"true\" [checked]=\"_revision.officerSignature == true\" (change)=\"_revision.officerSignature = true\">\n            <label>\u9700\u8981</label>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"field\">\n      <label>\u6B0A\u9650</label>\n      <div class=\"inline fields\">\n        <div class=\"field\">\n          <div class=\"ui radio checkbox\">\n            <input type=\"radio\" name=\"groupRadio\" value=\"1\" [checked]=\"_revision.group == 1\" (change)=\"_revision.group = 1\">\n            <label>\u7BA1\u7406\u54E1</label>\n          </div>\n        </div>\n        <div class=\"field\">\n          <div class=\"ui radio checkbox\">\n            <input type=\"radio\" name=\"groupRadio\" value=\"2\" [checked]=\"_revision.group == 2\" (change)=\"_revision.group = 2\">\n            <label>\u8CC7\u8A0A\u5B89\u5168\u4EBA\u54E1</label>\n          </div>\n        </div>\n        <div class=\"field\">\n          <div class=\"ui radio checkbox\">\n            <input type=\"radio\" name=\"groupRadio\" value=\"3\" [checked]=\"_revision.group == 3\" (change)=\"_revision.group = 3\">\n            <label>\u4E00\u822C\u4F7F\u7528\u8005</label>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"field\">\n      <label>\u6A5F\u5BC6\u6027</label>\n      <div class=\"inline fields\">\n        <div class=\"field\">\n          <div class=\"ui radio checkbox\">\n            <input type=\"radio\" name=\"secrecyLevelRadio\" value=\"1\" [checked]=\"_revision.secrecyLevel == 1\" (change)=\"_revision.secrecyLevel = 1\">\n            <label>\u6A5F\u5BC6</label>\n          </div>\n        </div>\n        <div class=\"field\">\n          <div class=\"ui radio checkbox\">\n            <input type=\"radio\" name=\"secrecyLevelRadio\" value=\"2\" [checked]=\"_revision.secrecyLevel == 2\" (change)=\"_revision.secrecyLevel = 2\">\n            <label>\u654F\u611F</label>\n          </div>\n        </div>\n        <div class=\"field\">\n          <div class=\"ui radio checkbox\">\n            <input type=\"radio\" name=\"secrecyLevelRadio\" value=\"3\" [checked]=\"_revision.secrecyLevel == 3\" (change)=\"_revision.secrecyLevel = 3\">\n            <label>\u9650\u95B1</label>\n          </div>\n        </div>\n        <div class=\"field\">\n          <div class=\"ui radio checkbox\">\n            <input type=\"radio\" name=\"secrecyLevelRadio\" value=\"4\" [checked]=\"_revision.secrecyLevel == 4\" (change)=\"_revision.secrecyLevel = 4\">\n            <label>\u4E00\u822C</label>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div style=\"text-align: right;\">\n      <button type=\"button\" class=\"ui teal basic button\" (click)=\"publish_revision()\" *ngIf=\"!_revision.published\" [class.loading]=\"isPublishing\">\u767C\u4F48</button>\n      <button type=\"button\" class=\"ui red basic button\" (click)=\"delete_revision()\" *ngIf=\"!_revision.published\" [class.loading]=\"isDeleting\">\u522A\u9664</button>\n      <button type=\"submit\" id=\"update_button\" class=\"ui basic button\" [class.green]=\"revisionForm.form.valid\" [class.red]=\"!revisionForm.form.valid\"\n        [disabled]=\"!revisionForm.form.valid\" [class.loading]=\"isUpdating\">\u66F4\u65B0</button>\n    </div>\n  </form>\n\n  <div class=\"ui secdion divider\"></div>\n\n  <div class=\"ui basic segment\" [class.loading]=\"isLoadingFields\">\n    <h3 class=\"ui header\" style=\"clear: none;\">\u8868\u55AE\u6B04\u4F4D</h3>\n    <a class=\"link\" (click)=\"toggleCollapse()\" style=\"float: right;\">\u5C55\u958B\uFF0F\u6536\u5408\u8868\u55AE\u6B04\u4F4D</a>\n    <p><small>\u6BCF\u500B\u7248\u672C\u6709\u81EA\u5DF1\u7684\u6B04\u4F4D\u8A2D\u8A08\u3002</small></p>\n    <div *ngIf=\"fields.length != 0\" class=\"ui segments\">\n      <div class=\"ui segment\" style=\"overflow: auto;\" *ngFor=\"let _ of fields; let i = index; let coloring = odd;\" [class.secondary]=\"coloring\">\n        <field *ngIf=\"fields[i]\" [(ngModel)]=\"fields[i]\" [update-button]=\"true\" (reload)=\"reloadField(fields[i], $event)\" (update)=\"updateField(fields[i], $event)\" (delete)=\"deleteField(fields[i])\"></field>\n      </div>\n    </div>\n    <div style=\"text-align: center;\">\n      <button type=\"button\" class=\"ui teal basic button\" (click)=\"createField()\" [class.loading]=\"isCreatingField\">\u589E\u52A0\u6B04\u4F4D</button>\n    </div>\n  </div>\n  "
    }),
    __param(1, core_1.Self()),
    __metadata("design:paramtypes", [form_service_1.FormService, forms_1.NgModel])
], RevisionComponent);
exports.RevisionComponent = RevisionComponent;
//# sourceMappingURL=revision.component.js.map
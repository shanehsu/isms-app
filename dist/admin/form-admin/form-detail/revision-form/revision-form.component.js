System.register(['angular2/core', './../../../../services/form.service', './../field-form/field-form.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, form_service_1, field_form_component_1;
    var RevisionFormComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (form_service_1_1) {
                form_service_1 = form_service_1_1;
            },
            function (field_form_component_1_1) {
                field_form_component_1 = field_form_component_1_1;
            }],
        execute: function() {
            RevisionFormComponent = (function () {
                // 服務
                // 簡單初始化
                function RevisionFormComponent(_formService) {
                    this._formService = _formService;
                    // 輸出
                    this._revisionDidUpdate = new core_1.EventEmitter();
                    this._formDidUpdate = new core_1.EventEmitter();
                }
                // 更新表單
                // 結果 => 將會送出 `revisionDidUpdate` 事件
                // 母元件應該自己更新顯示的資料
                RevisionFormComponent.prototype.submit_revision = function () {
                    var _this = this;
                    this._formService.updateRevision(this._formID, this._revision)
                        .then(function () { return _this._revisionDidUpdate.emit(null); })
                        .catch(console.error);
                };
                // 刪除該表單版本
                // 結果 => 將會送出 `formDidUpdate` 事件
                // 母元件應該更新顯示的資料
                RevisionFormComponent.prototype.delete_revision = function () {
                    var _this = this;
                    this._formService.deleteRevision(this._formID, this._revision._id)
                        .then(function () { return _this._formDidUpdate.emit(null); })
                        .catch(console.error);
                };
                /// 欄位相關
                RevisionFormComponent.prototype.reload_fields = function () {
                    var _this = this;
                    var revisionID = this._revision._id;
                    this._formService.revision(this._formID, revisionID)
                        .then(function (revision) { return _this._revision.fields = revision.fields; })
                        .catch(console.error);
                };
                RevisionFormComponent.prototype.new_field = function () {
                    var _this = this;
                    var revisionID = this._revision._id;
                    this._formService.newField(this._formID, revisionID)
                        .then(function () { return _this.reload_fields(); })
                        .catch(console.error);
                };
                __decorate([
                    core_1.Input('form-id'), 
                    __metadata('design:type', String)
                ], RevisionFormComponent.prototype, "_formID", void 0);
                __decorate([
                    core_1.Input('revision'), 
                    __metadata('design:type', Object)
                ], RevisionFormComponent.prototype, "_revision", void 0);
                __decorate([
                    core_1.Output('revisionDidUpdate'), 
                    __metadata('design:type', Object)
                ], RevisionFormComponent.prototype, "_revisionDidUpdate", void 0);
                __decorate([
                    core_1.Output('formDidUpdate'), 
                    __metadata('design:type', Object)
                ], RevisionFormComponent.prototype, "_formDidUpdate", void 0);
                RevisionFormComponent = __decorate([
                    core_1.Component({
                        selector: 'revision-form',
                        templateUrl: '/app/admin/form-admin/form-detail/revision-form/revision-form.template.html',
                        directives: [field_form_component_1.FieldFormComponent]
                    }), 
                    __metadata('design:paramtypes', [form_service_1.FormService])
                ], RevisionFormComponent);
                return RevisionFormComponent;
            })();
            exports_1("RevisionFormComponent", RevisionFormComponent);
        }
    }
});
//# sourceMappingURL=revision-form.component.js.map
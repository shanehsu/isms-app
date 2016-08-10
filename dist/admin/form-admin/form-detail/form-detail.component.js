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
// 路由器
var router_1 = require('@angular/router');
// 服務
var form_service_1 = require('./../../../services/form.service');
// 子表單
var revision_form_component_1 = require('./revision-form/revision-form.component');
var FormDetailComponent = (function () {
    function FormDetailComponent(_formService, _routeSegment, _router) {
        this._formService = _formService;
        this._routeSegment = _routeSegment;
        this._router = _router;
        this._revisions = [];
    }
    /**
     * reload_form() 函數
     *
     * 根據 `_id` 取得表單資料，並存入 `_form` 變數。
     *
     * 依照指定的參數，可能更動 `_currentRevision`, `_revisions`,
     * `_revision` 這三個與表單版本有關的變數。
     *
     * isInitialPull 將會載入表單版本，進行初始化設定並顯示表單版本的表單。
     */
    FormDetailComponent.prototype.reload_form = function (isInitialPull) {
        var _this = this;
        if (isInitialPull === void 0) { isInitialPull = false; }
        this._formService.form(this._id)
            .then(function (form) {
            _this._form = form;
            if (isInitialPull) {
                _this.reload_revisions(true);
            }
        }).catch(console.error);
    };
    /**
     * reload_revisions() 函數
     *
     * 根據目前表單變數 `_form` 所提供的表單版本 ID，載入所有表單版本，
     * 並儲存到 `_revisions` 變數中。
     *
     * isInitialPull 進行初始化設定並顯示表單版本的表單。
     */
    FormDetailComponent.prototype.reload_revisions = function (isInitialPull) {
        var _this = this;
        if (isInitialPull === void 0) { isInitialPull = false; }
        this._formService.form(this._id)
            .then(function (form) {
            var revisionIDs = form.revisions;
            _this._revisions = [];
            revisionIDs.forEach(function (revisionID, index) {
                _this._formService.revision(_this._id, revisionID)
                    .then(function (revision) {
                    _this._revisions[index] = revision;
                    // 若需要初始化
                    if (isInitialPull && index == revisionIDs.length - 1) {
                        _this._revision = _this._revisions[index];
                    }
                }).catch(console.error);
            });
        }).catch(console.error);
        // 先清空
        this._revisions = [];
    };
    /**
     * 重新載入目前的表單版本
     */
    FormDetailComponent.prototype.reload_revision = function () {
        var _this = this;
        var index = this._revisions.findIndex(function (revision) { return revision._id == _this._revision._id; });
        this._formService.revision(this._id, this._revisions[index]._id)
            .then(function (revision) {
            _this._revisions[index] = revision;
            _this._revision = _this._revisions[index];
        }).catch(console.error);
    };
    FormDetailComponent.prototype.ngOnInit = function () {
        // 載入空資料
        this._revision = {};
        this._form = {};
        // 取得表單 ID
        this._id = this._routeSegment.getParam('id');
        // 取得表單資訊
        this.reload_form(true);
    };
    FormDetailComponent.prototype.submit = function () {
        var _this = this;
        this._formService.update(this._form)
            .then(function () { return _this._router.navigate(['/admin/form']); })
            .catch(console.error);
    };
    FormDetailComponent.prototype.cancel = function () {
        this._router.navigate(['/admin/form']);
    };
    // 表單版本操作
    // 選單列樣式判斷
    FormDetailComponent.prototype.isActiveRevision = function (revision) {
        return revision == this._revision;
    };
    // 選擇成為目前表單版本
    FormDetailComponent.prototype.select_revision = function (revision) {
        this._revision = revision;
    };
    FormDetailComponent.prototype.new_revision = function () {
        var _this = this;
        this._formService.newRevision(this._id)
            .then(function (id) {
            _this.reload_revisions(true);
        }).catch(console.error);
    };
    FormDetailComponent = __decorate([
        core_1.Component({
            selector: 'form-detail',
            templateUrl: '/app/admin/form-admin/form-detail/form-detail.template.html',
            providers: [form_service_1.FormService],
            directives: [revision_form_component_1.RevisionFormComponent]
        }), 
        __metadata('design:paramtypes', [form_service_1.FormService, router_1.RouteSegment, router_1.Router])
    ], FormDetailComponent);
    return FormDetailComponent;
}());
exports.FormDetailComponent = FormDetailComponent;
//# sourceMappingURL=form-detail.component.js.map
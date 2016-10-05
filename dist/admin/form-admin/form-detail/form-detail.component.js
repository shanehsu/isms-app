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
var core_1 = require("@angular/core");
// 路由器
var router_1 = require("@angular/router");
// 服務
var form_service_1 = require("./../../../services/form.service");
// 子表單
var revision_form_component_1 = require("./revision-form/revision-form.component");
var FormDetailComponent = (function () {
    function FormDetailComponent(_formService, _routeSegment, _router) {
        this._formService = _formService;
        this._routeSegment = _routeSegment;
        this._router = _router;
    }
    FormDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.form = {};
        this._revisions = [];
        this.requestingNewRevision = false;
        this.isUpdating = false;
        this.isLoadingForm = true;
        this._isLoadingRevisions = true;
        // 取得表單 ID
        this._id = this._routeSegment.getParam('id');
        // 載入表單
        this._formService.form(this._id).then(function (form) {
            _this.isLoadingForm = false;
            _this.form = form;
            // 載入版本
            if (_this._revisions.length == 0) {
                _this._isLoadingRevisions = false;
            }
            _this._revisions = _this.form.revisions.map(function (_) { return undefined; });
            _this.form.revisions.forEach(function (id, index) {
                _this._formService.revision(_this._id, id).then(function (revision) {
                    _this._revisions[index] = revision;
                    if (index == _this._revisions.length - 1) {
                        _this.selectRevision(_this._revisions[index]);
                    }
                    if (_this._revisions.indexOf(undefined) < 0) {
                        _this._isLoadingRevisions = false;
                    }
                }).catch(function (err) {
                    console.error('無法載入表單版本');
                    console.error(err);
                });
            });
        }).catch(function (err) {
            console.error('無法載入表單');
            console.error(err);
        });
    };
    FormDetailComponent.prototype.ngAfterViewInit = function () {
        $('#update_button').popup({
            inline: true
        });
    };
    FormDetailComponent.prototype.submit = function () {
        var _this = this;
        this.isUpdating = true;
        this._formService.update(this.form)
            .then(function () { _this.isUpdating = false; })
            .catch(console.error);
    };
    FormDetailComponent.prototype.cancel = function () {
        this._router.navigate(['/admin/form']);
    };
    // 表單版本操作
    FormDetailComponent.prototype.isActiveRevision = function (revision) {
        return revision == this._selectedRevision;
    };
    // 選擇成為目前表單版本
    FormDetailComponent.prototype.selectRevision = function (revision) {
        this._selectedRevision = revision;
    };
    FormDetailComponent.prototype.newRevision = function () {
        var _this = this;
        this.requestingNewRevision = true;
        this._formService.newRevision(this._id).then(function (id) {
            _this._formService.revision(_this._id, id).then(function (revision) {
                _this.requestingNewRevision = false;
                _this._revisions.push(revision);
                _this.selectRevision(revision);
            }).catch(function (err) {
                console.error('無法取得剛剛新增的版本');
                console.error(err);
            });
        }).catch(function (err) {
            console.error('無法新增版本');
            console.error(err);
        });
    };
    FormDetailComponent.prototype.publishRevision = function (donePublishing) {
        var revisionToPublish = this._selectedRevision;
        this._formService.publishRevision(this._id, revisionToPublish).then(function () {
            revisionToPublish.published = true;
            donePublishing();
        }).catch(function (err) {
            console.error('發佈失敗');
            console.error(err);
        });
    };
    FormDetailComponent.prototype.updateRevision = function (doneUpdating) {
        var revisionToUpdate = this._selectedRevision;
        this._formService.updateRevision(this._id, revisionToUpdate).then(function () {
            doneUpdating();
        }).catch(function (err) {
            console.error('更新失敗');
            console.error(err);
        });
    };
    FormDetailComponent.prototype.deleteRevision = function () {
        var _this = this;
        var revisionToDelete = this._selectedRevision;
        this._formService.deleteRevision(this._id, revisionToDelete._id).then(function () {
            var filteredRevision = _this._revisions.filter(function (revision) { return revision != revisionToDelete; });
            var lastRevision = filteredRevision[filteredRevision.length - 1];
            _this.selectRevision(lastRevision);
            _this._revisions.splice(_this._revisions.indexOf(revisionToDelete), 1);
        }).catch(function (err) {
            console.error('無法刪除版本');
            console.error(err);
        });
    };
    return FormDetailComponent;
}());
FormDetailComponent = __decorate([
    core_1.Component({
        selector: 'form-detail',
        templateUrl: '/app/admin/form-admin/form-detail/form-detail.template.html',
        providers: [form_service_1.FormService],
        directives: [revision_form_component_1.RevisionFormComponent]
    }),
    __metadata("design:paramtypes", [form_service_1.FormService, typeof (_a = typeof router_1.RouteSegment !== "undefined" && router_1.RouteSegment) === "function" && _a || Object, router_1.Router])
], FormDetailComponent);
exports.FormDetailComponent = FormDetailComponent;
var _a;
//# sourceMappingURL=form-detail.component.js.map
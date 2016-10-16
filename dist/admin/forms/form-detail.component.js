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
var form_service_1 = require('./../../services/form.service');
var FormDetailComponent = (function () {
    function FormDetailComponent(formService, route, router) {
        this.formService = formService;
        this.route = route;
        this.router = router;
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
        this._id = this.route.snapshot.params['id'];
        // 載入表單
        this.formService.form(this._id).then(function (form) {
            _this.isLoadingForm = false;
            _this.form = form;
            // 載入版本
            if (_this._revisions.length == 0) {
                _this._isLoadingRevisions = false;
            }
            _this._revisions = _this.form.revisions.map(function (_) { return undefined; });
            _this.form.revisions.forEach(function (id, index) {
                _this.formService.revision(_this._id, id).then(function (revision) {
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
        this.formService.update(this.form)
            .then(function () { _this.isUpdating = false; })
            .catch(console.error);
    };
    FormDetailComponent.prototype.cancel = function () {
        this.router.navigate(['..'], { relativeTo: this.route });
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
        this.formService.newRevision(this._id).then(function (id) {
            _this.formService.revision(_this._id, id).then(function (revision) {
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
        this.formService.publishRevision(this._id, revisionToPublish).then(function () {
            revisionToPublish.published = true;
            donePublishing();
        }).catch(function (err) {
            console.error('發佈失敗');
            console.error(err);
        });
    };
    FormDetailComponent.prototype.updateRevision = function (doneUpdating) {
        var revisionToUpdate = this._selectedRevision;
        this.formService.updateRevision(this._id, revisionToUpdate).then(function () {
            doneUpdating();
        }).catch(function (err) {
            console.error('更新失敗');
            console.error(err);
        });
    };
    FormDetailComponent.prototype.deleteRevision = function () {
        var _this = this;
        var revisionToDelete = this._selectedRevision;
        this.formService.deleteRevision(this._id, revisionToDelete._id).then(function () {
            var filteredRevision = _this._revisions.filter(function (revision) { return revision != revisionToDelete; });
            var lastRevision = filteredRevision[filteredRevision.length - 1];
            _this.selectRevision(lastRevision);
            _this._revisions.splice(_this._revisions.indexOf(revisionToDelete), 1);
        }).catch(function (err) {
            console.error('無法刪除版本');
            console.error(err);
        });
    };
    FormDetailComponent = __decorate([
        core_1.Component({
            selector: 'form-detail',
            template: "\n  <form *ngIf=\"form\" class=\"ui padded raised form segment\" (ngSubmit)=\"submit()\" #formForm=\"ngForm\" [class.loading]=\"isLoadingForm\">\n    <h2 class=\"ui header\">\u57FA\u672C\u8CC7\u8A0A</h2>\n    <div class=\"field\">\n      <label>ID</label>\n      <p>{{form._id}}</p>\n    </div>\n    <div class=\"field\">\n      <label>\u8868\u55AE ID</label>\n      <input type=\"text\" [(ngModel)]=\"form.identifier\" name=\"identifier\" required>\n    </div>\n    <div class=\"field\">\n      <label>\u540D\u7A31</label>\n      <input type=\"text\" [(ngModel)]=\"form.name\" name=\"name\" required>\n    </div>\n\n    <div style=\"text-align: right;\">\n      <button type=\"button\" class=\"ui basic button\" (click)=\"cancel()\">\u8FD4\u56DE</button>\n      <button type=\"submit\" id=\"update_button\" class=\"ui basic button\" [class.green]=\"formForm.form.valid\" [class.red]=\"!formForm.form.valid\"\n        [disabled]=\"!formForm.form.valid\" data-content=\"\u8A72\u6309\u9215\u53EA\u80FD\u66F4\u65B0\u8868\u55AE ID \u4EE5\u53CA\u8868\u55AE\u540D\u7A31\u3002\" [class.loading]=\"isUpdating\">\u66F4\u65B0</button>\n    </div>\n  </form>\n\n  <div *ngIf=\"_revisions\" class=\"ui raised padded segment\" [class.loading]=\"_isLoadingRevisions\">\n    <h2 class=\"ui header\">\u7248\u672C</h2>\n    <div class=\"ui top attached tabular menu\">\n      <a *ngFor=\"let revision of _revisions\" class=\"link item\" [class.active]=\"isActiveRevision(revision)\" (click)=\"selectRevision(revision)\">\n        <i *ngIf=\"!revision\" class=\"notched circle loading icon\"></i>\n        <span>{{revision?.revision?.toFixed(1)}}</span>\n      </a>\n      <a class=\"link item\" (click)=\"newRevision()\">\n        <i *ngIf=\"requestingNewRevision\" class=\"notched circle loading icon\"></i>\n        <i *ngIf=\"!requestingNewRevision\" class=\"plus icon\"></i>\n      </a>\n    </div>\n    <div class=\"ui bottom attached segment\">\n      <p *ngIf=\"_revisions.length == 0\">\u6C92\u6709\u7248\u672C</p>\n      <revision *ngIf=\"_revisions.length != 0\" [form-id]=\"form._id\" [(ngModel)]=\"_selectedRevision\" (publish)=\"publishRevision($event)\" (update)=\"updateRevision($event)\" (delete)=\"deleteRevision()\"></revision>\n    </div>\n  </div>"
        }), 
        __metadata('design:paramtypes', [form_service_1.FormService, router_1.ActivatedRoute, router_1.Router])
    ], FormDetailComponent);
    return FormDetailComponent;
}());
exports.FormDetailComponent = FormDetailComponent;
//# sourceMappingURL=form-detail.component.js.map
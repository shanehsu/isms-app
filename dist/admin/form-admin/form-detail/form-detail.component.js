System.register(['angular2/core', 'angular2/router', './../../../services/form.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, form_service_1;
    var FormDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (form_service_1_1) {
                form_service_1 = form_service_1_1;
            }],
        execute: function() {
            FormDetailComponent = (function () {
                function FormDetailComponent(_formService, _routeParams, _router) {
                    this._formService = _formService;
                    this._routeParams = _routeParams;
                    this._router = _router;
                    this._currentRevision = '';
                    this._revisions = [];
                }
                FormDetailComponent.prototype.refresh_data = function () {
                    var _this = this;
                    this._formService.form(this._id)
                        .then(function (form) {
                        _this._form = form;
                        if (form.revisions.length == 0)
                            _this._revision = {};
                        // 若是重新更新
                        if (_this._currentRevision == '')
                            _this._currentRevision = form.revisions[form.revisions.length - 1];
                        // 載入表單版本
                        _this._revisions = [];
                        form.revisions.forEach(function (revisionID, index) {
                            _this._formService.revision(_this._id, revisionID).then(function (revision) {
                                _this._revisions[index] = revision;
                                if (revision._id == _this._currentRevision)
                                    _this._revision = _this._revisions[index];
                            }).catch(console.error);
                        });
                    })
                        .catch(console.error);
                };
                FormDetailComponent.prototype.ngOnInit = function () {
                    // 載入空資料
                    this._revision = {};
                    this._form = {};
                    this._id = this._routeParams.get('id');
                    this.refresh_data();
                };
                FormDetailComponent.prototype.submit = function () {
                    var _this = this;
                    this._formService.update(this._form)
                        .then(function () { return _this._router.navigate(['FormList']); })
                        .catch(console.error);
                };
                FormDetailComponent.prototype.cancel = function () {
                    this._router.navigate(['FormList']);
                };
                // 表單版本操作
                FormDetailComponent.prototype.isActiveRevision = function (id) {
                    return id == this._currentRevision;
                };
                FormDetailComponent.prototype.new_revision = function () {
                    var _this = this;
                    this._formService.newRevision(this._id)
                        .then(function (id) {
                        _this.refresh_data();
                        _this._currentRevision = id;
                    })
                        .catch(console.error);
                };
                FormDetailComponent.prototype.edit_revision = function (id) {
                    var _this = this;
                    this._currentRevision = id;
                    var index = this._revisions.findIndex(function (revision) { return revision._id == _this._currentRevision; });
                    this._revision = this._revisions[index];
                };
                FormDetailComponent.prototype.submit_revision = function () {
                    var _this = this;
                    var index = this._revisions.findIndex(function (revision) { return revision._id == _this._currentRevision; });
                    this._formService.updateRevision(this._id, this._revisions[index])
                        .then(function () { return _this.refresh_data(); })
                        .catch(console.error);
                };
                FormDetailComponent.prototype.delete_revision = function () {
                    var _this = this;
                    // this._revisions = []
                    this._formService.deleteRevision(this._id, this._currentRevision).then(function () {
                        _this._currentRevision = '';
                        _this.refresh_data();
                    }).catch(console.error);
                };
                FormDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'form-detail',
                        templateUrl: '/app/admin/form-admin/form-detail/form-detail.template.html',
                        providers: [form_service_1.FormService]
                    }), 
                    __metadata('design:paramtypes', [form_service_1.FormService, router_1.RouteParams, router_1.Router])
                ], FormDetailComponent);
                return FormDetailComponent;
            })();
            exports_1("FormDetailComponent", FormDetailComponent);
        }
    }
});
//# sourceMappingURL=form-detail.component.js.map
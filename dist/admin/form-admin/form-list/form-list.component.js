System.register(['angular2/core', 'angular2/router', './../../../services/form.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
    var FormListComponent;
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
            FormListComponent = (function () {
                function FormListComponent(_formService, _router) {
                    this._formService = _formService;
                    this._router = _router;
                }
                FormListComponent.prototype.refresh = function () {
                    var _this = this;
                    this._formService.forms()
                        .then(function (forms) { return _this._forms = forms; })
                        .catch(console.error);
                };
                FormListComponent.prototype.ngOnInit = function () {
                    this.refresh();
                };
                FormListComponent.prototype.new = function () {
                    var _this = this;
                    this._formService.new()
                        .then(function (id) { return _this._router.navigate(['FormDetail', { 'id': id }]); })
                        .catch(console.error);
                };
                FormListComponent.prototype.edit = function (id) {
                    this._router.navigate(['FormDetail', { 'id': id }]);
                };
                FormListComponent.prototype.delete = function (id) {
                    var _this = this;
                    this._formService.delete(id)
                        .then(function () { return _this.refresh(); })
                        .catch(console.error);
                };
                FormListComponent = __decorate([
                    core_1.Component({
                        selector: 'form-list',
                        templateUrl: '/app/admin/form-admin/form-list/form-list.template.html',
                        providers: [form_service_1.FormService]
                    }), 
                    __metadata('design:paramtypes', [form_service_1.FormService, router_1.Router])
                ], FormListComponent);
                return FormListComponent;
            }());
            exports_1("FormListComponent", FormListComponent);
        }
    }
});
//# sourceMappingURL=form-list.component.js.map
System.register(['angular2/core', './../services/form.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, form_service_1;
    var FormIndexComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (form_service_1_1) {
                form_service_1 = form_service_1_1;
            }],
        execute: function() {
            FormIndexComponent = (function () {
                function FormIndexComponent(_formService) {
                    this._formService = _formService;
                }
                FormIndexComponent.prototype.refresh = function () {
                    var _this = this;
                    this._formService.forms()
                        .then(function (forms) { return _this._forms = forms; })
                        .catch(console.error);
                };
                FormIndexComponent.prototype.ngOnInit = function () {
                    this.refresh();
                };
                FormIndexComponent.prototype.fill = function (id) {
                };
                FormIndexComponent = __decorate([
                    core_1.Component({
                        selector: 'isms-form',
                        templateUrl: '/app/isms-form/form-index.template.html',
                        providers: [form_service_1.FormService]
                    }), 
                    __metadata('design:paramtypes', [form_service_1.FormService])
                ], FormIndexComponent);
                return FormIndexComponent;
            })();
            exports_1("FormIndexComponent", FormIndexComponent);
        }
    }
});
//# sourceMappingURL=form-index.component.js.map
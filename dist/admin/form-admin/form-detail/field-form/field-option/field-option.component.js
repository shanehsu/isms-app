System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var FieldOptionComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            FieldOptionComponent = (function () {
                function FieldOptionComponent() {
                }
                FieldOptionComponent.prototype.ngOnInit = function () {
                };
                __decorate([
                    core_1.Input('field-type'), 
                    __metadata('design:type', String)
                ], FieldOptionComponent.prototype, "_fieldType", void 0);
                FieldOptionComponent = __decorate([
                    core_1.Component({
                        selector: 'field-option',
                        templateUrl: '/app/admin/form-admin/form-detail/field-form/field-option/field-option.template.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], FieldOptionComponent);
                return FieldOptionComponent;
            })();
            exports_1("FieldOptionComponent", FieldOptionComponent);
        }
    }
});
//# sourceMappingURL=field-option.component.js.map
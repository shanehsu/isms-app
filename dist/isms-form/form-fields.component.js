System.register(['angular2/core', './../controls/isms-form-controls'], function(exports_1, context_1) {
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
    var core_1, FormControls;
    var FormFields;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (FormControls_1) {
                FormControls = FormControls_1;
            }],
        execute: function() {
            FormFields = (function () {
                function FormFields() {
                }
                FormFields.prototype.ngOnInit = function () {
                };
                __decorate([
                    core_1.Input("fields"), 
                    __metadata('design:type', Array)
                ], FormFields.prototype, "_fields", void 0);
                FormFields = __decorate([
                    core_1.Component({
                        selector: 'isms-form-fields',
                        template: "<form>\n  12345\n  </form>",
                        // <form-control type="text" row="single"></form-control>
                        // <form-control type="text" row="multi"></form-control>
                        // <form-control type="date"></form-control>
                        // <form-control type="time"></form-control>
                        // <form-control type="options" presentation="single"></form-control>
                        // <form-control type="options" presentation="multi"></form-control>
                        // <form-control type="options" presentation="dropdown"></form-control>
                        // <form-control type="table"></form-control>
                        directives: [FormControls.SingleLineTextFormControl, FormControls.SingleLineTextFormControlValueAccessor,
                            FormControls.MultiLineTextFormControl, FormControls.MultiLineTextFormControlValueAccessor,
                            FormControls.DateFormControl, FormControls.DateFormControlValueAccessor,
                            FormControls.TimeFormControl, FormControls.TimeFormControlValueAccessor,
                            FormControls.SingleOptionsFormControl, FormControls.SingleOptionsFormControlValueAccessor,
                            FormControls.MultiOptionsFormControl, FormControls.MultiOptionsFormControlValueAccessor,
                            FormControls.DropdownOptionsFormControl, FormControls.DropdownOptionsFormControlValueAccessor,
                            FormControls.TableFormControl, FormControls.TableFormControlValueAccessor],
                    }), 
                    __metadata('design:paramtypes', [])
                ], FormFields);
                return FormFields;
            }());
            exports_1("FormFields", FormFields);
        }
    }
});
//# sourceMappingURL=form-fields.component.js.map
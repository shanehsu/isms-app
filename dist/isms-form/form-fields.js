System.register(['angular2/core', './../controls/isms-form-controls', 'angular2/common', 'angular2/src/facade/lang'], function(exports_1, context_1) {
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
    var core_1, FormControls, core_2, common_1, lang_1;
    var FormFields, CUSTOM_VALUE_ACCESSOR, FormFieldsValueAccessor;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (FormControls_1) {
                FormControls = FormControls_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            FormFields = (function () {
                function FormFields() {
                    // 推送資料
                    this._changed = new core_1.EventEmitter();
                    // 當焦點離開
                    this._touched = new core_1.EventEmitter();
                    this._inline = false;
                }
                FormFields.prototype.ngOnInit = function () {
                };
                // 與 Value Accessor 有關的
                // 從 Value Accessor 接收資料
                FormFields.prototype.setValue = function (value) {
                    this._model = value;
                };
                __decorate([
                    core_1.Output('control-changed'), 
                    __metadata('design:type', Object)
                ], FormFields.prototype, "_changed", void 0);
                __decorate([
                    core_1.Output('control-touched'), 
                    __metadata('design:type', Object)
                ], FormFields.prototype, "_touched", void 0);
                __decorate([
                    core_1.Input("fields"), 
                    __metadata('design:type', Array)
                ], FormFields.prototype, "_fields", void 0);
                __decorate([
                    core_1.Input("inline"), 
                    __metadata('design:type', Boolean)
                ], FormFields.prototype, "_inline", void 0);
                FormFields = __decorate([
                    core_1.Component({
                        selector: 'isms-form-fields',
                        template: "<form>\n    <template ngFor #item [ngForOf]=\"_fields\" #i=\"index\">\n      <div *ngIf=\"!_inline\" class=\"form-group row\">\n        <label class=\"col-sm-3 form-control-label\" style=\"text-align: right;\">{{item.name}}</label>\n        <div class=\"col-sm-9\" [ngSwitch]=\"item.type\">\n          <template ngSwitchWhen=\"shortText\">\n            <form-control type=\"text\" row=\"single\" [(ngModel)]=\"_model[i]\"></form-control>\n          </template>\n          \n          <template ngSwitchWhen=\"longText\">\n            <form-control type=\"text\" row=\"multi\" [(ngModel)]=\"_model[i]\"></form-control>\n          </template>\n          \n          <template ngSwitchWhen=\"date\">\n            <form-control type=\"date\" [(ngModel)]=\"_model[i]\"></form-control>\n          </template>\n          \n          <template ngSwitchWhen=\"time\">\n            <form-control type=\"time\" [(ngModel)]=\"_model[i]\"></form-control>\n          </template>\n          <template ngSwitchWhen=\"options\">\n            <div [ngSwitch]=\"item.metadata.presentation\">\n              <template ngSwitchWhen=\"radio\">\n                <form-control type=\"options\" presentation=\"single\" [metadata]=\"item.metadata\" [(ngModel)]=\"_model[i]\"></form-control>\n              </template>\n              <template ngSwitchWhen=\"checkbox\">\n                <form-control type=\"options\" presentation=\"multi\" [metadata]=\"item.metadata\" [(ngModel)]=\"_model[i]\"></form-control>\n              </template>\n              <template ngSwitchWhen=\"select\">\n                <form-control type=\"options\" presentation=\"dropdown\" [metadata]=\"item.metadata\" [(ngModel)]=\"_model[i]\"></form-control>\n              </template>\n              <template ngSwitchDefault>\u9078\u64C7\u6B04\u4F4D\uFF1A\u4E0D\u652F\u63F4\u7684\u8868\u793A\u65B9\u6CD5</template>\n            </div>\n          </template>\n          <template ngSwitchWhen=\"table\">\n            <form-control type=\"table\" [metadata]=\"item.metadata\" [(ngModel)]=\"_model[i]\"></form-control>\n          </template>\n          <template ngSwitchDefault>\u4E0D\u652F\u63F4\u7684\u6B04\u4F4D\uFF0C\u8ACB\u806F\u7D61\u7BA1\u7406\u54E1\uFF01</template>\n        </div>\n      </div>\n      <fieldset *ngIf=\"_inline\" class=\"form-group\">\n        <label>{{item.name}}</label>\n        <div [ngSwitch]=\"item.type\">\n          <template ngSwitchWhen=\"shortText\">\n            <form-control type=\"text\" row=\"single\" [(ngModel)]=\"_model[i]\"></form-control>\n          </template>\n          \n          <template ngSwitchWhen=\"longText\">\n            <form-control type=\"text\" row=\"multi\" [(ngModel)]=\"_model[i]\"></form-control>\n          </template>\n          \n          <template ngSwitchWhen=\"date\">\n            <form-control type=\"date\" [(ngModel)]=\"_model[i]\"></form-control>\n          </template>\n          \n          <template ngSwitchWhen=\"time\">\n            <form-control type=\"time\" [(ngModel)]=\"_model[i]\"></form-control>\n          </template>\n          <template ngSwitchWhen=\"options\">\n            <div [ngSwitch]=\"item.metadata.presentation\">\n              <template ngSwitchWhen=\"radio\">\n                <form-control type=\"options\" presentation=\"single\" [metadata]=\"item.metadata\" [(ngModel)]=\"_model[i]\"></form-control>\n              </template>\n              <template ngSwitchWhen=\"checkbox\">\n                <form-control type=\"options\" presentation=\"multi\" [metadata]=\"item.metadata\" [(ngModel)]=\"_model[i]\"></form-control>\n              </template>\n              <template ngSwitchWhen=\"select\">\n                <form-control type=\"options\" presentation=\"dropdown\" [metadata]=\"item.metadata\" [(ngModel)]=\"_model[i]\"></form-control>\n              </template>\n              <template ngSwitchDefault>\u9078\u64C7\u6B04\u4F4D\uFF1A\u4E0D\u652F\u63F4\u7684\u8868\u793A\u65B9\u6CD5</template>\n            </div>\n          </template>\n          <template ngSwitchWhen=\"table\">\n            <form-control type=\"table\" [metadata]=\"item.metadata\" [(ngModel)]=\"_model[i]\"></form-control>\n          </template>\n          <template ngSwitchDefault>\u4E0D\u652F\u63F4\u7684\u6B04\u4F4D\uFF0C\u8ACB\u806F\u7D61\u7BA1\u7406\u54E1\uFF01</template>\n        </div>\n      </fieldset>\n    </template>\n  </form>\n  <div class=\"card\">\n    <div class=\"card-block\">\n      <h4 class=\"card-title\">\u9664\u932F\u8CC7\u8A0A</h4>\n      <h6 class=\"card-subtitle text-muted\">\u8868\u55AE JSON</h6>\n    </div>\n    <div class=\"card-block\">\n      <pre class=\"card-text\">{{_model | json}}</pre>\n    </div>\n  </div>",
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
                            core_2.forwardRef(function () { return FormControls.SingleOptionsFormControl; }), core_2.forwardRef(function () { return FormControls.SingleOptionsFormControlValueAccessor; }),
                            FormControls.MultiOptionsFormControl, FormControls.MultiOptionsFormControlValueAccessor,
                            FormControls.DropdownOptionsFormControl, FormControls.DropdownOptionsFormControlValueAccessor,
                            FormControls.TableFormControl, FormControls.TableFormControlValueAccessor],
                    }), 
                    __metadata('design:paramtypes', [])
                ], FormFields);
                return FormFields;
            }());
            exports_1("FormFields", FormFields);
            CUSTOM_VALUE_ACCESSOR = lang_1.CONST_EXPR(new core_2.Provider(common_1.NG_VALUE_ACCESSOR, { useExisting: core_2.forwardRef(function () { return FormFieldsValueAccessor; }), multi: true }));
            FormFieldsValueAccessor = (function () {
                function FormFieldsValueAccessor(_host) {
                    this._host = _host;
                    this._onChanged = function (_) { };
                    this._onTouched = function () { };
                }
                FormFieldsValueAccessor.prototype.writeValue = function (value) {
                    this._host.setValue(value);
                };
                FormFieldsValueAccessor.prototype.registerOnChange = function (fn) {
                    this._onChanged = fn;
                };
                FormFieldsValueAccessor.prototype.registerOnTouched = function (fn) {
                    this._onTouched = fn;
                };
                FormFieldsValueAccessor = __decorate([
                    core_2.Directive({
                        selector: 'isms-form-fields',
                        host: {
                            '(control-changed)': '_onChanged($event)',
                            '(control-touched)': '_onTouched()'
                        },
                        providers: [CUSTOM_VALUE_ACCESSOR]
                    }), 
                    __metadata('design:paramtypes', [FormFields])
                ], FormFieldsValueAccessor);
                return FormFieldsValueAccessor;
            }());
            exports_1("FormFieldsValueAccessor", FormFieldsValueAccessor);
        }
    }
});
//# sourceMappingURL=form-fields.js.map
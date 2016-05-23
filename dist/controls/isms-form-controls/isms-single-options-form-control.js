System.register(['angular2/core', 'angular2/common', 'angular2/src/facade/lang', './../../isms-form/form-fields'], function(exports_1, context_1) {
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
    var core_1, core_2, common_1, lang_1, form_fields_1;
    var SingleOptionsFormControl, CUSTOM_VALUE_ACCESSOR, SingleOptionsFormControlValueAccessor, randomString;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (form_fields_1_1) {
                form_fields_1 = form_fields_1_1;
            }],
        execute: function() {
            SingleOptionsFormControl = (function () {
                function SingleOptionsFormControl() {
                    // 推送資料
                    this._changed = new core_1.EventEmitter();
                    // 當焦點離開
                    this._touched = new core_1.EventEmitter();
                    this._uid = randomString(7);
                    console.dir("我是 SingleOptionsFormControl，我的 constructor 被呼叫了呦！");
                }
                SingleOptionsFormControl.prototype.ngOnInit = function () {
                    // console.dir(FormFields)
                };
                // 與 Value Accessor 有關的
                // 從 Value Accessor 接收資料
                SingleOptionsFormControl.prototype.setValue = function (value) {
                    this._dataModel = value;
                };
                SingleOptionsFormControl.prototype.select = function (index) {
                    this._dataModel.selected = this._dataModel.selected.map(function () { return false; });
                    this._dataModel.selected[index] = true;
                    this._changed.emit(this._dataModel);
                };
                __decorate([
                    core_1.Input('metadata'), 
                    __metadata('design:type', Object)
                ], SingleOptionsFormControl.prototype, "_metadata", void 0);
                __decorate([
                    core_1.Output('control-changed'), 
                    __metadata('design:type', Object)
                ], SingleOptionsFormControl.prototype, "_changed", void 0);
                __decorate([
                    core_1.Output('control-touched'), 
                    __metadata('design:type', Object)
                ], SingleOptionsFormControl.prototype, "_touched", void 0);
                SingleOptionsFormControl = __decorate([
                    core_1.Component({
                        selector: 'form-control[type=options][presentation=single]',
                        template: "<template ngFor #item [ngForOf]=\"_metadata.options\" #i=\"index\">\n    <div class=\"radio form-control\">\n      <label>\n        <input [name]=\"_uid\" type=\"radio\" (change)=\"select(i)\" [checked]=\"_dataModel.selected[i]\">\n        {{item.value}}\n      </label>\n      <div *ngIf=\"_dataModel.selected[i]\">\n        <isms-form-fields></isms-form-fields>\n      </div>\n    </div>\n  </template>",
                        directives: [core_2.forwardRef(function () { return form_fields_1.FormFields; }), core_2.forwardRef(function () { return form_fields_1.FormFieldsValueAccessor; })]
                    }), 
                    __metadata('design:paramtypes', [])
                ], SingleOptionsFormControl);
                return SingleOptionsFormControl;
            }());
            exports_1("SingleOptionsFormControl", SingleOptionsFormControl);
            CUSTOM_VALUE_ACCESSOR = lang_1.CONST_EXPR(new core_2.Provider(common_1.NG_VALUE_ACCESSOR, { useExisting: core_2.forwardRef(function () { return SingleOptionsFormControlValueAccessor; }), multi: true }));
            SingleOptionsFormControlValueAccessor = (function () {
                function SingleOptionsFormControlValueAccessor(_host) {
                    this._host = _host;
                    this._onChanged = function (_) { };
                    this._onTouched = function () { };
                    console.dir("我是 SingleOptionsFormControlValueAccessor，我的 constructor 被呼叫了呦！");
                }
                SingleOptionsFormControlValueAccessor.prototype.writeValue = function (value) {
                    this._host.setValue(value);
                };
                SingleOptionsFormControlValueAccessor.prototype.registerOnChange = function (fn) {
                    this._onChanged = fn;
                };
                SingleOptionsFormControlValueAccessor.prototype.registerOnTouched = function (fn) {
                    this._onTouched = fn;
                };
                SingleOptionsFormControlValueAccessor = __decorate([
                    core_2.Directive({
                        selector: 'form-control[type=options][presentation=single]',
                        host: {
                            '(control-changed)': '_onChanged($event)',
                            '(control-touched)': '_onTouched()'
                        },
                        providers: [CUSTOM_VALUE_ACCESSOR]
                    }), 
                    __metadata('design:paramtypes', [SingleOptionsFormControl])
                ], SingleOptionsFormControlValueAccessor);
                return SingleOptionsFormControlValueAccessor;
            }());
            exports_1("SingleOptionsFormControlValueAccessor", SingleOptionsFormControlValueAccessor);
            randomString = function (length) {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                for (var i = 0; i < length; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                return text;
            };
        }
    }
});
//# sourceMappingURL=isms-single-options-form-control.js.map
System.register(['angular2/core', 'angular2/common', 'angular2/src/facade/lang'], function(exports_1, context_1) {
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
    var core_1, core_2, common_1, lang_1;
    var SingleOptionFormControl, CUSTOM_VALUE_ACCESSOR, SingleOptionFormControlValueAccessor;
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
            }],
        execute: function() {
            SingleOptionFormControl = (function () {
                function SingleOptionFormControl() {
                    // 推送資料
                    this._changed = new core_1.EventEmitter();
                    // 當焦點離開
                    this._touched = new core_1.EventEmitter();
                    console.dir("我是 SingleOptionFormControl，我的 constructor 被呼叫了呦！");
                }
                // 與 Value Accessor 有關的
                // 從 Value Accessor 接收資料
                SingleOptionFormControl.prototype.setValue = function (value) {
                    this._dataModel = value;
                };
                __decorate([
                    core_1.Output('control-changed'), 
                    __metadata('design:type', Object)
                ], SingleOptionFormControl.prototype, "_changed", void 0);
                __decorate([
                    core_1.Output('control-touched'), 
                    __metadata('design:type', Object)
                ], SingleOptionFormControl.prototype, "_touched", void 0);
                SingleOptionFormControl = __decorate([
                    core_1.Component({
                        selector: 'form-control[type=options][presentation=single]',
                        template: "\u6211\u662F\u55AE\u9078"
                    }), 
                    __metadata('design:paramtypes', [])
                ], SingleOptionFormControl);
                return SingleOptionFormControl;
            }());
            exports_1("SingleOptionFormControl", SingleOptionFormControl);
            CUSTOM_VALUE_ACCESSOR = lang_1.CONST_EXPR(new core_2.Provider(common_1.NG_VALUE_ACCESSOR, { useExisting: core_2.forwardRef(function () { return SingleOptionFormControlValueAccessor; }), multi: true }));
            SingleOptionFormControlValueAccessor = (function () {
                function SingleOptionFormControlValueAccessor(_host) {
                    this._host = _host;
                    this._onChanged = function (_) { };
                    this._onTouched = function () { };
                    console.dir("我是 SingleOptionFormControlValueAccessor，我的 constructor 被呼叫了呦！");
                }
                SingleOptionFormControlValueAccessor.prototype.writeValue = function (value) {
                    this._host.setValue(value);
                };
                SingleOptionFormControlValueAccessor.prototype.registerOnChange = function (fn) {
                    this._onChanged = fn;
                };
                SingleOptionFormControlValueAccessor.prototype.registerOnTouched = function (fn) {
                    this._onTouched = fn;
                };
                SingleOptionFormControlValueAccessor = __decorate([
                    core_2.Directive({
                        selector: 'form-control[type=options][presentation=single]',
                        host: {
                            '(control-changed)': '_onChanged($event)',
                            '(control-touched)': '_onTouched()'
                        },
                        providers: [CUSTOM_VALUE_ACCESSOR]
                    }), 
                    __metadata('design:paramtypes', [SingleOptionFormControl])
                ], SingleOptionFormControlValueAccessor);
                return SingleOptionFormControlValueAccessor;
            }());
            exports_1("SingleOptionFormControlValueAccessor", SingleOptionFormControlValueAccessor);
        }
    }
});
//# sourceMappingURL=isms-single-option-form-control.js.map
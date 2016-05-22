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
    var DropdownOptionsFormControl, CUSTOM_VALUE_ACCESSOR, DropdownOptionsFormControlValueAccessor;
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
            DropdownOptionsFormControl = (function () {
                function DropdownOptionsFormControl() {
                    // 推送資料
                    this._changed = new core_1.EventEmitter();
                    // 當焦點離開
                    this._touched = new core_1.EventEmitter();
                    console.dir("我是 DropdownOptionsFormControl，我的 constructor 被呼叫了呦！");
                }
                // 與 Value Accessor 有關的
                // 從 Value Accessor 接收資料
                DropdownOptionsFormControl.prototype.setValue = function (value) {
                    this._dataModel = value;
                };
                __decorate([
                    core_1.Input('metadata'), 
                    __metadata('design:type', Object)
                ], DropdownOptionsFormControl.prototype, "_metadata", void 0);
                __decorate([
                    core_1.Output('control-changed'), 
                    __metadata('design:type', Object)
                ], DropdownOptionsFormControl.prototype, "_changed", void 0);
                __decorate([
                    core_1.Output('control-touched'), 
                    __metadata('design:type', Object)
                ], DropdownOptionsFormControl.prototype, "_touched", void 0);
                DropdownOptionsFormControl = __decorate([
                    core_1.Component({
                        selector: 'form-control[type=options][presentation=dropdown]',
                        template: "\u6211\u662F\u4E0B\u62C9\u5F0F"
                    }), 
                    __metadata('design:paramtypes', [])
                ], DropdownOptionsFormControl);
                return DropdownOptionsFormControl;
            }());
            exports_1("DropdownOptionsFormControl", DropdownOptionsFormControl);
            CUSTOM_VALUE_ACCESSOR = lang_1.CONST_EXPR(new core_2.Provider(common_1.NG_VALUE_ACCESSOR, { useExisting: core_2.forwardRef(function () { return DropdownOptionsFormControlValueAccessor; }), multi: true }));
            DropdownOptionsFormControlValueAccessor = (function () {
                function DropdownOptionsFormControlValueAccessor(_host) {
                    this._host = _host;
                    this._onChanged = function (_) { };
                    this._onTouched = function () { };
                    console.dir("我是 DropdownOptionsFormControlValueAccessor，我的 constructor 被呼叫了呦！");
                }
                DropdownOptionsFormControlValueAccessor.prototype.writeValue = function (value) {
                    this._host.setValue(value);
                };
                DropdownOptionsFormControlValueAccessor.prototype.registerOnChange = function (fn) {
                    this._onChanged = fn;
                };
                DropdownOptionsFormControlValueAccessor.prototype.registerOnTouched = function (fn) {
                    this._onTouched = fn;
                };
                DropdownOptionsFormControlValueAccessor = __decorate([
                    core_2.Directive({
                        selector: 'form-control[type=options][presentation=dropdown]',
                        host: {
                            '(control-changed)': '_onChanged($event)',
                            '(control-touched)': '_onTouched()'
                        },
                        providers: [CUSTOM_VALUE_ACCESSOR]
                    }), 
                    __metadata('design:paramtypes', [DropdownOptionsFormControl])
                ], DropdownOptionsFormControlValueAccessor);
                return DropdownOptionsFormControlValueAccessor;
            }());
            exports_1("DropdownOptionsFormControlValueAccessor", DropdownOptionsFormControlValueAccessor);
        }
    }
});
//# sourceMappingURL=isms-dropdown-options-form-control.js.map
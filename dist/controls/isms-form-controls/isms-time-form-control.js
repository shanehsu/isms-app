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
    var TimeFormControl, CUSTOM_VALUE_ACCESSOR, TimeFormControlValueAccessor;
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
            TimeFormControl = (function () {
                function TimeFormControl() {
                    // 推送資料
                    this._changed = new core_1.EventEmitter();
                    // 當焦點離開
                    this._touched = new core_1.EventEmitter();
                    console.dir("我是 TimeFormControl，我的 constructor 被呼叫了呦！");
                    this._editing = false;
                }
                // 與 Value Accessor 有關的
                // 從 Value Accessor 接收資料
                TimeFormControl.prototype.setValue = function (value) {
                    this._dataModel = value;
                };
                TimeFormControl.prototype.edit = function () {
                    // 進入編輯模式
                    this._editing = true;
                };
                TimeFormControl.prototype.doneEdit = function () {
                    this._editing = false;
                };
                TimeFormControl.prototype.validate = function (hour, minute) {
                    // 檢查是否有任何一個是非數字
                    if (!(hour.valueAsNumber >= 0 && hour.valueAsNumber <= 23)) {
                        hour.value = "0";
                    }
                    if (!(minute.valueAsNumber >= 0 && minute.valueAsNumber <= 59)) {
                        minute.value = "0";
                    }
                    this._changed.emit(this._dataModel);
                };
                __decorate([
                    core_1.Output('control-changed'), 
                    __metadata('design:type', Object)
                ], TimeFormControl.prototype, "_changed", void 0);
                __decorate([
                    core_1.Output('control-touched'), 
                    __metadata('design:type', Object)
                ], TimeFormControl.prototype, "_touched", void 0);
                TimeFormControl = __decorate([
                    core_1.Component({
                        selector: 'form-control[type=time]',
                        template: "<p *ngIf=\"!_editing\" class=\"form-control-static\" style=\"color: #0275d8;\" (click)=\"edit()\">{{_dataModel.hour + ' \u6642 ' + _dataModel.minute + ' \u5206'}}</p>\n  <div class=\"form-inline\" *ngIf=\"_editing\">\n    <input type=\"number\" class=\"form-control\" style=\"width: 4em; text-align: center;\" [(ngModel)]=\"_dataModel.hour\" min=\"0\" max=\"23\" (blur)=\"_touched.emit()\" (change)=\"validate(hour, minute)\" #hour>\n    <label>\u6642</label>\n    <input type=\"number\" class=\"form-control\" style=\"width: 4em; text-align: center;\" [(ngModel)]=\"_dataModel.minute\" min=\"0\" max=\"59\" (blur)=\"_touched.emit()\" (change)=\"validate(hour, minute)\" #minute>\n    <label>\u5206</label>\n    <p class=\"form-control-static\" style=\"color: #0275d8;\" (click)=\"doneEdit()\">\u5B8C\u6210</p>\n  </div>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], TimeFormControl);
                return TimeFormControl;
            }());
            exports_1("TimeFormControl", TimeFormControl);
            CUSTOM_VALUE_ACCESSOR = lang_1.CONST_EXPR(new core_2.Provider(common_1.NG_VALUE_ACCESSOR, { useExisting: core_2.forwardRef(function () { return TimeFormControlValueAccessor; }), multi: true }));
            TimeFormControlValueAccessor = (function () {
                function TimeFormControlValueAccessor(_host) {
                    this._host = _host;
                    this._onChanged = function (_) { };
                    this._onTouched = function () { };
                    console.dir("我是 TimeFormControlValueAccessor，我的 constructor 被呼叫了呦！");
                }
                TimeFormControlValueAccessor.prototype.writeValue = function (value) {
                    this._host.setValue(value);
                };
                TimeFormControlValueAccessor.prototype.registerOnChange = function (fn) {
                    this._onChanged = fn;
                };
                TimeFormControlValueAccessor.prototype.registerOnTouched = function (fn) {
                    this._onTouched = fn;
                };
                TimeFormControlValueAccessor = __decorate([
                    core_2.Directive({
                        selector: 'form-control[type=time]',
                        host: {
                            '(control-changed)': '_onChanged($event)',
                            '(control-touched)': '_onTouched()'
                        },
                        providers: [CUSTOM_VALUE_ACCESSOR]
                    }), 
                    __metadata('design:paramtypes', [TimeFormControl])
                ], TimeFormControlValueAccessor);
                return TimeFormControlValueAccessor;
            }());
            exports_1("TimeFormControlValueAccessor", TimeFormControlValueAccessor);
        }
    }
});
//# sourceMappingURL=isms-time-form-control.js.map
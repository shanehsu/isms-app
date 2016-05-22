System.register(['angular2/core', 'angular2/common', 'angular2/src/facade/lang', './../../pipes/pipes'], function(exports_1, context_1) {
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
    var core_1, core_2, common_1, lang_1, pipes_1;
    var DateFormControl, CUSTOM_VALUE_ACCESSOR, DateFormControlValueAccessor;
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
            function (pipes_1_1) {
                pipes_1 = pipes_1_1;
            }],
        execute: function() {
            DateFormControl = (function () {
                function DateFormControl() {
                    // 推送資料
                    this._changed = new core_1.EventEmitter();
                    // 當焦點離開
                    this._touched = new core_1.EventEmitter();
                    this._editing = false;
                    console.dir("我是 DateFormControl，我的 constructor 被呼叫了呦！");
                }
                // 與 Value Accessor 有關的
                // 從 Value Accessor 接收資料
                DateFormControl.prototype.setValue = function (value) {
                    if (value) {
                        this._year = value.getFullYear();
                        this._month = value.getMonth() + 1;
                        this._day = value.getDate();
                    }
                    this._dataModel = value;
                };
                // 與 View 有關
                DateFormControl.prototype.edit = function () {
                    // 進入編輯模式
                    this._editing = true;
                };
                DateFormControl.prototype.doneEdit = function () {
                    this._editing = false;
                };
                DateFormControl.prototype.days = function (year, month) {
                    return new Date(year, month, 0).getDate();
                };
                DateFormControl.prototype.validate = function (yearInput, monthInput, dayInput) {
                    // 檢查是否有任何一個是非數字
                    if (!(yearInput.valueAsNumber >= 1900 && yearInput.valueAsNumber <= 2999)) {
                        yearInput.value = new Date().getFullYear().toString();
                    }
                    if (!(monthInput.valueAsNumber >= 1 && monthInput.valueAsNumber <= 12)) {
                        monthInput.value = "1";
                    }
                    if (!(dayInput.valueAsNumber >= 1 && dayInput.valueAsNumber <= this.days(yearInput.valueAsNumber, monthInput.valueAsNumber))) {
                        dayInput.value = this.days(yearInput.valueAsNumber, monthInput.valueAsNumber).toString();
                    }
                    this._dataModel = new Date(yearInput.valueAsNumber, monthInput.valueAsNumber - 1, dayInput.valueAsNumber);
                    this._changed.emit(this._dataModel);
                };
                __decorate([
                    core_1.Output('control-changed'), 
                    __metadata('design:type', Object)
                ], DateFormControl.prototype, "_changed", void 0);
                __decorate([
                    core_1.Output('control-touched'), 
                    __metadata('design:type', Object)
                ], DateFormControl.prototype, "_touched", void 0);
                DateFormControl = __decorate([
                    core_1.Component({
                        selector: 'form-control[type=date]',
                        pipes: [pipes_1.ChineseDatePipe],
                        template: "<p *ngIf=\"!_editing\" class=\"form-control-static\" style=\"color: #0275d8;\" (click)=\"edit()\">{{_dataModel | chineseDate}}</p>\n  <div class=\"form-inline\" *ngIf=\"_editing\">\n    <input type=\"number\" class=\"form-control\" style=\"width: 6em; text-align: center;\" [(ngModel)]=\"_year\" min=\"1900\" max=\"2999\" (blur)=\"_touched.emit()\" (change)=\"validate(year, month, day)\" #year>\n    <label>\u5E74</label>\n    <input type=\"number\" class=\"form-control\" style=\"width: 4em; text-align: center;\" [(ngModel)]=\"_month\" min=\"1\" max=\"12\" (blur)=\"_touched.emit()\" (change)=\"validate(year, month, day)\" #month>\n    <label>\u6708</label>\n    <input type=\"number\" class=\"form-control\" style=\"width: 4em; text-align: center;\" [(ngModel)]=\"_day\" min=\"1\" [max]=\"days(year.value, month.value)\" (blur)=\"_touched.emit()\" (change)=\"validate(year, month, day)\" #day>\n    <label>\u65E5</label>\n    <p class=\"form-control-static\" style=\"color: #0275d8;\" (click)=\"doneEdit()\">\u5B8C\u6210</p>\n  </div>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], DateFormControl);
                return DateFormControl;
            }());
            exports_1("DateFormControl", DateFormControl);
            CUSTOM_VALUE_ACCESSOR = lang_1.CONST_EXPR(new core_2.Provider(common_1.NG_VALUE_ACCESSOR, { useExisting: core_2.forwardRef(function () { return DateFormControlValueAccessor; }), multi: true }));
            DateFormControlValueAccessor = (function () {
                function DateFormControlValueAccessor(_host) {
                    this._host = _host;
                    this._onChanged = function (_) { };
                    this._onTouched = function () { };
                    console.dir("我是 DateFormControlValueAccessor，我的 constructor 被呼叫了呦！");
                }
                DateFormControlValueAccessor.prototype.writeValue = function (value) {
                    this._host.setValue(value);
                };
                DateFormControlValueAccessor.prototype.registerOnChange = function (fn) {
                    this._onChanged = fn;
                };
                DateFormControlValueAccessor.prototype.registerOnTouched = function (fn) {
                    this._onTouched = fn;
                };
                DateFormControlValueAccessor = __decorate([
                    core_2.Directive({
                        selector: 'form-control[type=date]',
                        host: {
                            '(control-changed)': '_onChanged($event)',
                            '(control-touched)': '_onTouched()'
                        },
                        providers: [CUSTOM_VALUE_ACCESSOR]
                    }), 
                    __metadata('design:paramtypes', [DateFormControl])
                ], DateFormControlValueAccessor);
                return DateFormControlValueAccessor;
            }());
            exports_1("DateFormControlValueAccessor", DateFormControlValueAccessor);
        }
    }
});
//# sourceMappingURL=isms-date-form-control.js.map
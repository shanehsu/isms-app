System.register(['angular2/core', 'angular2/common'], function(exports_1, context_1) {
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
    var core_1, common_1;
    var DatePicker;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            DatePicker = (function () {
                function DatePicker(_elementRef, _control) {
                    this._elementRef = _elementRef;
                    this._control = _control;
                    this.ngModelChange = new core_1.EventEmitter();
                }
                DatePicker.prototype.updateDate = function (text) {
                    if (text.split('-').length == 3 &&
                        text.split('-').map(this.isNumericString).reduce(function (accu, curr) { return accu && curr; }, true)) {
                        var newDate = new Date();
                        newDate.setFullYear(+text.split('-')[0], +text.split('-')[1] - 1, +text.split('-')[2]);
                        console.log(newDate);
                        this._onChange();
                        this.ngModelChange.emit(newDate);
                    }
                };
                DatePicker.prototype.isNumericString = function (str) {
                    if (str.length == 0)
                        return false;
                    var result = true;
                    for (var index = 0; index < str.length; ++index) {
                        if (!(str.charCodeAt(index) >= '0'.charCodeAt(0) && str.charCodeAt(index) <= '9'.charCodeAt(0))) {
                            result = false;
                        }
                    }
                    return result;
                };
                DatePicker.prototype.touch = function () {
                    this._onTouch();
                };
                DatePicker.prototype.writeValue = function (value) {
                    console.log('writeValue');
                    if (value) {
                        this._dateAsText = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();
                        this._chineseDate = value.getFullYear() + ' 年 ' + (value.getMonth() + 1) + ' 月 ' + value.getDate() + ' 日';
                    }
                };
                DatePicker.prototype.registerOnChange = function (fn) {
                    this._onChange = fn;
                };
                DatePicker.prototype.registerOnTouched = function (fn) {
                    this._onTouch = fn;
                };
                DatePicker.prototype.ngOnInit = function () {
                    this._isRequired = false;
                    if (this._elementRef.nativeElement.attributes.getNamedItem('required')) {
                        this._isRequired = true;
                    }
                    this._control.valueAccessor = this;
                    this._dateAsText = this.ngModel.getFullYear() + '-' + +(this.ngModel.getMonth() + 1) + '-' + +this.ngModel.getDate();
                    this._chineseDate = this.ngModel.getFullYear() + ' 年 ' + (this.ngModel.getMonth() + 1) + ' 月 ' + this.ngModel.getDate() + ' 日';
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Date)
                ], DatePicker.prototype, "ngModel", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], DatePicker.prototype, "ngModelChange", void 0);
                DatePicker = __decorate([
                    core_1.Component({
                        selector: 'datepicker',
                        templateUrl: 'app/controls/datepicker/datepicker.template.html',
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, common_1.NgControl])
                ], DatePicker);
                return DatePicker;
            }());
            exports_1("DatePicker", DatePicker);
        }
    }
});
//# sourceMappingURL=datepicker.component.js.map
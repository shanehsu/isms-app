System.register(['angular2/core', 'angular2/common', 'angular2/src/facade/lang', './field-option.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, lang_1, field_option_component_1;
    var CUSTOM_VALUE_ACCESSOR, FieldOptionValueAccessor;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (field_option_component_1_1) {
                field_option_component_1 = field_option_component_1_1;
            }],
        execute: function() {
            CUSTOM_VALUE_ACCESSOR = lang_1.CONST_EXPR(new core_1.Provider(common_1.NG_VALUE_ACCESSOR, { useExisting: core_1.forwardRef(function () { return FieldOptionValueAccessor; }), multi: true }));
            FieldOptionValueAccessor = (function () {
                function FieldOptionValueAccessor(_host) {
                    this._host = _host;
                    this._onChanged = function (_) { };
                    this._onTouched = function () { };
                }
                FieldOptionValueAccessor.prototype.writeValue = function (value) {
                    this._host.setValue(value);
                };
                FieldOptionValueAccessor.prototype.registerOnChange = function (fn) {
                    this._onChanged = fn;
                };
                FieldOptionValueAccessor.prototype.registerOnTouched = function (fn) {
                    this._onTouched = fn;
                };
                FieldOptionValueAccessor = __decorate([
                    core_1.Directive({
                        selector: 'field-option',
                        host: {
                            '(metadata-changed)': '_onChanged($event)',
                            '(control-touched)': '_onTouched()'
                        },
                        providers: [CUSTOM_VALUE_ACCESSOR]
                    }), 
                    __metadata('design:paramtypes', [field_option_component_1.FieldOptionComponent])
                ], FieldOptionValueAccessor);
                return FieldOptionValueAccessor;
            })();
            exports_1("FieldOptionValueAccessor", FieldOptionValueAccessor);
        }
    }
});
//# sourceMappingURL=field-option-value-accessor.directive.js.map
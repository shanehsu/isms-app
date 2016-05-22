System.register(['angular2/core', './../../../../../controls/editable-text-input/editable-text-input.component', './../../../../../controls/editable-text-input/editable-text-input-value-accessor.directive', './../../fields-form/fields-form.component'], function(exports_1, context_1) {
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
    var core_1, editable_text_input_component_1, editable_text_input_value_accessor_directive_1, fields_form_component_1;
    var FieldOptionComponent, randomString;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (editable_text_input_component_1_1) {
                editable_text_input_component_1 = editable_text_input_component_1_1;
            },
            function (editable_text_input_value_accessor_directive_1_1) {
                editable_text_input_value_accessor_directive_1 = editable_text_input_value_accessor_directive_1_1;
            },
            function (fields_form_component_1_1) {
                fields_form_component_1 = fields_form_component_1_1;
            }],
        execute: function() {
            FieldOptionComponent = (function () {
                function FieldOptionComponent(_dcl, _injector, elementRef, _changeDetectorRef) {
                    this._dcl = _dcl;
                    this._injector = _injector;
                    this.elementRef = elementRef;
                    this._changeDetectorRef = _changeDetectorRef;
                    this._metadataChanged = new core_1.EventEmitter();
                    this._controlTouched = new core_1.EventEmitter();
                    this._uid = randomString(5);
                }
                FieldOptionComponent.prototype.setValue = function (value) {
                    // console.log("在 FieldOption 裡，setValue 被呼叫了！value 的值：")
                    // console.dir(value)
                    var _this = this;
                    this._metadata = value;
                    if (this._fieldType == 'options' && this._metadata) {
                        if (!this._metadata.options) {
                            this._metadata.options = [];
                        }
                        var _loop_1 = function(index) {
                            this_1._dcl.loadAsRoot(fields_form_component_1.FieldsFormComponent, '#field-' + this_1._uid + '-' + index, this_1._injector).then(function (componentRef) {
                                var instance = componentRef.instance;
                                instance.setValue(_this._metadata.options[index].fields);
                                instance.setMode('inline');
                            });
                        };
                        var this_1 = this;
                        for (var index = 0; index < this._metadata.options.length; ++index) {
                            _loop_1(index);
                        }
                    }
                    if (this._fieldType == 'table' && this._metadata) {
                        if (!this._metadata.fields) {
                            this._metadata.fields = [];
                        }
                        this._dcl.loadAsRoot(fields_form_component_1.FieldsFormComponent, '#field-' + this._uid, this._injector).then(function (componentRef) {
                            var instance = componentRef.instance;
                            instance.setValue(_this._metadata.fields);
                            instance.setMode('inline');
                        });
                    }
                };
                FieldOptionComponent.prototype.pull_option = function (index) {
                    this._metadata.options.splice(index, 1);
                    this._changeDetectorRef.detectChanges();
                    this.changed();
                };
                FieldOptionComponent.prototype.push_option = function (option, optionControl) {
                    var _this = this;
                    if (!this._metadata.options) {
                        this._metadata.options = [];
                    }
                    if (option != "")
                        (this._metadata.options).push({
                            value: option,
                            fields: []
                        });
                    optionControl.value = '';
                    this.changed();
                    this._changeDetectorRef.detectChanges();
                    // Dynamic Component Loader
                    // 必須等待一段時間之後，DOM 更新，div 出現，才能進行 Loading
                    setTimeout(function () {
                        var index = _this._metadata.options.length - 1;
                        _this._dcl.loadAsRoot(fields_form_component_1.FieldsFormComponent, '#field-' + _this._uid + '-' + index, _this._injector).then(function (componentRef) {
                            var instance = componentRef.instance;
                            instance.setValue(_this._metadata.options[index].fields);
                            instance.setMode('inline');
                        });
                    }, 250);
                };
                FieldOptionComponent.prototype.changed = function () {
                    this._metadataChanged.emit(this._metadata);
                };
                FieldOptionComponent.prototype.touched = function () {
                    this._controlTouched.emit(null);
                };
                FieldOptionComponent.prototype.ngOnInit = function () { };
                FieldOptionComponent.prototype.log = function (value) {
                    console.dir(value);
                };
                __decorate([
                    core_1.Input('field-type'), 
                    __metadata('design:type', String)
                ], FieldOptionComponent.prototype, "_fieldType", void 0);
                __decorate([
                    core_1.Output('metadata-changed'), 
                    __metadata('design:type', Object)
                ], FieldOptionComponent.prototype, "_metadataChanged", void 0);
                __decorate([
                    core_1.Output('control-touched'), 
                    __metadata('design:type', Object)
                ], FieldOptionComponent.prototype, "_controlTouched", void 0);
                FieldOptionComponent = __decorate([
                    core_1.Component({
                        selector: 'field-option',
                        templateUrl: '/app/admin/form-admin/form-detail/field-form/field-option/field-option.template.html',
                        directives: [editable_text_input_component_1.EditableTextInputComponent, editable_text_input_value_accessor_directive_1.EditableTextInputValueAccessor]
                    }), 
                    __metadata('design:paramtypes', [core_1.DynamicComponentLoader, core_1.Injector, core_1.ElementRef, core_1.ChangeDetectorRef])
                ], FieldOptionComponent);
                return FieldOptionComponent;
            }());
            exports_1("FieldOptionComponent", FieldOptionComponent);
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
//# sourceMappingURL=field-option.component.js.map
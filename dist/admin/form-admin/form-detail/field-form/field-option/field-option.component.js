System.register(['angular2/core', './../../../../../controls/editable-text-input/editable-text-input.component', './../../../../../controls/editable-text-input/editable-text-input-value-accessor.directive'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, editable_text_input_component_1, editable_text_input_value_accessor_directive_1;
    var FieldOptionComponent;
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
            }],
        execute: function() {
            FieldOptionComponent = (function () {
                function FieldOptionComponent() {
                    this._metadataChanged = new core_1.EventEmitter();
                    this._controlTouched = new core_1.EventEmitter();
                }
                FieldOptionComponent.prototype.setValue = function (value) {
                    this._metadata = value;
                };
                FieldOptionComponent.prototype.pull_option = function (index) {
                    this._metadata.options = this._metadata.options.filter(function (value, i) {
                        return index != i;
                    });
                    this.changed();
                };
                FieldOptionComponent.prototype.edit_option = function (index) {
                    console.log('will edit option');
                };
                FieldOptionComponent.prototype.push_option = function (option, optionControl) {
                    if (!this._metadata.options) {
                        this._metadata.options = [];
                    }
                    if (option != "")
                        this._metadata.options.push(option);
                    optionControl.value = '';
                    this.changed();
                };
                FieldOptionComponent.prototype.changed = function () {
                    this._metadataChanged.emit(this._metadata);
                };
                FieldOptionComponent.prototype.touched = function () {
                    this._controlTouched.emit(null);
                };
                FieldOptionComponent.prototype.ngOnInit = function () {
                };
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
                    __metadata('design:paramtypes', [])
                ], FieldOptionComponent);
                return FieldOptionComponent;
            })();
            exports_1("FieldOptionComponent", FieldOptionComponent);
        }
    }
});
//# sourceMappingURL=field-option.component.js.map
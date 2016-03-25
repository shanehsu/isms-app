System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var EditableTextInputComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            EditableTextInputComponent = (function () {
                function EditableTextInputComponent() {
                    this._editing = false;
                    this._changed = new core_1.EventEmitter();
                    this._touched = new core_1.EventEmitter();
                    this._editingWillEnd = new core_1.EventEmitter();
                }
                // 與 Value Accessor 有關的
                EditableTextInputComponent.prototype.setValue = function (value) {
                    this._model = value;
                };
                // 與 View 有關的
                EditableTextInputComponent.prototype.modelChange = function (value) {
                    console.log('model change');
                    this._model = value;
                    this._changed.emit(value);
                };
                EditableTextInputComponent.prototype.keydown = function (event) {
                    if (event.key === "Enter" || event.keyCode === 13 || event.which === 123) {
                        console.log('Enter pressed');
                        this._editingWillEnd.emit(this._model);
                        this._editing = false;
                        event.preventDefault();
                    }
                };
                EditableTextInputComponent.prototype.touched = function () {
                    this._touched.emit(null);
                };
                EditableTextInputComponent.prototype.startEditing = function () {
                    this._editing = true;
                };
                __decorate([
                    core_1.Output('control-changed'), 
                    __metadata('design:type', Object)
                ], EditableTextInputComponent.prototype, "_changed", void 0);
                __decorate([
                    core_1.Output('control-touched'), 
                    __metadata('design:type', Object)
                ], EditableTextInputComponent.prototype, "_touched", void 0);
                __decorate([
                    core_1.Output('editing-will-end'), 
                    __metadata('design:type', Object)
                ], EditableTextInputComponent.prototype, "_editingWillEnd", void 0);
                EditableTextInputComponent = __decorate([
                    core_1.Component({
                        selector: 'input-text-editable',
                        template: "\n  <span [ngSwitch]=\"_editing\">\n    <template [ngSwitchWhen]=\"true\">\n      <input type=\"text\" class=\"form-control\" [ngModel]=\"_model\" (ngModelChange)=\"modelChange($event)\"\n             (keydown)=\"keydown($event)\" (blur)=\"touched()\">\n    </template>\n    \n    <template [ngSwitchWhen]=\"false\">\n      <a (click)=\"startEditing()\">{{_model}}</a>\n    </template>\n    \n    <template ngSwitchDefault>EditableTextInputComponent\uFF1A\u672A\u77E5\u7684\u7DE8\u8F2F\u72C0\u614B</template>\n  </span>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], EditableTextInputComponent);
                return EditableTextInputComponent;
            })();
            exports_1("EditableTextInputComponent", EditableTextInputComponent);
        }
    }
});
//# sourceMappingURL=editable-text-input.component.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
const core_1 = require('@angular/core');
const forms_1 = require('@angular/forms');
let EditableTextInput = class EditableTextInput {
    // 建構子
    constructor(model) {
        this.model = model;
        this.label = "";
        this.text = "";
        this.isEditing = false;
        model.valueAccessor = this;
    }
    emitValue() {
        this.change(this.text);
    }
    // ControlValueAccessor - 註冊函數
    registerOnChange(fn) {
        this.change = fn;
    }
    registerOnTouched(fn) {
        this.touched = fn;
    }
    keypress(event) {
        if (event.which == 13) {
            this.isEditing = false;
            return false;
        }
        else {
            return true;
        }
    }
    writeValue(value) {
        this.text = value;
    }
};
__decorate([
    core_1.Input('label'), 
    __metadata('design:type', String)
], EditableTextInput.prototype, "label", void 0);
EditableTextInput = __decorate([
    core_1.Component({
        selector: 'text-input[editable]',
        template: `
  <form class="ui form">
    <div class="field">
      <label (click)="isEditing = !isEditing;">{{label}}</label>
      <p [style.display]="isEditing ? 'none' : undefined" (click)="isEditing = true;">{{text}}</p>
      <input [style.display]="isEditing ? undefined : 'none'" type="text" (keypress)="keypress($event)" [(ngModel)]="text" name="value" (keyup)="emitValue()" />
    </div>
  </form>
  `
    }),
    __param(0, core_1.Self()), 
    __metadata('design:paramtypes', [forms_1.NgModel])
], EditableTextInput);
exports.EditableTextInput = EditableTextInput;
//# sourceMappingURL=editable-text-input.component.js.map
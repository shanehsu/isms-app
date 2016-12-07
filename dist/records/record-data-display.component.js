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
let RecordDataDisplay = class RecordDataDisplay {
    constructor(model) {
        this.model = model;
        model.valueAccessor = this;
        this.value = undefined;
    }
    writeValue(value) {
        this.value = value;
    }
    // ControlValueAccessor - 註冊函數
    registerOnChange(fn) {
        this.change = fn;
    }
    registerOnTouched(fn) {
        this.touched = fn;
    }
};
RecordDataDisplay = __decorate([
    core_1.Component({
        selector: 'record-data-display',
        template: `
  <div *ngIf="value && value.selectedValues">
    <div *ngFor="let selectedValue of value.selectedValues; let i = index;">
      <p>{{selectedValue}}</p>
      <div class="sub-fields">
        <div *ngFor="let nestedValue of value.nestedValues[i]; let j = index;">
          {{nestedValue.title}}
          <record-data-display [(ngModel)]="value.nestedValues[i][j].value"></record-data-display>
        </div>
      </div>
    </div>
  </div>
  <div *ngIf="value && value.titles">
    <table class="ui compact basic table">
      <thead>
        <tr>
          <td *ngFor="let title of value.titles">{{title}}</td>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let _ of value.values; let i = index;">
          <td *ngFor="let _ of value.values[i]; let j = index;">
            <record-data-display [(ngModel)]="value.values[i][j]"></record-data-display>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <p *ngIf="value && !value.titles && !value.selectedValues">{{value}}</p>
  `,
        styles: [
            'div.sub-fields { padding-left: 1em; }'
        ]
    }),
    __param(0, core_1.Self()), 
    __metadata('design:paramtypes', [forms_1.NgModel])
], RecordDataDisplay);
exports.RecordDataDisplay = RecordDataDisplay;
//# sourceMappingURL=record-data-display.component.js.map
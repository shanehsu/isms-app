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
const core_2 = require('@angular/core');
const forms_1 = require('@angular/forms');
let FieldsComponent = class FieldsComponent {
    constructor(cd) {
        this._onChanged = (_) => { };
        this._onTouched = () => { };
        this._nested = false;
        this.cd = cd;
        cd.valueAccessor = this;
    }
    ngOnInit() {
    }
    // 與 Value Accessor 有關的
    // 從 Value Accessor 接收資料
    writeValue(value) {
        this._model = value;
    }
    registerOnChange(fn) {
        this._onChanged = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
};
__decorate([
    core_1.Input("fields"), 
    __metadata('design:type', Array)
], FieldsComponent.prototype, "_fields", void 0);
__decorate([
    core_1.Input("nested"), 
    __metadata('design:type', Boolean)
], FieldsComponent.prototype, "_nested", void 0);
FieldsComponent = __decorate([
    core_1.Component({
        selector: 'form-fields',
        template: `
  <template [ngIf]="_model">
  <template ngFor let-item [ngForOf]="_fields" let-i="index">
      <template [ngIf]="item.type == 'shortText'">
        <div class="field">
          <label>{{item.name}}</label>
          <form-control type="text" row="single" [(ngModel)]="_model[i]"></form-control>
        </div>
      </template>
      
      <template [ngIf]="item.type == 'longText'">
        <div class="field">
          <label>{{item.name}}</label>
          <form-control type="text" row="multi" [(ngModel)]="_model[i]"></form-control>
        </div>
      </template>
      
      <template [ngIf]="item.type == 'date'">
        <div class="field">
          <label>{{item.name}}</label>
          <form-control type="date" [(ngModel)]="_model[i]"></form-control>
        </div>
      </template>
      
      <template [ngIf]="item.type == 'time'">
        <div class="field">
          <label>{{item.name}}</label>
          <form-control type="time" [(ngModel)]="_model[i]"></form-control>
        </div>
      </template>
      
      <template [ngIf]="item.type == 'options'">
        <template [ngIf]="item.metadata.presentation == 'radio'">
          <div class="field">
            <label>{{item.name}}</label>
            <form-control type="options" presentation="single" [metadata]="item.metadata" [(ngModel)]="_model[i]"></form-control>
          </div>
        </template>
        <template [ngIf]="item.metadata.presentation == 'checkbox'">
          <div class="field">
            <label>{{item.name}}</label>
            <form-control type="options" presentation="multi" [metadata]="item.metadata" [(ngModel)]="_model[i]"></form-control>
          </div>
        </template>
        <template [ngIf]="item.metadata.presentation == 'select'">
          <div class="field">
            <label>{{item.name}}</label>
            <form-control type="options" presentation="dropdown" [metadata]="item.metadata" [(ngModel)]="_model[i]"></form-control>
          </div>
        </template>
      </template>
      
      <template [ngIf]="item.type == 'table'">
        <div class="field">
          <label>{{item.name}}</label>
          <form-control type="table" [metadata]="item.metadata" [(ngModel)]="_model[i]"></form-control>
        </div>
      </template>
  </template></template>`
    }),
    __param(0, core_2.Self()), 
    __metadata('design:paramtypes', [forms_1.NgModel])
], FieldsComponent);
exports.FieldsComponent = FieldsComponent;
//# sourceMappingURL=fields.component.js.map
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
// Angular 2
const core_1 = require('@angular/core');
const core_2 = require('@angular/core');
const forms_1 = require('@angular/forms');
const record_service_1 = require('./../../services/record.service');
// THIS WILL NOT EMIT VALUE BY DEFAULT, NEED TO BIND TO (change) EVENT!
let TableFormControl = class TableFormControl {
    constructor(cd, recordService) {
        this.recordService = recordService;
        this._onChanged = (_) => { };
        this._onTouched = () => { };
        this.cd = cd;
        cd.valueAccessor = this;
    }
    // 與 Value Accessor 有關的
    // 從 Value Accessor 接收資料
    writeValue(value) {
        this._dataModel = value;
    }
    registerOnChange(fn) {
        this._onChanged = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    new() {
        this._dataModel.push(this.recordService.emptyRecordForFields(this._metadata.fields));
    }
};
__decorate([
    core_1.Input('metadata'), 
    __metadata('design:type', Object)
], TableFormControl.prototype, "_metadata", void 0);
TableFormControl = __decorate([
    core_1.Component({
        selector: 'form-control[type=table]',
        template: `
  <table class="ui celled striped table">
    <thead>
      <tr>
        <th style="width: 3em; text-align: right;">#</th>
        <th *ngFor="let item of _metadata.fields">{{item.name}}</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let record of _dataModel; let recordIndex = index">
        <td style="text-align: right;">{{recordIndex + 1}}</td>
        <td *ngFor="let item of _metadata.fields; let fieldIndex = index">
          <template [ngIf]="item.type == 'shortText'">
            <div class="field">
              <form-control type="text" row="single" [(ngModel)]="_dataModel[recordIndex][fieldIndex]"></form-control>
            </div>
          </template>
          
          <template [ngIf]="item.type == 'longText'">
            <div class="field">
              <form-control type="text" row="multi" [(ngModel)]="_dataModel[recordIndex][fieldIndex]"></form-control>
            </div>
          </template>
          
          <template [ngIf]="item.type == 'date'">
            <div class="field">
              <form-control type="date" [(ngModel)]="_dataModel[recordIndex][fieldIndex]"></form-control>
            </div>
          </template>
          
          <template [ngIf]="item.type == 'time'">
            <div class="field">
              <form-control type="time" [(ngModel)]="_dataModel[recordIndex][fieldIndex]"></form-control>
            </div>
          </template>
          
          <template [ngIf]="item.type == 'options'">
            <template [ngIf]="item.metadata.presentation == 'radio'">
              <div class="field">
                <form-control type="options" presentation="single" [metadata]="item.metadata" [(ngModel)]="_dataModel[recordIndex][fieldIndex]"></form-control>
              </div>
            </template>
            <template [ngIf]="item.metadata.presentation == 'checkbox'">
              <div class="field">
                <form-control type="options" presentation="multi" [metadata]="item.metadata" [(ngModel)]="_dataModel[recordIndex][fieldIndex]"></form-control>
              </div>
            </template>
            <template [ngIf]="item.metadata.presentation == 'select'">
              <div class="field">
                <form-control type="options" presentation="dropdown" [metadata]="item.metadata" [(ngModel)]="_dataModel[recordIndex][fieldIndex]"></form-control>
              </div>
            </template>
          </template>
          
          <template [ngIf]="item.type == 'table'">
            <div class="field">
              <form-control type="table" [metadata]="item.metadata" [(ngModel)]="_dataModel[recordIndex][fieldIndex]"></form-control>
            </div>
          </template>
        </td>
      </tr>
    </tbody>
    <tfoot class="full-width">
      <tr>
        <th [attr.colspan]="_metadata.fields.length + 1">
          <button type="button" class="ui right floated blue labeled icon button" (click)="new()">
            <i class="plus icon"></i>
            新增一筆資料
          </button>
        </th>
      </tr>
    </tfoot>
  </table>`
    }),
    __param(0, core_2.Self()), 
    __metadata('design:paramtypes', [forms_1.NgModel, record_service_1.RecordService])
], TableFormControl);
exports.TableFormControl = TableFormControl;
//# sourceMappingURL=table-form-control.js.map
// Angular 2
import {Input, Output, Component, EventEmitter, OnInit} from '@angular/core'

import {Directive, Provider, forwardRef, Self} from '@angular/core'
import {NG_VALUE_ACCESSOR, ControlValueAccessor, NgModel} from '@angular/common'

import {RecordService}     from './../../services/record.service'

import {SingleLineTextFormControl,
        MultiLineTextFormControl,
        DateFormControl,
        TimeFormControl}  from './../isms-form-controls'
import {SingleOptionsFormControl} from './isms-single-options-form-control'
import {MultiOptionsFormControl} from './isms-multi-options-form-control'
import {DropdownOptionsFormControl} from './isms-dropdown-options-form-control'

// THIS WILL NOT EMIT VALUE BY DEFAULT, NEED TO BIND TO (change) EVENT!

@Component({
  selector: 'form-control[type=table]',
  template: `<table class="table">
    <thead>
      <tr>
        <th *ngFor="let item of _metadata.fields">{{item.name}}</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let record of _dataModel; let recordIndex = index">
        <td *ngFor="let item of _metadata.fields; let fieldIndex = index" [ngSwitch]="item.type">
          <template ngSwitchWhen="shortText">
            <form-control type="text" row="single" [(ngModel)]="_dataModel[recordIndex][fieldIndex]"></form-control>
          </template>

          <template ngSwitchWhen="longText">
            <form-control type="text" row="multi" [(ngModel)]="_dataModel[recordIndex][fieldIndex]"></form-control>
          </template>

          <template ngSwitchWhen="date">
            <form-control type="date" [(ngModel)]="_dataModel[recordIndex][fieldIndex]"></form-control>
          </template>

          <template ngSwitchWhen="time">
            <form-control type="time" [(ngModel)]="_dataModel[recordIndex][fieldIndex]"></form-control>
          </template>
          
          <template ngSwitchWhen="options">
            <div [ngSwitch]="item.metadata.presentation">
              <template ngSwitchWhen="radio">
                <form-control type="options" presentation="single" [metadata]="item.metadata" [(ngModel)]="_dataModel[recordIndex][fieldIndex]"></form-control>
              </template>
              <template ngSwitchWhen="checkbox">
                <form-control type="options" presentation="multi" [metadata]="item.metadata" [(ngModel)]="_dataModel[recordIndex][fieldIndex]"></form-control>
              </template>
              <template ngSwitchWhen="select">
                <form-control type="options" presentation="dropdown" [metadata]="item.metadata" [(ngModel)]="_dataModel[recordIndex][fieldIndex]"></form-control>
              </template>
              <template ngSwitchDefault>選擇欄位：不支援的表示方法</template>
            </div>
          </template>

          <template ngSwitchWhen="table">
            <form-control type="table" [metadata]="item.metadata" [(ngModel)]="_dataModel[recordIndex][fieldIndex]"></form-control>
          </template>
          
          <template ngSwitchDefault>不支援的欄位，請聯絡管理員！</template>
        </td>
      </tr>
      <tr>
        <td [attr.colspan]="_metadata.fields.length">
          <button type="button" class="btn btn-primary btn-block" (click)="new()">新增</button>
        </td>
      </tr>
    </tbody>
  </table>`,
  directives: [forwardRef(() => SingleLineTextFormControl), 
               forwardRef(() => MultiLineTextFormControl),
               forwardRef(() => DateFormControl),
               forwardRef(() => TimeFormControl),
               forwardRef(() => SingleOptionsFormControl),
               forwardRef(() => MultiOptionsFormControl),
               forwardRef(() => DropdownOptionsFormControl)]
})

export class TableFormControl implements ControlValueAccessor {
  private _onChanged = (_) => {}
  private _onTouched = () => {}
  private cd: NgModel
  
  @Input('metadata') _metadata: any
  
  private _dataModel: any[]
  
  constructor(@Self() cd: NgModel, private recordService: RecordService) {
    this.cd = cd
    cd.valueAccessor = this
  }
  
  // 與 Value Accessor 有關的
  
  // 從 Value Accessor 接收資料
  writeValue(value: any[]): void {
    this._dataModel = value
  }
  
  registerOnChange(fn: (_: any) => void): void {
    this._onChanged = fn
  }
  
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn
  }
  
  new(): void {
    this._dataModel.push(this.recordService.emptyRecordForFields(this._metadata.fields))
  }
}

import {Component, OnInit, Input, Output, EventEmitter, Inject} from '@angular/core'
import {Form, Field}              from './../../types/types'

import {Self} from '@angular/core'
import {ControlValueAccessor, NgModel} from '@angular/forms'

@Component({
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
})

export class FieldsComponent implements OnInit, ControlValueAccessor {
  private _onChanged = (_) => {}
  private _onTouched = () => {}
  private cd: NgModel
  
  @Input("fields") _fields: Field[]
  @Input("nested") _nested: Boolean = false
  
  private _model: any[]
  
  ngOnInit() {
  }
  
  constructor(@Self() cd: NgModel) {
    this.cd = cd
    cd.valueAccessor = this
  }
  
  // 與 Value Accessor 有關的
  
  // 從 Value Accessor 接收資料
  writeValue(value: any[]): void {
    this._model = value
  }
  
  registerOnChange(fn: (_: any) => void): void {
    this._onChanged = fn
  }
  
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn
  }
}

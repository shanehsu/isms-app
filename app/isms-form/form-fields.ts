import {Component, OnInit, Input, Output, EventEmitter, Inject} from '@angular/core'
import {Form}              from './../types/types'
import {Field}             from './../types/types'

import {SingleLineTextFormControl,
        MultiLineTextFormControl,
        DateFormControl,
        TimeFormControl}  from './../controls/isms-form-controls'
import {SingleOptionsFormControl} from './../controls/isms-form-controls/isms-single-options-form-control'
import {MultiOptionsFormControl} from './../controls/isms-form-controls/isms-multi-options-form-control'
import {DropdownOptionsFormControl} from './../controls/isms-form-controls/isms-dropdown-options-form-control'
import {TableFormControl} from './../controls/isms-form-controls/isms-table-form-control'

import {Directive, Provider, forwardRef, Self} from '@angular/core'
import {NG_VALUE_ACCESSOR, ControlValueAccessor, NgModel} from '@angular/common'

@Component({
  selector: 'isms-form-fields',
  template: `<br *ngIf="_inline && _fields.length > 0">
<div>
  <template ngFor let-item [ngForOf]="_fields" let-i="index">
    <div class="form-group" [class.row]="!_inline">
      <label class="form-control-label" [class.col-sm-2]="!_inline"
      [style.text-align]="_inline ? 'left' : 'right'"
      [style.padding-left]="_inline ? '0' : 'inherit'">{{item.name}}</label>
      <div [class.col-sm-10]="!_inline" [ngSwitch]="item.type">
        <template ngSwitchWhen="shortText">
          <form-control type="text" row="single" [(ngModel)]="_model[i]"></form-control>
        </template>

        <template ngSwitchWhen="longText">
          <form-control type="text" row="multi" [(ngModel)]="_model[i]"></form-control>
        </template>

        <template ngSwitchWhen="date">
          <form-control type="date" [(ngModel)]="_model[i]"></form-control>
        </template>

        <template ngSwitchWhen="time">
          <form-control type="time" [(ngModel)]="_model[i]"></form-control>
        </template>
        
        <template ngSwitchWhen="options">
          <div [ngSwitch]="item.metadata.presentation">
            <template ngSwitchWhen="radio">
              <form-control type="options" presentation="single" [metadata]="item.metadata" [(ngModel)]="_model[i]"></form-control>
            </template>
            <template ngSwitchWhen="checkbox">
              <form-control type="options" presentation="multi" [metadata]="item.metadata" [(ngModel)]="_model[i]"></form-control>
            </template>
            <template ngSwitchWhen="select">
              <form-control type="options" presentation="dropdown" [metadata]="item.metadata" [(ngModel)]="_model[i]"></form-control>
            </template>
            <template ngSwitchDefault>選擇欄位：不支援的表示方法</template>
          </div>
        </template>

        <template ngSwitchWhen="table">
          <form-control type="table" [metadata]="item.metadata" [(ngModel)]="_model[i]"></form-control>
        </template>
        
        <template ngSwitchDefault>不支援的欄位，請聯絡管理員！</template>
      </div>
    </div>
  </template>
</div>

<div class="card" *ngIf="!_inline && debug">
  <div class="card-block">
    <h4 class="card-title">除錯資訊</h4>
    <h6 class="card-subtitle text-muted">表單 JSON</h6>
  </div>
  <div class="card-block">
    <pre class="card-text">{{_model | json}}</pre>
  </div>
</div>`,
  directives: [SingleLineTextFormControl, 
               MultiLineTextFormControl, 
               DateFormControl,
               TimeFormControl,
               MultiOptionsFormControl, 
               DropdownOptionsFormControl,
               forwardRef(() => SingleOptionsFormControl),
               TableFormControl
  ]
})

export class FormFields implements OnInit, ControlValueAccessor {
  private _onChanged = (_) => {}
  private _onTouched = () => {}
  private cd: NgModel
  
  @Input("fields") _fields: Field[]
  @Input("inline") _inline: Boolean = false
  
  private _model: any[]
  
  ngOnInit() {
    console.log(this.debug)
  }
  
  constructor(@Self() cd: NgModel, @Inject("app.debug") private debug) {
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

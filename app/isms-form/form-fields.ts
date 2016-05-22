import {Component, OnInit, Input, Output, EventEmitter} from 'angular2/core'
import {Form}              from './../types/types'
import {Field}             from './../types/types'
import * as FormControls   from './../controls/isms-form-controls'

import {Directive, Provider, forwardRef} from 'angular2/core'
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from 'angular2/common'
import {CONST_EXPR} from 'angular2/src/facade/lang'

@Component({
  selector: 'isms-form-fields',
  template: `<form>
    <template ngFor #item [ngForOf]="_fields" #i="index">
      <div *ngIf="!_inline" class="form-group row">
        <label class="col-sm-3 form-control-label" style="text-align: right;">{{item.name}}</label>
        <div class="col-sm-9" [ngSwitch]="item.type">
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
      <fieldset *ngIf="_inline" class="form-group">
        <label>{{item.name}}</label>
        <div [ngSwitch]="item.type">
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
      </fieldset>
    </template>
  </form>
  <div class="card">
    <div class="card-block">
      <h4 class="card-title">除錯資訊</h4>
      <h6 class="card-subtitle text-muted">表單 JSON</h6>
    </div>
    <div class="card-block">
      <pre class="card-text">{{_model | json}}</pre>
    </div>
  </div>`,
  // <form-control type="text" row="single"></form-control>
  // <form-control type="text" row="multi"></form-control>
  // <form-control type="date"></form-control>
  // <form-control type="time"></form-control>
  // <form-control type="options" presentation="single"></form-control>
  // <form-control type="options" presentation="multi"></form-control>
  // <form-control type="options" presentation="dropdown"></form-control>
  // <form-control type="table"></form-control>
  directives: [FormControls.SingleLineTextFormControl, FormControls.SingleLineTextFormControlValueAccessor,
               FormControls.MultiLineTextFormControl, FormControls.MultiLineTextFormControlValueAccessor,
               FormControls.DateFormControl, FormControls.DateFormControlValueAccessor,
               FormControls.TimeFormControl, FormControls.TimeFormControlValueAccessor,
               forwardRef(() => FormControls.SingleOptionsFormControl), forwardRef(() => FormControls.SingleOptionsFormControlValueAccessor),
               FormControls.MultiOptionsFormControl, FormControls.MultiOptionsFormControlValueAccessor,
               FormControls.DropdownOptionsFormControl, FormControls.DropdownOptionsFormControlValueAccessor,
               FormControls.TableFormControl, FormControls.TableFormControlValueAccessor],
})

export class FormFields implements OnInit {
  // 推送資料
  @Output('control-changed') _changed = new EventEmitter<string>()
  // 當焦點離開
  @Output('control-touched') _touched = new EventEmitter<void>()
  
  @Input("fields") _fields: Field[]
  @Input("inline") _inline: Boolean = false
  
  private _model: any[]
  
  ngOnInit() {
    
  }
  
  constructor() {}
  
  // 與 Value Accessor 有關的
  
  // 從 Value Accessor 接收資料
  setValue(value: any[]): void {
    this._model = value
  }
}

const CUSTOM_VALUE_ACCESSOR = CONST_EXPR(new Provider(
  NG_VALUE_ACCESSOR, {useExisting: forwardRef(() => FormFieldsValueAccessor), multi: true}
))

@Directive({
  selector: 'isms-form-fields',
  host: {
    '(control-changed)': '_onChanged($event)',
    '(control-touched)': '_onTouched()'
  },
  providers: [CUSTOM_VALUE_ACCESSOR]
})

export class FormFieldsValueAccessor implements ControlValueAccessor {
  private _onChanged = (_) => {}
  private _onTouched = () => {}

  constructor(private _host: FormFields) {}

  writeValue(value: any[]): void {
    this._host.setValue(value)
  }
  
  registerOnChange(fn: (_: any) => void): void {
    this._onChanged = fn
  }
  
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn
  }
}


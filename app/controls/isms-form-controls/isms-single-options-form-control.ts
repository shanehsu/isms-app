// Angular 2
import {Input, Output, Component, EventEmitter, OnInit} from 'angular2/core'

import {Directive, Provider, forwardRef} from 'angular2/core'
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from 'angular2/common'
import {CONST_EXPR} from 'angular2/src/facade/lang'

import {FormFields, FormFieldsValueAccessor} from './../../isms-form/form-fields'

@Component({
  selector: 'form-control[type=options][presentation=single]',
  template: `<template ngFor #item [ngForOf]="_metadata.options" #i="index">
    <div class="radio form-control">
      <label>
        <input [name]="_uid" type="radio" (change)="select(i)" [checked]="_dataModel.selected[i]">
        {{item.value}}
      </label>
      <div *ngIf="_dataModel.selected[i]">
        <isms-form-fields></isms-form-fields>
      </div>
    </div>
  </template>`, // [fields]="_metadata.options[i].fields" [(ngModel)]="_dataModel.values[i]"
  directives: [forwardRef(() => FormFields), forwardRef(() => FormFieldsValueAccessor)]
})

export class SingleOptionsFormControl implements OnInit {
  @Input('metadata') _metadata: any
  
  // 推送資料
  @Output('control-changed') _changed = new EventEmitter<string>()
  // 當焦點離開
  @Output('control-touched') _touched = new EventEmitter<void>()
  
  private _dataModel: any
  private _uid: string
  
  ngOnInit(): void {
    // console.dir(FormFields)
  }
  
  constructor() {
    this._uid = randomString(7)
    console.dir("我是 SingleOptionsFormControl，我的 constructor 被呼叫了呦！")
  }
  
  // 與 Value Accessor 有關的
  
  // 從 Value Accessor 接收資料
  setValue(value: string): void {
    this._dataModel = value
  }
  
  select(index: number): void {
    this._dataModel.selected = this._dataModel.selected.map(() => { return false })
    this._dataModel.selected[index] = true
    
    this._changed.emit(this._dataModel)
  }
}

const CUSTOM_VALUE_ACCESSOR = CONST_EXPR(new Provider(
  NG_VALUE_ACCESSOR, {useExisting: forwardRef(() => SingleOptionsFormControlValueAccessor), multi: true}
))

@Directive({
  selector: 'form-control[type=options][presentation=single]',
  host: {
    '(control-changed)': '_onChanged($event)',
    '(control-touched)': '_onTouched()'
  },
  providers: [CUSTOM_VALUE_ACCESSOR]
})

export class SingleOptionsFormControlValueAccessor implements ControlValueAccessor {
  private _onChanged = (_) => {}
  private _onTouched = () => {}

  constructor(private _host: SingleOptionsFormControl) {
    console.dir("我是 SingleOptionsFormControlValueAccessor，我的 constructor 被呼叫了呦！")
  }

  writeValue(value: any): void {
    this._host.setValue(value)
  }
  
  registerOnChange(fn: (_: any) => void): void {
    this._onChanged = fn
  }
  
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn
  }
}

var randomString = function(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
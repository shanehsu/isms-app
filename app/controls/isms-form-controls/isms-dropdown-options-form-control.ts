// Angular 2
import {Input, Output, Component, EventEmitter, OnInit} from 'angular2/core'

import {Directive, Provider, forwardRef} from 'angular2/core'
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from 'angular2/common'
import {CONST_EXPR} from 'angular2/src/facade/lang'

@Component({
  selector: 'form-control[type=options][presentation=dropdown]',
  template: `我是下拉式`
})

export class DropdownOptionsFormControl {
  @Input('metadata') _metadata: any
  
  // 推送資料
  @Output('control-changed') _changed = new EventEmitter<string>()
  // 當焦點離開
  @Output('control-touched') _touched = new EventEmitter<void>()
  
  private _dataModel: string
  
  constructor() {
    console.dir("我是 DropdownOptionsFormControl，我的 constructor 被呼叫了呦！")
  }
  
  // 與 Value Accessor 有關的
  
  // 從 Value Accessor 接收資料
  setValue(value: string): void {
    this._dataModel = value
  }
}

const CUSTOM_VALUE_ACCESSOR = CONST_EXPR(new Provider(
  NG_VALUE_ACCESSOR, {useExisting: forwardRef(() => DropdownOptionsFormControlValueAccessor), multi: true}
))

@Directive({
  selector: 'form-control[type=options][presentation=dropdown]',
  host: {
    '(control-changed)': '_onChanged($event)',
    '(control-touched)': '_onTouched()'
  },
  providers: [CUSTOM_VALUE_ACCESSOR]
})

export class DropdownOptionsFormControlValueAccessor implements ControlValueAccessor {
  private _onChanged = (_) => {}
  private _onTouched = () => {}

  constructor(private _host: DropdownOptionsFormControl) {
    console.dir("我是 DropdownOptionsFormControlValueAccessor，我的 constructor 被呼叫了呦！")
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

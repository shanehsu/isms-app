// Angular 2
import {Input, Output, Component, EventEmitter, OnInit} from 'angular2/core'

import {Directive, Provider, forwardRef} from 'angular2/core'
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from 'angular2/common'
import {CONST_EXPR} from 'angular2/src/facade/lang'

@Component({
  selector: 'form-control[type=options][presentation=multi]',
  template: `我是多選`
})

export class MultiOptionsFormControl {
  @Input('metadata') _metadata: any
  
  // 推送資料
  @Output('control-changed') _changed = new EventEmitter<string>()
  // 當焦點離開
  @Output('control-touched') _touched = new EventEmitter<void>()
  
  private _dataModel: string
  
  constructor() {
    console.dir("我是 MultiOptionsFormControl，我的 constructor 被呼叫了呦！")
  }
  
  // 與 Value Accessor 有關的
  
  // 從 Value Accessor 接收資料
  setValue(value: string): void {
    this._dataModel = value
  }
}

const CUSTOM_VALUE_ACCESSOR = CONST_EXPR(new Provider(
  NG_VALUE_ACCESSOR, {useExisting: forwardRef(() => MultiOptionsFormControlValueAccessor), multi: true}
))

@Directive({
  selector: 'form-control[type=options][presentation=multi]',
  host: {
    '(control-changed)': '_onChanged($event)',
    '(control-touched)': '_onTouched()'
  },
  providers: [CUSTOM_VALUE_ACCESSOR]
})

export class MultiOptionsFormControlValueAccessor implements ControlValueAccessor {
  private _onChanged = (_) => {}
  private _onTouched = () => {}

  constructor(private _host: MultiOptionsFormControl) {
    console.dir("我是 MultiOptionsFormControlValueAccessor，我的 constructor 被呼叫了呦！")
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

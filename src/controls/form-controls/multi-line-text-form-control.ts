// Angular 2
import {Input, Output, Component, EventEmitter, OnInit} from '@angular/core'
import {Directive, Provider, forwardRef, Self} from '@angular/core'

import {NG_VALUE_ACCESSOR, ControlValueAccessor, NgModel} from '@angular/forms'

@Component({
  selector: 'form-control[type=text][row=multi]',
  template: `<textarea rows="3" [(ngModel)]="_dataModel" (keyup)="_onChanged(control.value)" (blur)="_onTouched()" #control></textarea>`
})

export class MultiLineTextFormControl implements ControlValueAccessor {
  private _onChanged = (_) => {}
  private _onTouched = () => {}
  private cd: NgModel
  
  private _dataModel: string
  
  constructor(@Self() cd: NgModel) {
    this.cd = cd
    cd.valueAccessor = this
  }
  
  // 與 Value Accessor 有關的
  
  // 從 Value Accessor 接收資料
  writeValue(value: string): void {
    this._dataModel = value
  }
  
  registerOnChange(fn: (_: any) => void): void {
    this._onChanged = fn
  }
  
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn
  }
}

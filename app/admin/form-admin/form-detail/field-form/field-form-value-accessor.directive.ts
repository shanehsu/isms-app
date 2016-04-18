import {Directive, Provider, forwardRef} from 'angular2/core'
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from 'angular2/common'
import {CONST_EXPR} from 'angular2/src/facade/lang'

// 控制的元件
import {FieldFormComponent} from './field-form.component'

import {Field} from './../../../../types/types'

const CUSTOM_VALUE_ACCESSOR = CONST_EXPR(new Provider(
  NG_VALUE_ACCESSOR, {useExisting: forwardRef(() => FieldFormValueAccessor), multi: true}
))

@Directive({
  selector: 'field-form',
  host: {
    '(field-changed)': '_onChanged($event)',
    '(control-touched)': '_onTouched()'
  },
  providers: [CUSTOM_VALUE_ACCESSOR]
})

export class FieldFormValueAccessor implements ControlValueAccessor {
  private _onChanged = (_) => {};
  private _onTouched = () => {};

  constructor(private _host: FieldFormComponent) { }

  writeValue(value: Field): void {
    this._host.setValue(value)
  }
  
  registerOnChange(fn: (_: any) => void): void {
    this._onChanged = fn
  }
  
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn
  }
}

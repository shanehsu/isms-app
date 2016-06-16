import {Directive, Provider, forwardRef} from '@angular/core'
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/common'

// 控制的元件
import {FieldsFormComponent} from './fields-form.component'

// 資料型態
import {Field} from './../../../../types/types'

const CUSTOM_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FieldsFormValueAccessor),
  multi: true
}

@Directive({
  selector: 'fields-form',
  host: {
    '(fields-changed)': '_onChanged($event)',
    '(control-touched)': '_onTouched()'
  },
  providers: [CUSTOM_VALUE_ACCESSOR]
})

export class FieldsFormValueAccessor implements ControlValueAccessor {
  private _onChanged = (_) => {}
  private _onTouched = () => {}

  constructor(private _host: FieldsFormComponent) { }
  
  writeValue(value: Field[]): void {
    this._host.setValue(value)
  }
  
  registerOnChange(fn: (_: any) => void): void {
    this._onChanged = fn
  }
  
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn
  }
}

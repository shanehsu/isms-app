import {Directive, Provider, forwardRef} from '@angular/core'
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/common'

// 控制的元件
import {FieldOptionComponent} from './field-option.component'

const CUSTOM_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FieldOptionValueAccessor),
  multi: true
}

@Directive({
  selector: 'field-option',
  host: {
    '(metadata-changed)': '_onChanged($event)',
    '(control-touched)': '_onTouched()'
  },
  providers: [CUSTOM_VALUE_ACCESSOR]
})

export class FieldOptionValueAccessor implements ControlValueAccessor {
  private _onChanged = (_) => {};
  private _onTouched = () => {};

  constructor(private _host: FieldOptionComponent) { }

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

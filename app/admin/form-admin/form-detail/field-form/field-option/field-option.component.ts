// Angular 2
import {Input, Output, Component, EventEmitter, OnInit} from 'angular2/core'

// 常數
import {FieldTypes} from './../constants'

// 元件
import {EditableTextInputComponent} from './../../../../../controls/editable-text-input/editable-text-input.component'
import {EditableTextInputValueAccessor} from './../../../../../controls/editable-text-input/editable-text-input-value-accessor.directive'


@Component({
  selector: 'field-option',
  templateUrl: '/app/admin/form-admin/form-detail/field-form/field-option/field-option.template.html',
  directives: [EditableTextInputComponent, EditableTextInputValueAccessor]
})

export class FieldOptionComponent implements OnInit {
  @Input('field-type') _fieldType: string
  @Output('metadata-changed') _metadataChanged = new EventEmitter<any>()
  @Output('control-touched') _controlTouched = new EventEmitter<void>()
  
  private _metadata: any
  
  constructor() {}
  
  setValue(value: any) {
    this._metadata = value
  }
  
  pull_option(index: number): void {
    this._metadata.options = (<string[]>this._metadata.options).filter((value, i) => {
      return index != i
    })
    
    this.changed()
  }
  
  edit_option(index: number): void {
    console.log('will edit option')
  }
  
  push_option(option: string, optionControl: HTMLInputElement): void {
    if (!this._metadata.options) {
      this._metadata.options = []
    }
    
    if (option != "") (<string[]>this._metadata.options).push(option)
    optionControl.value = ''
    
    this.changed()
  }
  
  changed(): void {
    this._metadataChanged.emit(this._metadata)
  }
  
  touched(): void {
    this._controlTouched.emit(null)
  }
  
  ngOnInit(): void {
    
  }
  
  log(value: any): void {
    console.dir(value)
  }
}
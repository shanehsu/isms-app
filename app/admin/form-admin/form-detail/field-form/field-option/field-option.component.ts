// Angular 2
import {Input, Output, Component, EventEmitter, OnInit, Inject, Injector, DynamicComponentLoader, forwardRef, ElementRef, ChangeDetectorRef} from '@angular/core'

// 常數
import {FieldTypes} from './../constants'

import {Field} from './../../../../../types/types'

// 元件
import {EditableTextInputComponent} from './../../../../../controls/editable-text-input/editable-text-input.component'
import {EditableTextInputValueAccessor} from './../../../../../controls/editable-text-input/editable-text-input-value-accessor.directive'

import {FieldsFormComponent} from './../../fields-form/fields-form.component'
import {FieldsFormValueAccessor} from './../../fields-form/fields-form-value-accessor.directive'

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
  private _uid: string
  
  constructor(private _dcl: DynamicComponentLoader, private _injector: Injector, private elementRef: ElementRef, private _changeDetectorRef: ChangeDetectorRef) {
    this._uid = randomString(5)
  }
  
  setValue(value: any) {
    // console.log("在 FieldOption 裡，setValue 被呼叫了！value 的值：")
    // console.dir(value)
    
    this._metadata = value
    
    if (this._fieldType == 'options' && this._metadata) {
      if (!this._metadata.options) {
        this._metadata.options = []
      }
      for (let index = 0; index < this._metadata.options.length; ++ index) {
        this._dcl.loadAsRoot(FieldsFormComponent, '#field-' + this._uid + '-' + index, this._injector).then(componentRef => {
          let instance: FieldsFormComponent = <FieldsFormComponent>componentRef.instance
          instance.setValue(this._metadata.options[index].fields)
          instance.setMode('inline')
        })
      }
    }
    
    if (this._fieldType == 'table' && this._metadata) {
      if (!this._metadata.fields) {
        this._metadata.fields = []
      }
      this._dcl.loadAsRoot(FieldsFormComponent, '#field-' + this._uid, this._injector).then(componentRef => {
        let instance: FieldsFormComponent = <FieldsFormComponent>componentRef.instance
        instance.setValue(this._metadata.fields)
        instance.setMode('inline')
      })
    }
  }
  
  pull_option(index: number): void {
    this._metadata.options.splice(index, 1)
    this._changeDetectorRef.detectChanges();
    this.changed()
  }
  
  push_option(option: string, optionControl: HTMLInputElement): void {
    if (!this._metadata.options) {
      this._metadata.options = []
    }
    
    if (option != "") (this._metadata.options).push({
      value: option,
      fields: []
    })
    optionControl.value = ''
    
    this.changed()
    this._changeDetectorRef.detectChanges();
    // Dynamic Component Loader
    // 必須等待一段時間之後，DOM 更新，div 出現，才能進行 Loading
    setTimeout(() => {
      let index = this._metadata.options.length - 1
      this._dcl.loadAsRoot(FieldsFormComponent, '#field-' + this._uid + '-' + index, this._injector).then(componentRef => {
        let instance: FieldsFormComponent = <FieldsFormComponent>componentRef.instance
        instance.setValue(this._metadata.options[index].fields)
        instance.setMode('inline')
      })
    }, 250)
  }
  
  changed(): void {
    this._metadataChanged.emit(this._metadata)
  }
  
  touched(): void {
    this._controlTouched.emit(null)
  }
  
  ngOnInit(): void {}
  
  log(value: any): void {
    console.dir(value)
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
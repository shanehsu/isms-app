// Angular 2
import {Input, Output, Component, EventEmitter, OnInit, ElementRef} from 'angular2/core'

import {FieldFormComponent} from './../field-form/field-form.component'
import {FieldFormValueAccessor} from './../field-form/field-form-value-accessor.directive'
import {Field} from './../../../../types/types'

import {FormService} from './../../../../services/form.service'

@Component({
  selector: 'fields-form',
  templateUrl: '/app/admin/form-admin/form-detail/fields-form/fields-form.template.html',
  directives: [FieldFormComponent, FieldFormValueAccessor]
})

/*
 * model 是一堆 [string]
 */

export class FieldsFormComponent {
  // 與 Value Accessor 有關的
  @Output('fields-changed') _fieldsChanged = new EventEmitter<Field[]>()
  @Output('control-touched') _controlTouched = new EventEmitter<void>()
  
  @Output('shouldUpdate') _change = new EventEmitter<void>()
  
  @Input('form-id')  _formID: string
  @Input('revision-id')  _revisionID: string
  
  // 與資料有關的
  private _fields: Field[]
  
  private _inline: boolean = false
  
  constructor(private _elementRef: ElementRef, private _formService: FormService) { }
  
  // 與 Value Accessor 有關的
  setValue(value: Field[]): void {
    this._fields = value
  }
  
  setMode(mode: string): void {
    if (mode == 'inline') {
      this._inline = true
    }
  }
  
  update_field(index: number): void {
    if (this._inline) {
      return
    }
    
    this._formService.updateField(this._formID, this._revisionID, this._fields[index])
      .then(() => this._change.emit(null))
      .catch(console.error)
  }
  
  delete_field(index: number): void {
    if (this._inline) {
      this._fields = this._fields.splice(index, 1)
      
      this._elementRef._appElement.parentView.changeDetector.ref.detectChanges()
      return
    }
    
    this._formService.deleteField(this._formID, this._revisionID, this._fields[index]._id)
      .then(() => this._change.emit(null))
      .catch(console.error)
  }
  
  new_field(): void {
    if (this._inline) {
      this._fields.push(<Field>{
        _id: '' + this._fields.length,
        name: '新欄位',
        type: 'shortText',
        metadata: {}
      })
      
      this._elementRef._appElement.parentView.changeDetector.ref.detectChanges()
      return
    }
    
    this._formService.newField(this._formID, this._revisionID)
        .then(() => this._change.emit(null))
        .catch(console.error)
  }
}
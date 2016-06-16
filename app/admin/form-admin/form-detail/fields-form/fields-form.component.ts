// Angular 2
import {Input, Output, Component, EventEmitter, OnInit, ElementRef, ChangeDetectorRef} from '@angular/core'

import {FieldFormComponent} from './../field-form/field-form.component'
import {FieldFormValueAccessor} from './../field-form/field-form-value-accessor.directive'
import {Field} from './../../../../types/types'

import {FormService} from './../../../../services/form.service'

@Component({
  selector: 'fields-form',
  templateUrl: '/app/admin/form-admin/form-detail/fields-form/fields-form.template.html',
  directives: [FieldFormComponent, FieldFormValueAccessor]
})

/**
 * 
 * 開發備忘錄
 * 
 * inline 與非 inline 的差別
 * 
 * 當這個 FieldsForm 代表的是一個 Revision 的 Fields 的話，則不是 `inline` 模式；
 * 當這個 FieldsForm 代表的是另一個 Field 的子 Fields 的話，則是 `inline` 模式。
 * 
 * 兩者最大的差異在於，`inline` 模式的資料來源是一個 `RevisionFormComponent`，而 
 * `RevisionForm` 會負責將 `Revision` 資料中的 `string` 陣列 `fields` 轉換成
 * `Field` 的陣列。所以在更新資料的時候，必須呼叫 `FormService` 之後請
 * `RevisionFormComponent` 更新 `Field` 陣列。
 * 
 * 會更動到資料的函數有：
 * 
 * - `update_field(index: number)`
 * - `delete_field(index: number)`
 * - `new_field()`
 * 
 * 其中 `update_field` 在 `inline` 模式下，將不會執行任何動作（因為改動資料之後，應該
 * 是在做外層的表單進行更新，自己沒有 API 可以呼叫。）；`delete_field` 單純將自己從陣
 * 列中刪除；`new_field` 將一個新的欄位插入陣列。
 * 
 * 在非 `inline` 模式下，都有對應的 `FormService` API 可以呼叫，且在呼叫之後，通知
 * `RevisionFormComponent` 更新 `Field` 陣列內容。
 * 
 * 在 `inline` 模式下，更動將不會由母元件（`FormRevisionComponent`）負責，所以一定
 * 要主動將改變推送出去。
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
  private _detectorRef: ChangeDetectorRef
  private _inline: boolean = false
  
  constructor(private _elementRef: ElementRef, private _formService: FormService, private detRef: ChangeDetectorRef) {
    this._detectorRef = detRef
  }
  
  // 與 Value Accessor 有關的
  setValue(value: Field[]): void {
    this._fields = value
    this._detectorRef.detectChanges()
  }
  
  setMode(mode: string): void {
    if (mode == 'inline') {
      this._inline = true
      this._detectorRef.detectChanges()
    }
  }
  
  update_field(index: number): void {
    if (this._inline) {
      this._fieldsChanged.emit(this._fields)
      this._detectorRef.detectChanges()
      return
    }
    
    this._formService.updateField(this._formID, this._revisionID, this._fields[index])
      .then(() => this._change.emit(null))
      .catch(console.error)
  }
  
  delete_field(index: number): void {
    console.log(`index = ${index}`)
    if (this._inline) {
      this._fields.splice(index, 1)
      this._fieldsChanged.emit(this._fields)
      this._detectorRef.detectChanges()
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
      
      this._fieldsChanged.emit(this._fields)
      
      this._detectorRef.detectChanges()
      
      return
    }
    
    this._formService.newField(this._formID, this._revisionID)
        .then(() => this._change.emit(null))
        .catch(console.error)
  }
}
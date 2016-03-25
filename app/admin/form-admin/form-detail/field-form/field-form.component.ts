// Angular 2
import {Input, Output, Component, EventEmitter, OnInit} from 'angular2/core'

// 服務
import {FormService} from './../../../../services/form.service'

// 基本型態
import {Field} from './../../../../types/types'

// 常數
import {FieldTypes} from './constants'

// 子元件
import {FieldOptionComponent} from './field-option/field-option.component'
import {FieldOptionValueAccessor} from './field-option/field-option-value-accessor.directive'

@Component({
  selector: 'field-form',
  templateUrl: '/app/admin/form-admin/form-detail/field-form/field-form.template.html',
  directives: [FieldOptionComponent, FieldOptionValueAccessor]
})

export class FieldFormComponent implements OnInit {
  private fieldTypes = FieldTypes // 從 constants 來的常數值
  
  // 輸入
  @Input('field') _fieldID: string
  @Input('revision') _revisionID: string
  @Input('form') _formID: string
  
  // 輸出
  @Output('fieldDidDelete') _fieldDidDelete = new EventEmitter<void>()
  
  // 表單模型
  private _field: Field
  
  // 服務
  constructor(private _formService: FormService) { }
  
  // 初始化
  ngOnInit(): void {
    // 空資料
    this._field = <Field>{}
    
    // 取得資料
    this.reload_field()
  }

  reload_field(): void {
    this._formService.field(this._formID, this._revisionID, this._fieldID)
      .then(field => this._field = field)
      .catch(console.error)
  }

  submit_field(): void {
    this._formService.updateField(this._formID, this._revisionID, this._field)
      .then(() => this.reload_field())
      .catch(console.error)
  }

  delete_field(): void {
    this._formService.deleteField(this._formID, this._revisionID, this._fieldID)
      .then(() => this._fieldDidDelete.emit(null))
      .catch(console.error)
  }
}
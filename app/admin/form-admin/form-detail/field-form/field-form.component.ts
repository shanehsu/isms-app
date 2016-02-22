// Angular 2
import {Input, Output, Component, EventEmitter, OnInit} from 'angular2/core'

// 服務
import {FormService} from './../../../../services/form.service'

// 基本型態
import {Field} from './../../../../types/types'

@Component({
  selector: 'field-form',
  templateUrl: '/app/admin/form-admin/form-detail/field-form/field-form.template.html'
})

export class FieldFormComponent implements OnInit {
  private fieldTypes = [
    {
      label: '單行文字',
      value: 'shortText'
    },
    {
      label: '多行文字',
      value: 'longText'
    },
    {
      label: '日期',
      value: 'date'
    },
    {
      label: '選擇',
      value: 'options'
    },
    {
      label: '表格',
      value: 'table'
    }
  ]
  private optionTypes = [
    {
      label: '單選',
      value: 'radio'
    },
    {
      label: '多選',
      value: 'checkbox'
    },
    {
      label: '下拉式',
      value: 'option'
    }
  ]
  
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
  
  pushOption(item: string): void {
    if (!this._field.metadata.options) {
      this._field.metadata.options = []
    }
    this._field.metadata.options.push(item)
  }
}
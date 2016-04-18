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
  @Output('field-changed') _metadataChanged = new EventEmitter<Field>()
  @Output('control-touched') _controlTouched = new EventEmitter<void>()
  
  @Output('update') _update = new EventEmitter<Field>()
  @Output('delete') _delete = new EventEmitter<void>()
  
  private fieldTypes = FieldTypes // 從 constants 來的常數值
  
  // 表單模型
  private _field: Field = <Field>{}
  
  // 服務
  constructor(private _formService: FormService) {}
  
  // 初始化
  ngOnInit(): void {}
  
  setValue(value: Field): void {
    this._field = value
  }
  
  // 更新與刪除
  submit_field(): void {
    this._update.emit(this._field)
  }
  
  delete_field(): void {
    this._delete.emit(null)
  }
}
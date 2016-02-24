// Angular 2
import {Input, Output, Component, EventEmitter, OnInit} from 'angular2/core'

// 服務
import {FormService} from './../../../../../services/form.service'

// 基本型態
import {Field} from './../../../../../types/types'

// 常數
import {FieldTypes} from './../constants'

@Component({
  selector: 'field-option',
  templateUrl: '/app/admin/form-admin/form-detail/field-form/field-option/field-option.template.html'
})

export class FieldOptionComponent implements OnInit {
  @Input('field-type') _fieldType: string
  
  constructor() {}
  
  ngOnInit(): void {
    
  }
}
import {Component, OnInit, forwardRef} from 'angular2/core';
import {FormService}       from './../services/form.service'
import {RecordService}     from './../services/record.service'
import {Form}              from './../types/types'
import {Field}             from './../types/types'
import * as FormControls from './../controls/isms-form-controls'

import {FormFields, FormFieldsValueAccessor} from './form-fields'

@Component({
  selector: 'isms-form',
  // templateUrl: '/app/isms-form/form-index.template.html',
  template: `<div class="container">
    <div *ngIf="!_fields">
      <progress style="margin: 0 auto; width: 40%; min-width: 16em; max-width: 30em;" class="progress progress-striped progress-success progress-animated" value="100" max="100"></progress>
    </div>
    
    <div *ngIf="_fields">
      <!-- 表單欄位資訊載入完成！ -->
      <isms-form-fields [fields]="_fields" [(ngModel)]="_data"></isms-form-fields>
      
      
      <!-- 除錯資訊 -->
      <div class="card">
        <div class="card-block">
          <h4 class="card-title">除錯資訊</h4>
          <h6 class="card-subtitle text-muted">欄位 JSON</h6>
        </div>
        <div class="card-block">
          <pre class="card-text">{{_fields | json}}</pre>
        </div>
      </div>
    </div>
    
    
  </div>`,
  providers: [FormService, RecordService],
  directives: [forwardRef(() => FormFields), forwardRef(() => FormFieldsValueAccessor)],
  pipes: []
})

export class FormIndexComponent implements OnInit {
  private _forms: Form[]
  private _data: any[]
  private _fields: Field[]
  
  refresh() {
    this._formService.forms()
        .then(forms => this._forms = forms)
        .catch(console.error)
  }
  
  ngOnInit() {
    this.refresh()
    this._recordService.schema("573d508d31446ba0c7dd0bdc").then(fields => {
      let parsedFields = fields.map(field => {
        field.metadata = JSON.parse(field.metadata)
        return field
      })
      this._data = this._recordService.emptyRecordForFields(parsedFields)
      this._fields = parsedFields
    }).catch(console.error)
  }
  
  fill(id: string): void {
    
  }
  
  constructor(private _formService: FormService, private _recordService: RecordService) {}
}

import {Component, OnInit, forwardRef, Inject} from '@angular/core';
import {FormService}          from './../services/form.service'
import {RecordService}        from './../services/record.service'
import {Form}                 from './../types/types'
import {Field}                from './../types/types'

import {Router, RouteSegment} from '@angular/router'

import {FormFields}           from './form-fields'

@Component({
  selector: 'isms-form',
  template: `<div class="container">
    <div *ngIf="!_fields">
      <progress style="margin: 0 auto; width: 40%; min-width: 16em; max-width: 30em;" class="progress progress-striped progress-success progress-animated" value="100" max="100"></progress>
    </div>
    
    <div *ngIf="_fields">
      <form>
        <isms-form-fields [fields]="_fields" [(ngModel)]="_data"></isms-form-fields>
      </form>
      
      <div class="card" *ngIf="debug">
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
  directives: [FormFields],
  pipes: []
})

export class FormComponent implements OnInit {
  private _data: any[]
  private _fields: Field[]
  
  ngOnInit() {
    let id = this.routeSegment.getParam('id')
    
    this.recordService.schema(id).then(fields => {
      let parsedFields = fields.map(field => {
        field.metadata = JSON.parse(field.metadata)
        return field
      })
      this._data = this.recordService.emptyRecordForFields(parsedFields)
      this._fields = parsedFields
    }).catch(console.error)
  }
  
  constructor(private formService: FormService, private recordService: RecordService, private routeSegment: RouteSegment, @Inject("app.debug") private debug) {}
}

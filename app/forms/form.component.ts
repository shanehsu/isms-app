import {Component, OnInit, forwardRef, Inject} from '@angular/core';
import {FormService}          from './../services/form.service'
import {RecordService}        from './../services/record.service'
import {Form}                 from './../types/types'
import {Field}                from './../types/types'

import {Router, ActivatedRoute} from '@angular/router'

@Component({
  template: `<div class="container">
    <div *ngIf="fields">
      <form class="ui form">
        <form-fields [fields]="fields" [(ngModel)]="data" name="fields"></form-fields>
        <div style="margin-top: 1em; text-align: right;">
          <button type="button" (click)="submit()" class="ui yellow button">送出</button>
        </div> 
      </form>
      
      <div class="ui raised segment" *ngIf="true || debug">
        <h2 class="ui header">除錯資訊</h2>
        <h3 class="ui header">欄位 JSON</h3>
        <pre>{{fields | json}}</pre>
      </div>
    </div>
    <div class="ui raised segment" *ngIf="!_nested && debug">
      <h2 class="card-title">除錯資訊</h2>
      <h3 class="card-subtitle text-muted">表單 JSON</h3>
      <pre>{{data | json}}</pre>
    </div>
  </div>`
})

export class FormComponent implements OnInit {
  private data: any[]
  private fields: Field[]
  private id: string
  
  ngOnInit() {
    this.data = []
    this.id = this.route.snapshot.params['id']
    this.fields = []
    
    this.recordService.schema(this.id).then(fields => {
      let parsedFields = fields.map(field => {
        field.metadata = JSON.parse(field.metadata)
        return field
      })
      this.data = this.recordService.emptyRecordForFields(parsedFields)
      this.fields = parsedFields
    }).catch(console.error)
  }
  
  submit() {
    this.recordService.upload(this.id, this.data).then(recordID => {
      console.dir(`已經建立紀錄：${recordID}`)
    }).catch(err => {
      console.error('無法建立表單紀錄')
      console.error(err)
    })
  }
  
  constructor(private formService: FormService, private recordService: RecordService, private route: ActivatedRoute, @Inject("app.debug") private debug) {}
}

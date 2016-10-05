import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, ElementRef } from '@angular/core'
import { NgClass } from '@angular/common'
import { Router, ActivatedRoute } from '@angular/router'
import { RecordService } from './../services/record.service'
import { SinglePopulatedRecord, Record, Signature, Field } from './../types/types'
import { TextFieldData, TimeFieldData, DateFieldData, OptionFieldData,
         TableFieldData, FieldData, Schema, GenericFieldDisplayData,
         OptionFieldDisplayData, TableFieldDisplayData, FieldDisplayData,
         FieldDisplayMetadata } from './records.types'

function merge(schema: Schema, data: FieldData[]): FieldDisplayMetadata[] {
  for (var field of schema) {
    for (var key in field) {
      if (key == 'metadata') {
        field.metadata = JSON.parse(field.metadata)
      }
    }
  }
  
  // 開始工作囉！
  if (schema.length != data.length) {
    console.error(`合併欄位資料與欄位形式的時候發生錯誤，資料有 ${data.length} 個欄位，但是形式有 ${data.length} 個欄位。`)
    return []
  } else {
    let merge_algorithm = function(schema: Field, data: FieldData): FieldDisplayMetadata {
      let getData = function(field: Field, data: FieldData): FieldDisplayData {
        switch (field.type) {
          case 'shortText':
          case 'longText':
            return <string>data
          case 'time':
            let time = <TimeFieldData>data
            return `${time.hour} 時 ${time.minute} 分`
          case 'date':
            let date = <DateFieldData>data
            return Intl.DateTimeFormat().format(new Date(date))
          case 'options':
            let optionData = <OptionFieldData>data
            let optionFieldDisplayData: OptionFieldDisplayData = {
              selectedValues: [],
              nestedValues: []
            }
            let fieldMetadata = field.metadata as {options: {id: string, value: string, fields: Field[]}[]}
            
            optionData.selected.forEach((value, index) => {
              if (value) {
                optionFieldDisplayData.selectedValues.push(fieldMetadata.options[index].value)
                let nestedFieldValues: FieldData[] = optionData.values[index]
                let metadatas = nestedFieldValues.map((nestedValue, nestedFieldIndex) => {
                  return merge_algorithm(fieldMetadata.options[index].fields[nestedFieldIndex], nestedValue)
                })
                optionFieldDisplayData.nestedValues.push(metadatas)
              }
            })
            
            return optionFieldDisplayData
          case 'table':
            let tableFieldData = <TableFieldData>data
            let tableFieldDisplayData: TableFieldDisplayData = {
              titles: [],
              values: []
            }
            let tableFieldMetadata = field.metadata as {fields: Field[]}
            
            tableFieldDisplayData.titles = tableFieldMetadata.fields.map(field => field.name)
            
            tableFieldData.forEach((rowData, i) => {
              let row: FieldDisplayData[] = []
              rowData.forEach((cellData, j) => {
                row.push(getData(tableFieldMetadata.fields[j], cellData))
              })
              tableFieldDisplayData.values.push(row)
            })
            
            return tableFieldDisplayData
        }
      }
      
      return {
        title: schema.name,
        value: getData(schema, data)
      }
    }
    let metadata: FieldDisplayMetadata[] = []
    for (let i = 0; i < schema.length; i ++) {
      let tSchema = schema[0]
      let tData = data[0]
      
      metadata.push(merge_algorithm(tSchema, tData))
    }
    
    return metadata
  }
}

@Component({
  template: `
  <h3 class="ui header">ID</h3>
  <div><pre>{{id | json}}</pre></div>
  
  <table id="record_display" class="ui table">
    <tbody>
      <tr *ngFor="let field of merged">
        <th>{{field.title}}</th>
        <td>
          <p *ngIf="field.value && !field.value.titles && !field.value.selectedValues">{{field.value}}</p>
          <p *ngIf="field.value.titles || field.value.titles">
            <record-data-display [(ngModel)]="field.value"></record-data-display>
          </p>
        </td>
      </tr>
    </tbody>
  </table>
  <h3 class="ui header">簽核狀況</h3>
  <table class="ui table">
    <tbody>
      <tr *ngIf="record && record.signatures">
        <td *ngFor="let signature of record.signatures">
          <div class="ui list">
            <div class="item">
              <i class="user icon"></i>
              <div class="content">{{signature.personnel.name}}</div>
            </div>
            <div class="item">
              <i class="users icon"></i>
              <div class="content">{{signature.unit}} 的 {{signature.role}}</div>
            </div>
            <div *ngIf="signature.signed" class="item">
              <i class="calendar icon"></i>
              <div class="content">{{signature.timestamp | date}}</div>
            </div>
            <button *ngIf="canSign(signature)" type="button" class="ui button" (click)="sign()" [class.loading]="isSigning">簽章</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  
  <h3 class="ui header">Merged</h3>
  <div><pre>{{merged | json}}</pre></div>
  <h3 class="ui header">Schema</h3>
  <div><pre>{{schema | json}}</pre></div>
  <h3 class="ui header">Record</h3>
  <div><pre>{{record | json}}</pre></div>
  <h3 class="ui header">Record Data</h3>
  <div><pre>{{data | json}}</pre></div>
  `,
  styles: [
    '#record_display th:first-child { width: 12em; }',
    '#record_display > tbody > tr { vertical-align: initial; }',
    '#record_display > tbody > tr > th { color: initial; }'
  ]
})

export class RecordComponent implements OnInit {
  private id: string
  private schema: Field[] | undefined
  private record: SinglePopulatedRecord | undefined
  private data: FieldData[] | undefined
  private merged: FieldDisplayMetadata[] | undefined
  
  private isSigning: boolean = false
  
  constructor(private route: ActivatedRoute, private recordService: RecordService) { }
  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    this.schema = undefined
    this.record = undefined
    this.data = undefined
    this.merged = undefined

    // 載入資料
    this.recordService.record(this.id).then(record => {
      this.recordService.schemaForRevision(record.form.id, record.revision.id).then(schema => {
        this.schema = schema
        this.record = record
        this.data = record.data
        
        this.merged = merge(this.schema, this.data)
      })
    })
  }
  canSign(signature: { personnel: {id: string, name: string}, signed: boolean, timestamp: string, unit: string, role: string }): boolean {
    if (signature.personnel.id == localStorage.getItem('userid') && !signature.signed) {
      return true
    }
    return false
  }
  sign(): void {
    this.isSigning = true
    this.recordService.sign(this.id).then(() => {
      this.isSigning = false
      
      this.ngOnInit()
    })
  }
}

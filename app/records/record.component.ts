import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, ElementRef } from '@angular/core'
import { NgClass } from '@angular/common'
import { Router, ActivatedRoute } from '@angular/router'
import { RecordService } from './../services/record.service'
import { FormService } from './../services/form.service'
import { MeService } from './../services/me.service'
import { Record, Signature, Field } from './../types/types'

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
          <p *ngIf="field.value && ( field.value.selectedValues || field.value.titles)">
            <record-data-display [(ngModel)]="field.value"></record-data-display>
          </p>
        </td>
      </tr>
    </tbody>
  </table>
  <h3 class="ui header">簽核狀況</h3>
  <table class="ui table">
    <tbody>
      <tr *ngIf="record && record.signatures && this.userId">
        <td *ngIf="record.status == 'declined' && record.signatures[0].personnel == userId">
          <button class="ui teal button" (click)="update()">重新填寫</button>
        </td>
        <td *ngFor="let signature of record.signatures">
          <div class="ui list">
            <div *ngIf="signature.signed" class="item">
              <i class="user icon"></i>
              <div class="content">{{signature.name}}</div>
            </div>
            <div *ngIf="signature.signed" class="item">
              <i class="calendar icon"></i>
              <div class="content">{{signature.timestamp | date}}</div>
            </div>
            <div class="ui form" *ngIf="canSign(signature)">
              <div class="commented field" style="margin-bottom: 0; margin-right: 1em;">
                <label>簽名</label>
                <input class="commented-input" type="text" [ngModelOptions]="{ standalone: true }" [(ngModel)]="signatureText">
                <label class="field-comment">{{signatureMatchText}}</label>
              </div>
              <button type="button" style="position: relative; bottom: 2em;" class="ui green button"
                [class.loading]="isSigning" [disabled]="signatureText != signatureMatchText" (click)="sign()">簽章</button>
              <button type="button" style="position: relative; bottom: 2em;" class="ui red button"
                [class.loading]="isReturning" (click)="decline()">退回</button>
            </div>
            <div *ngIf="!signature.signed && !canSign(signature)" class="item">
              <i class="user icon"></i>
              <div class="content">{{signature.name}}</div>
            </div>
            <div *ngIf="!signature.signed && !canSign(signature)" class="item">
              <i class="delete icon"></i>
              <div class="content">尚未簽核</div>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  
  <!--
  <h3 class="ui header">Merged</h3>
  <div><pre>{{merged | json}}</pre></div>
  <h3 class="ui header">Schema</h3>
  <div><pre>{{schema | json}}</pre></div>
  <h3 class="ui header">Record</h3>
  <div><pre>{{record | json}}</pre></div>
  -->
  `,
  styles: [
    '#record_display th:first-child { padding: .78571429em; width: 8em; }',
    '#record_display > tbody > tr { vertical-align: initial; }',
    '#record_display > tbody > tr > th { color: initial; }',
    `.commented.field {
      text-align: left;
      display: inline-block;
      margin-right: 2em;
    }
    `,
    `label.field-comment {
      color: rgb(180, 180, 180);
      font-weight: normal;
      font-style: italic;
    }
    `,
    `.commented-input {
      width: 10em !important;
    }`
  ]
})

export class RecordComponent implements OnInit {
  private userId: string
  private id: string
  private schema: Field[] | null
  private record: Record | null
  private merged: any | null

  private isSigning: boolean = false
  private isReturning: boolean = false

  private signatureMatchText: string
  private signatureText: string

  constructor(private route: ActivatedRoute,
    private router: Router,
    private formService: FormService,
    private recordService: RecordService,
    private meSerivce: MeService) { }
  async ngOnInit() {
    this.id = this.route.snapshot.params['id']
    this.schema = null
    this.record = null
    this.merged = []

    this.signatureText = ''
    this.signatureMatchText = ''

    this.meSerivce.user.subscribe(u => {
      if (u) {
        this.userId = u.id
        this.signatureMatchText = u.name
      }
    })
    // 載入資料
    this.record = await this.recordService.record(this.id)
    let form = await this.formService.form(this.record.formId, "Filling", this.record.revisionNumber)
    this.schema = form.revision.fields

    // 合併資料
    function get_data(field: Field, content: any) {
      switch (field.type) {
        case 'shortText':
        case 'longText':
          return content
        case 'date':
          let formatter = new Intl.DateTimeFormat()
          let dateValue = new Date(content)
          return formatter.format(dateValue)
        case 'time':
          let timeValue = content
          return `${timeValue.hour} 時 ${timeValue.minute} 分`
        case 'options':
          type OptionValueType = { [optionId: string]: { values: any, selected: boolean } }
          let optionValue: OptionValueType = content
          let value = {
            selectedValues: [],
            nestedValues: []
          }
          for (let _option of field.metadata.options) {
            let option = <{ fields: Field[], value: string, id: string }>_option
            if (!optionValue[option.id].selected) { continue }

            let v = optionValue[option.id].values
            value.selectedValues.push(option.value)
            option.fields = option.fields.map(f => new Field(f))
            value.nestedValues.push(merge(option.fields, v))
          }

          return value
        case 'table':
          let columns: Field[] = field.metadata.fields.map(field => new Field(field))
          let rows: { [columnId: string]: any }[] = content

          return {
            titles: columns.map(field => field.name),
            values: rows.map(row => {
              // row is field id => data
              let data = []
              for (let column of columns) {
                data.push(get_data(column, row[column.id]))
              }

              return data
            })
          }
      }
    }
    function merge(schema: Field[], contents: any) {
      let r = []
      for (let field of schema) {
        let result: any = {
          title: field.name,
          value: get_data(field, contents[field.id])
        }
        r.push(result)
      }
      return r
    }

    this.merged = merge(this.schema, this.record.contents)
  }
  canSign(signature: Signature): boolean {
    if (signature.personnel == this.userId && !signature.signed && this.record.status == 'awaiting_review') {
      return true
    }
    return false
  }
  sign(): void {
    this.isSigning = true
    this.recordService.sign(this.id, this.signatureText).then(() => {
      this.isSigning = false
      this.ngOnInit()
    })
  }
  async decline() {
    try {
      this.isReturning = true
      await this.recordService.return(this.record.id)
      this.router.navigate(['..'], { relativeTo: this.route })
    } catch (err) {
      console.error('發生錯誤，無法退回')
    }
  }
  update() {
    this.router.navigate(['../update/', this.id], { relativeTo: this.route })
  }
}

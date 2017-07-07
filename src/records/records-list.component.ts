import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, ElementRef } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { RecordService } from './../services/record.service'
import { Record, Signature, Field } from './../types/types'

@Component({
  template: `
  <h2 class="ui header">文件簽核紀錄</h2>
  <div class="ui basic segment" style="padding: 0;" [class.loading]="isLoadingRecords">
    <table class="ui sortable selectable striped table">
      <thead>
        <tr>
          <th>文件編號</th>
          <th>文件名稱</th>
          <th>記錄編號</th>
          <th>填表人</th>
          <th>填表日期</th>
          <th>狀態</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let record of records" (click)="view(record)">
          <td>{{record.formIdentifier}}</td>
          <td>{{record.formName}}</td>
          <td>{{record.generatedSerial}}</td>
          <td>{{record.ownerName}}</td>
          <td>{{record.created | date}}</td>
          <td>
            <span *ngIf="record.signatures.length == 1">
              不需要簽核
            </span>
            <span *ngIf="record.signatures.length > 1">
              {{signature_description(record.signatures[1])}}
            </span><br *ngIf="record.signatures.length > 2">
            <span *ngIf="record.signatures.length > 2">
              {{signature_description(record.signatures[2])}}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  `
})
export class RecordsListComponent implements OnInit {
  private isLoadingRecords: boolean
  private records: Record[]

  constructor(private recordService: RecordService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.isLoadingRecords = true
    this.records = []
    this.recordService.records().then(records => {
      this.isLoadingRecords = false
      console.dir(records)
      this.records = records
    }).catch(err => {
      console.error('無法取得紀錄')
      console.error(err)
    })
  }
  view(record: Record) {
    this.router.navigate([record.id], { relativeTo: this.route })
  }
  statusTooltip(record: Record): string {
    let total = record.signatures.length
    let signed = record.signatures.reduce(($0, $1) => $0 + ($1.signed ? 1 : 0), 0)
    let waiting = record.signatures.find(signature => !signature.signed)
    if (record.status == 'awaiting_review') {
      return `${total} 人中的 ${signed} 人已經完成簽核，等待${waiting.name}中。`
    } else {
      return null
    }
  }
  private signature_description(signature: Signature): string {
    return `${signature.name}${signature.signed ? "已經簽名" : "未簽名"}`
  }
}

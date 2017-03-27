import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, ElementRef } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { RecordService } from './../services/record.service'
import { Record, Signature, Field } from './../types/types'

@Component({
  template: `
  <h2 class="ui header">紀錄</h2>
  <div class="ui basic segment" style="padding: 0;" [class.loading]="isLoadingRecords">
    <table class="ui sortable selectable striped table">
      <thead>
        <tr>
          <th (click)="sortBy('generatedSerial')" [ngClass]="styleClasses('generatedSerial')" #identifier>記錄編號</th>
          <th (click)="sortBy('formName')" [ngClass]="styleClasses('formName')" #form>表單</th>
          <th (click)="sortBy('created')" [ngClass]="styleClasses('created')" [class]="" #date>填表日期</th>
          <th (click)="sortBy('ownerName')" [ngClass]="styleClasses('ownerName')" #filler>填表人</th>
          <th (click)="sortBy('status')" [ngClass]="styleClasses('status')" #status>狀態</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let record of records" (click)="view(record)">
          <td>{{record.generatedSerial}}</td>
          <td>{{record.formName}}</td>
          <td>{{record.created | date}}</td>
          <td>{{record.ownerName}}</td>
          <td [attr.data-tooltip]="statusTooltip(record)">{{record.status | status}}</td>
        </tr>
      </tbody>
    </table>
  </div>
  `
})
export class RecordsListComponent implements OnInit {
  private isLoadingRecords: boolean
  private records: Record[]

  private sort: string = 'descending'
  private sortKeyPath: string = 'created'

  constructor(private recordService: RecordService, private router: Router, private route: ActivatedRoute) { }
  signed(signatures: Signature[]): number {
    return signatures.filter(sig => sig.signed).length
  }
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
  sortBy(keyPath: string): void {
    if (this.sortKeyPath == keyPath) {
      this.sort = this.sort == 'ascending' ? 'descending' : 'ascending'
      this.records.reverse()
    } else {
      this.sort = 'descending'
      this.sortKeyPath = keyPath

      // Sort By The Specific Key Path Descendingly
      this.records.sort((lhs, rhs) => {
        if (lhs[keyPath] > rhs[keyPath]) return -1;
        else return 1;
      })
    }
  }
  styleClasses(keyPath: string): any {
    if (keyPath == this.sortKeyPath) {
      let classes = {}
      classes['sorted'] = true
      classes[this.sort] = true
      return classes
    } else {
      return {}
    }
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
}

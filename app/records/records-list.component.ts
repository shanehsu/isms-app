import {Component, OnInit, ViewChildren, QueryList, AfterViewInit, ElementRef} from '@angular/core'
import {Router, ActivatedRoute} from '@angular/router'
import {RecordService}             from './../services/record.service'
import {PopulatedRecord, Record, Signature, Field} from './../types/types'

interface DisplayedRecord {
  id: string
  identifier: string
  formDisplayName: string
  filled: Date
  form: {
    id: string,
    name: string
  }
  revision: {
    id: string,
    version: number
  }
  owner: {
    id: string,
    name: string
  }
  owningUnit: {
    id: string,
    name: string
  }
  signatures: {
    unsigned: number,
    signed: number,
    signatures: Signature[]
  }
}

@Component({
  template: `
  <h2 class="ui header">紀錄</h2>
  <div class="ui basic segment" style="padding: 0;" [class.loading]="isLoadingRecords">
    <table class="ui sortable selectable striped table">
      <thead>
        <tr>
          <th (click)="sortBy('identifier')" [ngClass]="styleClasses('identifier')" #identifier>流水號</th>
          <th (click)="sortBy('form.name')" [ngClass]="styleClasses('form.name')" #form>表單</th>
          <th (click)="sortBy('filled')" [ngClass]="styleClasses('filled')" [class]="" #date>填表日期</th>
          <th (click)="sortBy('owner.name')" [ngClass]="styleClasses('owner.name')" #filler>填表人</th>
          <th (click)="sortBy('signatures.signed')" [ngClass]="styleClasses('signatures.signed')" #status>簽核狀況</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let record of records" (click)="view(record)">
          <td>{{record.identifier}}</td>
          <td>{{record.formDisplayName}}</td>
          <td>{{record.filled | date}}</td>
          <td>{{record.owner.name}}</td>
          <td>{{record.signatures.signed}}/{{record.signatures.signed + record.signatures.unsigned}}</td>
        </tr>
      </tbody>
    </table>
  </div>
  `
})
export class RecordsListComponent implements OnInit {
  private isLoadingRecords: boolean
  private records: DisplayedRecord[]
  
  private sort: string = 'descending'
  private sortKeyPath: string = 'filled'
  
  constructor(private recordService: RecordService, private router: Router, private route: ActivatedRoute) {}
  signed(signatures: Signature[]): number {
    return signatures.filter(sig => sig.signed).length
  }
  ngOnInit(): void {
    this.isLoadingRecords = true
    this.records = []
    this.recordService.records().then(records => {
      this.isLoadingRecords = false
      this.records = records.map(record => {
        return {
          id: record.id,
          identifier: `${record.owningUnit.identifier}-${record.created.getUTCFullYear() - 1911}-${record.serial}`,
          formDisplayName: `${record.form.name} ${record.revision.version.toFixed(1)}`,
          filled: record.created,
          form: {
            id: record.form.id,
            name: record.form.name
          },
          revision: {
            id: record.revision.id,
            version: record.revision.version
          },
          owner: {
            id: record.owner.id,
            name: record.owner.name
          },
          owningUnit: {
            id: record.owningUnit.id,
            name: record.owningUnit.name
          },
          signatures: {
            unsigned: record.signatures.filter(sig => !sig.signed).length,
            signed: record.signatures.filter(sig => sig.signed).length,
            signatures: record.signatures
          }
        }
      })
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
      switch (this.sortKeyPath) {
        case 'identifier':
          this.records.sort((lhs, rhs) => {
            if (lhs.identifier > rhs.identifier) return -1;
            else return 1;
          })
          break;
        case 'form.name':
          this.records.sort((lhs, rhs) => {
            if (lhs.form.name == rhs.form.name) return 0;
            if (lhs.form.name > rhs.form.name) return -1;
            else return 1;
          })
          break;
        case 'filled':
          this.records.sort((lhs, rhs) => {
            if (lhs.filled == rhs.filled) return 0;
            if (lhs.filled > rhs.filled) return -1;
            else return 1;
          })
          break;
        case 'owner.name':
          this.records.sort((lhs, rhs) => {
            if (lhs.owner.name == rhs.owner.name) return 0;
            if (lhs.owner.name > rhs.owner.name) return -1;
            else return 1;
          })
          break;
        case 'signatures.signed':
          this.records.sort((lhs, rhs) => {
            if (lhs.signatures.signed == rhs.signatures.signed) return 0;
            if (lhs.signatures.signed > rhs.signatures.signed) return -1;
            else return 1;
          })
          break;
      }
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
  view(record: DisplayedRecord) {
    this.router.navigate([record.id], {relativeTo: this.route})
  }
}
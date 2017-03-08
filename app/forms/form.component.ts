import { Component, OnInit, forwardRef, Inject, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormService, AssociatedAgent } from './../services/form.service'
import { RecordService } from './../services/record.service'
import { MeService } from './../services/me.service'
import { Form } from './../types/types'
import { Field } from './../types/types'

import { Router, ActivatedRoute } from '@angular/router'

@Component({
  template: `
  <div class="container">
    <div *ngIf="fields">
      <form class="ui form">
        <form-fields [fields]="fields" [(ngModel)]="data" name="fields"></form-fields>
        <div style="margin-top: 1em; text-align: right;">
          <div class="commented field " style="position: relative; bottom: 2em;" *ngIf="needsAssociatedAgent">
            <label>相關承辦人</label>
            <select id="associated" class="ui dropdown" [(ngModel)]="associatedAgent" [ngModelOptions]="{ standalone: true }" #associatedViewOptionSelect>
              <option *ngFor="let agent of associatedAgents; let i = index" [value]="agent.id">{{agent.name}}</option>
            </select>
          </div>
          <div class="commented field">
            <label>簽名</label>
            <input class="commented-input" type="text" [ngModelOptions]="{ standalone: true }" [(ngModel)]="signature">
            <label class="field-comment">{{signatureMatch}}</label>
          </div>
          <button id="submitButton" type="button" (click)="submit()" class="ui yellow button" [disabled]="signature != signatureMatch || signature == ''">送出</button>
        </div> 
      </form>
      
      <div class="ui raised segment" *ngIf="true || debug">
        <h2 class="ui header">除錯資訊</h2>
        <h3 class="ui header">欄位 JSON</h3>
        <pre>{{fields | json}}</pre>
        <h2 class="card-title">除錯資訊</h2>
        <h3 class="card-subtitle text-muted">表單 JSON</h3>
        <pre>{{data | json}}</pre>
      </div>
    </div>
    <div class="ui raised segment" *ngIf="!_nested && debug">
      <h2 class="card-title">除錯資訊</h2>
      <h3 class="card-subtitle text-muted">表單 JSON</h3>
      <pre>{{data | json}}</pre>
    </div>
  </div>`,
  styles: [
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
    }`,
    `#submitButton {
      position: relative;
      bottom: 2em;
    }
    `
  ]
})

export class FormComponent implements OnInit {
  // 簽名
  private signature: string
  private signatureMatch: string

  // 承辦人
  private needsAssociatedAgent: boolean
  private associatedAgents: AssociatedAgent[] | null
  private associatedAgent: string

  private data: any
  private fields: Field[]
  private id: string

  @ViewChild('associatedViewOptionSelect') associatedViewOptionSelect: ElementRef
  log(_: any) { console.dir(_) }
  ngOnInit() {
    this.data = []
    this.id = this.route.snapshot.params['id']
    this.fields = []
    this.signature = ''
    this.signatureMatch = ''
    this.associatedAgent = ''
    this.needsAssociatedAgent = true

    this.identityService.user.subscribe(user => {
      if (user) {
        this.signatureMatch = user.name
        if (user.group == 'vendors') {
          this.formService.agents().then(agents => {
            this.associatedAgents = agents

            // Wait until next cycle
            window.setTimeout(() => {
              if (this.associatedAgents.length > 0) {
                let element: HTMLSelectElement = this.associatedViewOptionSelect.nativeElement
                if (element) {
                  let e: any = $(element)
                  e.dropdown()
                }
                this.associatedAgent = this.associatedAgents[0].id
              }
            }, 200)
          }).catch(console.error)
        } else {
          this.needsAssociatedAgent = false
        }
      }
    })

    this.formService.form(this.id, "Filling").then(form => {
      this.data = this.recordService.emptyRecordForFields(form.revision.fields)
      this.fields = form.revision.fields
    }).catch(console.error)
  }

  submit() {
    if (this.needsAssociatedAgent) {
      this.recordService.submit(this.id, this.data, this.signature, this.associatedAgent).then(recordID => {
        console.dir(`已經建立紀錄：${recordID}`)
        this.router.navigate(['..'], { relativeTo: this.route })
      }).catch(err => {
        console.error('無法建立表單紀錄')
        console.error(err)
      })
    } else {
      this.recordService.submit(this.id, this.data, this.signature).then(recordId => {
        console.dir(`已經建立紀錄：${recordId}`)
        this.router.navigate([`../../records/${recordId}`], { relativeTo: this.route })
      }).catch(err => {
        console.error('無法建立表單紀錄')
        console.error(err)
      })
    }
  }

  constructor(
    private formService: FormService,
    private recordService: RecordService,
    private identityService: MeService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject("app.debug") private debug) { }
}

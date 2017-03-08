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
          <div class="commented field">
            <label>簽名</label>
            <input class="commented-input" type="text" [ngModelOptions]="{ standalone: true }" [(ngModel)]="signature">
            <label class="field-comment">{{signatureMatch}}</label>
          </div>
          <button id="submitButton" type="button" (click)="submit()" class="ui yellow button"
            [disabled]="signature != signatureMatch || signature == ''" [class.loading]="submitting">送出</button>
        </div>
      </form>
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

export class RecordUpdateComponent implements OnInit {
  // 簽名
  private signature: string
  private signatureMatch: string

  private data: { [fieldId: string]: any }
  private fields: Field[]
  private recordId: string

  private submitting: boolean = false

  @ViewChild('associatedViewOptionSelect') associatedViewOptionSelect: ElementRef

  async ngOnInit() {
    this.signature = ''
    this.data = {}
    this.fields = []

    this.recordId = this.route.snapshot.params['id']
    this.identityService.user.subscribe(user => {
      if (user) {
        this.signatureMatch = user.name
      }
    })

    let record = await this.recordService.record(this.recordId)
    let form = await this.formService.form(record.formId, "Filling", record.revisionNumber)

    this.data = record.contents
    this.fields = form.revision.fields
  }

  async submit() {
    try {
      this.submitting = true
      await this.recordService.edit(this.recordId, this.signature, this.data)
      this.router.navigate(['../../', this.recordId], { relativeTo: this.route })
    } catch (err) {
      console.error(err)
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

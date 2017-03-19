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
          <button id="submitButton" type="button" (click)="submit()" class="ui yellow button" [class.loading]="submitting">送出</button>
        </div>
      </form>
    </div>
  </div>`,
  styles: [
    `#submitButton {
      position: relative;
      bottom: 2em;
    }
    `
  ]
})

export class RecordUpdateComponent implements OnInit {
  private data: { [fieldId: string]: any }
  private fields: Field[]
  private recordId: string

  private submitting: boolean = false

  @ViewChild('associatedViewOptionSelect') associatedViewOptionSelect: ElementRef

  async ngOnInit() {
    this.data = {}
    this.fields = []

    this.recordId = this.route.snapshot.params['id']

    let record = await this.recordService.record(this.recordId)
    let form = await this.formService.form(record.formId, "Filling", record.revisionNumber)

    this.data = record.contents
    this.fields = form.revision.fields
  }

  async submit() {
    try {
      this.submitting = true
      await this.recordService.edit(this.recordId, this.data)
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

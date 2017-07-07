// Angular 2
import { Input, Component, OnInit, AfterViewInit } from '@angular/core'

// 路由器
import { Router, ActivatedRoute } from '@angular/router'

// 服務
import { FormService } from './../../services/form.service'

// 基本型態
import { Form, FormRevision } from './../../types/types'

@Component({
  template: `
  <form *ngIf="form" class="ui padded raised form segment" (ngSubmit)="submit()" #formForm="ngForm" [class.loading]="isLoadingForm">
    <h2 class="ui header">基本資訊</h2>
    <div class="field">
      <label>ID</label>
      <p>{{form.id}}</p>
    </div>
    <div class="field">
      <label>表單 ID</label>
      <input type="text" [(ngModel)]="form.identifier" name="identifier" required>
    </div>
    <div class="field">
      <label>名稱</label>
      <input type="text" [(ngModel)]="form.name" name="name" required>
    </div>
    <div style="text-align: right;">
      <button type="button" class="ui basic button" (click)="cancel()">返回</button>
      <button type="submit" id="update_button" class="ui basic button" [class.green]="formForm.form.valid" [class.red]="!formForm.form.valid"
        [disabled]="!formForm.form.valid" data-content="該按鈕只能更新表單 ID 以及表單名稱。" [class.loading]="isUpdating">更新</button>
    </div>
  </form>

  <div class="ui raised padded segment" [class.loading]="isLoadingForm">
    <h2 class="ui header">版本</h2>
    <div class="ui top attached tabular menu">
      <ng-template ngIf="form">
        <a *ngFor="let revision of form.revisions" class="link item" [class.active]="isActiveRevision(revision)" (click)="selectRevision(revision)">
          <i *ngIf="!revision" class="notched circle loading icon"></i>
          <span>{{revision?.number?.toFixed(1)}}</span>
        </a>
      </ng-template>
      <a class="link item" (click)="createRevision()" [class.active]="form && form.revisions.length == 0">
        <i *ngIf="requestingNewRevision" class="notched circle loading icon"></i>
        <i *ngIf="!requestingNewRevision" class="plus icon"></i>
      </a>
    </div>
    <div class="ui bottom attached segment">
      <p *ngIf="form && form.revisions.length == 0">沒有版本</p>
      <revision *ngIf="form.revisions.length != 0" [form-id]="form.id" [(ngModel)]="selectedRevision"
        (publish)="publishRevision($event)" (update)="updateRevision($event)" (delete)="deleteRevision()"></revision>
    </div>
  </div>
  `
})

export class FormDetailComponent implements OnInit {
  private id: string
  private form: Form | null
  private isLoadingForm: boolean
  private isUpdating: boolean

  private selectedRevision: FormRevision
  private revisionNumber: number

  private requestingNewRevision: boolean

  constructor(private formService: FormService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.form = this.formService.placeholder
    this.refresh()
  }

  refresh() {
    this.isUpdating = false
    this.isLoadingForm = true
    this.requestingNewRevision = false
    // 取得表單 ID
    this.id = this.route.snapshot.params['id']

    // 載入表單
    this.formService.form(this.id, "Management").then(form => {
      this.isLoadingForm = false
      this.form = form

      let revisions = this.form.revisions
      if (revisions.length > 0) {
        this.selectRevision(revisions[revisions.length - 1])
      }
    }).catch(err => {
      console.error('無法載入表單')
      console.error(err)
    })
  }

  ngAfterViewInit() {
    ($('#update_button') as any).popup({
      inline: true
    });
  }

  submit(): void {
    this.isUpdating = true
    this.formService.update(this.form)
      .then(() => { this.isUpdating = false })
      .catch(console.error)
  }

  cancel(): void {
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  // 表單版本操作
  isActiveRevision(revision: FormRevision): boolean {
    return revision == this.selectedRevision
  }

  // 選擇成為目前表單版本
  selectRevision(revision: FormRevision) {
    this.selectedRevision = revision
    this.revisionNumber = revision.number
  }

  createRevision(): void {
    this.requestingNewRevision = true
    this.formService.createRevision(this.id).then(id => {
      this.refresh()
    }).catch(err => {
      console.error('無法新增版本')
      console.error(err)
    })
  }

  publishRevision(donePublishing: () => void) {
    this.selectedRevision.published = true
    this.updateRevision(donePublishing)
  }

  updateRevision(doneUpdating: () => void) {
    let revisionToUpdate = this.selectedRevision

    this.formService.updateRevision(this.id, this.revisionNumber, revisionToUpdate).then(() => {
      doneUpdating()
    }).catch(err => {
      console.error('更新失敗')
      console.error(err)
    })
  }

  deleteRevision() {
    let revisionToDelete = this.selectedRevision

    this.formService.deleteRevision(this.id, this.revisionNumber).then(() => {
      this.form.revisions.splice(this.form.revisions.indexOf(revisionToDelete), 1)

      if (this.form.revisions.length >= 1) {
        let lastRevision = this.form.revisions[this.form.revisions.length - 1]
        this.selectRevision(lastRevision)
      }
    }).catch(err => {
      console.error('無法刪除版本')
      console.error(err)
    })
  }
}

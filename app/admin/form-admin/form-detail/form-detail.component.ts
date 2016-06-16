// Angular 2
import {Input, Component, OnInit} from '@angular/core'

// 路由器
import {Router, RouteSegment} from '@angular/router'

// 服務
import {FormService} from './../../../services/form.service'

// 基本型態
import {Form, FormRevision} from './../../../types/types'

// 子表單
import {RevisionFormComponent} from './revision-form/revision-form.component'

@Component({
  selector: 'form-detail',
  templateUrl: '/app/admin/form-admin/form-detail/form-detail.template.html',
  providers: [FormService],
  directives: [RevisionFormComponent]
})

export class FormDetailComponent implements OnInit {
  private _id: string
  private _form: Form
  
  private _revisions: FormRevision[] = []
  private _revision: FormRevision
  
  constructor(private _formService: FormService,
              private _routeSegment: RouteSegment,
              private _router: Router) {}
  
  /**
   * reload_form() 函數
   * 
   * 根據 `_id` 取得表單資料，並存入 `_form` 變數。
   * 
   * 依照指定的參數，可能更動 `_currentRevision`, `_revisions`,
   * `_revision` 這三個與表單版本有關的變數。
   * 
   * isInitialPull 將會載入表單版本，進行初始化設定並顯示表單版本的表單。
   */
  reload_form(isInitialPull: boolean = false): void {
    this._formService.form(this._id)
        .then(form => {
          this._form = form
          if (isInitialPull) {
            this.reload_revisions(true)
          }
        }).catch(console.error)
  }
  
  /**
   * reload_revisions() 函數
   * 
   * 根據目前表單變數 `_form` 所提供的表單版本 ID，載入所有表單版本，
   * 並儲存到 `_revisions` 變數中。
   * 
   * isInitialPull 進行初始化設定並顯示表單版本的表單。
   */
  reload_revisions(isInitialPull: boolean = false): void {
    this._formService.form(this._id)
      .then(form => {
        let revisionIDs = form.revisions
        this._revisions = []

        revisionIDs.forEach((revisionID, index) => {
          this._formService.revision(this._id, revisionID)
            .then(revision => {
              this._revisions[index] = revision
            
              // 若需要初始化
              if (isInitialPull && index == revisionIDs.length - 1) {
                this._revision = this._revisions[index]
              }
            }).catch(console.error)
        })
      }).catch(console.error)
    
    // 先清空
    this._revisions = []
  }
  
  /**
   * 重新載入目前的表單版本
   */
  reload_revision(): void {
    let index = this._revisions.findIndex(revision => revision._id == this._revision._id)
    
    this._formService.revision(this._id, this._revisions[index]._id)
        .then(revision => {
          this._revisions[index] = revision
          this._revision = this._revisions[index]
        }).catch(console.error)
  }
  
  ngOnInit() {
    // 載入空資料
    this._revision = <FormRevision>{}
    this._form = <Form>{}
    
    // 取得表單 ID
    this._id = this._routeSegment.getParam('id')
    
    // 取得表單資訊
    this.reload_form(true)
  }
  
  submit(): void {
    this._formService.update(this._form)
        .then(() => this._router.navigate(['/admin/form']))
        .catch(console.error)
  }
  
  cancel(): void {
    this._router.navigate(['/admin/form'])
  }
  
  // 表單版本操作
  
  // 選單列樣式判斷
  isActiveRevision(revision: FormRevision): boolean {
    return revision == this._revision
  }
  
  // 選擇成為目前表單版本
  select_revision(revision: FormRevision) {
    this._revision = revision
  }
  
  new_revision(): void {
    this._formService.newRevision(this._id)
        .then((id) => {
          this.reload_revisions(true)
        }).catch(console.error)
  }
}

// Angular 2
import {Input, Component, OnInit} from 'angular2/core'

// 路由器
import {Router, RouteParams} from 'angular2/router'

// 服務
import {FormService} from './../../../services/form.service'

// 基本型態
import {Form, FormRevision} from './../../../types/types'

@Component({
  selector: 'form-detail',
  templateUrl: '/app/admin/form-admin/form-detail/form-detail.template.html',
  providers: [FormService]
})

export class FormDetailComponent implements OnInit {
  private _id: string
  private _form: Form
  
  private _currentRevision: string = ''
  private _revisions: FormRevision[] = []
  private _revision: FormRevision
  
  constructor(private _formService: FormService,
              private _routeParams: RouteParams,
              private _router: Router) {}
  
  refresh_data(): void {
    this._formService.form(this._id)
        .then(form => {
          this._form = form
          
          if (form.revisions.length == 0) this._revision = <FormRevision>{}
          
          // 若是重新更新
          if (this._currentRevision == '') this._currentRevision = form.revisions[form.revisions.length - 1]
          
          // 載入表單版本
          this._revisions = []
          form.revisions.forEach((revisionID, index) => {
            this._formService.revision(this._id, revisionID).then(revision => {
              this._revisions[index] = revision
              if (revision._id == this._currentRevision) this._revision = this._revisions[index]
            }).catch(console.error)
          })
        })
        .catch(console.error)
  }
  
  ngOnInit() {
    // 載入空資料
    this._revision = <FormRevision>{}
    this._form = <Form>{}
    this._id = this._routeParams.get('id')
    
    this.refresh_data()
  }
  
  submit(): void {
    this._formService.update(this._form)
        .then(() => this._router.navigate(['FormList']))
        .catch(console.error)
  }
  
  cancel(): void {
    this._router.navigate(['FormList'])
  }
  
  // 表單版本操作
  
  isActiveRevision(id: string): boolean {
    return id == this._currentRevision
  }
  
  new_revision(): void {
    this._formService.newRevision(this._id)
        .then((id) => {
          this.refresh_data()
          this._currentRevision = id
        })
        .catch(console.error)
  }
  
  edit_revision(id: string): void {
    this._currentRevision = id
    let index = this._revisions.findIndex(revision => revision._id == this._currentRevision)
    this._revision = this._revisions[index]
  }
  
  submit_revision(): void {
    let index = this._revisions.findIndex(revision => revision._id == this._currentRevision)
    this._formService.updateRevision(this._id, this._revisions[index])
        .then(() => this.refresh_data())
        .catch(console.error)
  }
  
  delete_revision(): void {
    // this._revisions = []
    this._formService.deleteRevision(this._id, this._currentRevision).then(() => {
      this._currentRevision = ''
      this.refresh_data()
    }).catch(console.error)
  }
}

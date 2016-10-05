// Angular 2
import {Self, Input, Output, Component, EventEmitter, OnInit, OnChanges, forwardRef, AfterViewInit, ViewChildren, QueryList} from '@angular/core'
import {ControlValueAccessor, NgModel} from '@angular/forms'

// 服務
import {FormService} from './../../services/form.service'

// 基本型態
import {Field, FormRevision} from './../../types/types'

// 子元件
import {FieldComponent} from './field.component'

@Component({
  selector: 'revision',
  template: `
  <form id="revisionForm" class="ui form" (ngSubmit)="submit_revision()" #revisionForm="ngForm">
    <div class="field">
      <label>ID</label>
      <p>{{_revision?._id}}</p>
    </div>
    <div class="field">
      <label>已發佈</label>
      <p>{{_revision?.published ? '是' : '否'}}</p>
    </div>
    <div class="field">
      <label>版本</label>
      <input type="number" min="1.0" step="0.1" [(ngModel)]="_revision.revision" name="revision" required>
    </div>

    <div class="field">
      <label>簽核</label>
      <div class="inline fields">
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" name="signaturesRadio" value="false" [checked]="_revision.signatures == false" (change)="_revision.signatures = false">
            <label>不需要</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" name="signaturesRadio" value="true" [checked]="_revision.signatures == true" (change)="_revision.signatures = true">
            <label>需要</label>
          </div>
        </div>
      </div>
    </div>

    <div class="field">
      <label>組長簽核</label>
      <div class="inline fields">
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" name="officerSignatureRadio" value="false" [checked]="_revision.officerSignature == false" (change)="_revision.officerSignature = false">
            <label>不需要</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" name="officerSignatureRadio" value="true" [checked]="_revision.officerSignature == true" (change)="_revision.officerSignature = true">
            <label>需要</label>
          </div>
        </div>
      </div>
    </div>

    <div class="field">
      <label>權限</label>
      <div class="inline fields">
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" name="groupRadio" value="1" [checked]="_revision.group == 1" (change)="_revision.group = 1">
            <label>管理員</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" name="groupRadio" value="2" [checked]="_revision.group == 2" (change)="_revision.group = 2">
            <label>資訊安全人員</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" name="groupRadio" value="3" [checked]="_revision.group == 3" (change)="_revision.group = 3">
            <label>一般使用者</label>
          </div>
        </div>
      </div>
    </div>

    <div class="field">
      <label>機密性</label>
      <div class="inline fields">
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" name="secrecyLevelRadio" value="1" [checked]="_revision.secrecyLevel == 1" (change)="_revision.secrecyLevel = 1">
            <label>機密</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" name="secrecyLevelRadio" value="2" [checked]="_revision.secrecyLevel == 2" (change)="_revision.secrecyLevel = 2">
            <label>敏感</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" name="secrecyLevelRadio" value="3" [checked]="_revision.secrecyLevel == 3" (change)="_revision.secrecyLevel = 3">
            <label>限閱</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" name="secrecyLevelRadio" value="4" [checked]="_revision.secrecyLevel == 4" (change)="_revision.secrecyLevel = 4">
            <label>一般</label>
          </div>
        </div>
      </div>
    </div>

    <div style="text-align: right;">
      <button type="button" class="ui teal basic button" (click)="publish_revision()" *ngIf="!_revision.published" [class.loading]="isPublishing">發佈</button>
      <button type="button" class="ui red basic button" (click)="delete_revision()" *ngIf="!_revision.published" [class.loading]="isDeleting">刪除</button>
      <button type="submit" id="update_button" class="ui basic button" [class.green]="revisionForm.form.valid" [class.red]="!revisionForm.form.valid"
        [disabled]="!revisionForm.form.valid" [class.loading]="isUpdating">更新</button>
    </div>
  </form>

  <div class="ui secdion divider"></div>

  <div class="ui basic segment" [class.loading]="isLoadingFields">
    <h3 class="ui header" style="clear: none;">表單欄位</h3>
    <a class="link" (click)="toggleCollapse()" style="float: right;">展開／收合表單欄位</a>
    <p><small>每個版本有自己的欄位設計。</small></p>
    <div *ngIf="fields.length != 0" class="ui segments">
      <div class="ui segment" style="overflow: auto;" *ngFor="let _ of fields; let i = index; let coloring = odd;" [class.secondary]="coloring">
        <field *ngIf="fields[i]" [(ngModel)]="fields[i]" [update-button]="true" (reload)="reloadField(fields[i], $event)" (update)="updateField(fields[i], $event)" (delete)="deleteField(fields[i])"></field>
      </div>
    </div>
    <div style="text-align: center;">
      <button type="button" class="ui teal basic button" (click)="createField()" [class.loading]="isCreatingField">增加欄位</button>
    </div>
  </div>
  `
})

/**
 * 「表單版本」的表單元件
 */
export class RevisionComponent implements OnInit, OnChanges, ControlValueAccessor, AfterViewInit {
  // 輸入
  @Input('form-id') _formID: string
  // 輸出
  @Output('update') _shouldUpdate = new EventEmitter<() => void>()
  @Output('delete') _shouldDelete = new EventEmitter<null>()
  @Output('publish') _shouldPublish = new EventEmitter<() => void>()
  
  // 子元件
  @ViewChildren(FieldComponent) fieldFormComponents: QueryList<FieldComponent>
  
  // ControlValueAccessor Callbacks
  private change: (_: any) => void
  private touched: () => void
  
  private isDeleting: boolean
  private isPublishing: boolean
  private isUpdating: boolean
  private _revision: FormRevision
  
  private isCreatingField: boolean
  private fields: (Field | undefined)[] = []
  private isLoadingFields: boolean
  private areFieldsCollapsed: boolean

  // 服務
  // 簡單初始化
  constructor(private _formService: FormService, @Self() private _model: NgModel) {
    _model.valueAccessor = this
  }

  // 生命週期掛鉤
  ngOnInit() {
    this.isDeleting = false
    this.isPublishing = false
    this.isUpdating = false
    this.isLoadingFields = false
    this.areFieldsCollapsed = false
  }
  ngAfterViewInit() {
    ($('form#revisionForm * * * .ui.radio.checkbox') as any).checkbox()
  }
  ngOnChanges() {
  }

  // 收合子元件
  toggleCollapse(): void {
    let expectedState = !this.areFieldsCollapsed
    
    this.fieldFormComponents.forEach(fieldFormComponent => {
      fieldFormComponent.isCollapsed = expectedState
    })
    
    this.areFieldsCollapsed = expectedState
  }

  // 動作
  submit_revision(): void {
    this.isUpdating = true
    this._shouldUpdate.emit(() => { this.isUpdating = false; })
  }
  publish_revision(): void {
    this.isPublishing = true
    this._shouldPublish.emit(() => { this.isPublishing = false; })
  }
  delete_revision(): void {
    this.isDeleting = true
    this._shouldDelete.emit(null)
  }

  // ControlValueAccessor - 註冊函數
  registerOnChange(fn: (_: any) => void): void {
    this.change = fn
  }
  registerOnTouched(fn: () => void): void {
    this.touched = fn
  }

  // ControlValueAccessor - 接收資料
  writeValue(value: any): void {
    // 換到另外一個 Revision 了
    this.isDeleting = false
    this.isPublishing = false
    this.isUpdating = false
    this.isCreatingField = false
    
    if (!value) {
      this._revision = <FormRevision>{}
    } else {
      this._revision = value

      this.isLoadingFields = this._revision.fields.length > 0
      this.fields = this._revision.fields.map(_ => undefined)
      this._revision.fields.forEach((id, index) => {
        this._formService.field(this._formID, this._revision._id, id).then(field => {
          this.fields[index] = field

          if (this.fields.indexOf(undefined) < 0) {
            this.isLoadingFields = false
          }
        }).catch(err => {
          console.error('無法取得欄位')
          console.error(err)
        })
      })
    }
  }

  // SECTION - 欄位
  reloadField(field: Field, finishedReloading: () => void) {
    let id = field._id
    
    this._formService.field(this._formID, this._revision._id, id).then(fetchedField => {
      let index = this.fields.findIndex(field => field!._id == id)
      if (index >= 0) this.fields[index] = fetchedField
      finishedReloading()
    }).catch(err => {
      console.error('欄位載入失敗')
      console.error(err)
    })
  }
  updateField(field: Field, finishedUpdating: () => void) {
    this._formService.updateField(this._formID, this._revision._id, field).then(() => {
      console.log('欄位更新成功')
      finishedUpdating()
    }).catch(err => {
      console.error('欄位更新失敗')
      console.error(err)
    })
  }
  deleteField(field: Field) {
    this._formService.deleteField(this._formID, this._revision._id, field._id).then(() => {
      console.log('欄位刪除成功')
      
      this.fields.splice(this.fields.indexOf(field), 1)
    }).catch(err => {
      console.error('欄位刪除失敗')
      console.error(err)
    })
  }
  createField(field: Field) {
    this.isCreatingField = true
    this._formService.newField(this._formID, this._revision._id).then(id => {
      console.log('增加欄位成功，嘗試取得欄位')
      
      this._formService.field(this._formID, this._revision._id, id).then(field => {
        this.fields.push(field)
        this.isCreatingField = false
      }).catch(err => {
        console.error('取得剛剛增加的欄位失敗')
        console.error(err)
      })
    }).catch(err => {
      console.error('增加欄位失敗')
      console.error(err)
    })
  }
}

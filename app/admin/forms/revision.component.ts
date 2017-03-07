// Angular 2
import { Self, Input, Output, Component, EventEmitter, OnInit, OnChanges, forwardRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core'
import { ControlValueAccessor, NgModel } from '@angular/forms'

// 服務
import { FormService } from './../../services/form.service'

// 基本型態
import { Group } from './../../types/group'
import { Field, FormRevision } from './../../types/types'

// 子元件
import { FieldComponent } from './field.component'

@Component({
  selector: 'revision',
  template: `
  <form id="revisionForm" class="ui form" (ngSubmit)="submitrevision()" #revisionForm="ngForm">
    <div class="field">
      <label>ID</label>
      <p>{{revision?._id}}</p>
    </div>
    <div class="field">
      <label>已發佈</label>
      <p>{{revision?.published ? '是' : '否'}}</p>
    </div>
    <div class="field">
      <label>版本</label>
      <input type="number" min="1.0" step="0.1" [(ngModel)]="revision.number" name="number" required>
    </div>

    <div class="field">
      <label>簽核</label>
      <div class="inline fields">
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" name="signaturesRadio" value="false" [checked]="revision.signatures == false" (change)="revision.signatures = false">
            <label>不需要</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" name="signaturesRadio" value="true" [checked]="revision.signatures == true" (change)="revision.signatures = true">
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
            <input type="radio" name="skipImmediateChiefRadio" value="true" [checked]="revision.skipImmediateChief == true" (change)="revision.skipImmediateChief = true">
            <label>不需要</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" name="skipImmediateChiefRadio" value="false" [checked]="revision.skipImmediateChief == false" (change)="revision.skipImmediateChief = false">
            <label>需要</label>
          </div>
        </div>
      </div>
    </div>

    <div class="field">
      <label>權限</label>
      <div class="inline fields">
        <div class="field">
          <div class="ui checkbox">
            <input type="checkbox" name="groupCheckbox" [checked]="revision.groups.includes('admins')" (change)="toggleGroup('admins', $event)">
            <label>管理員</label>
          </div>
        </div>
        <div class="field">
          <div class="ui checkbox">
            <input type="checkbox" name="groupCheckbox" [checked]="revision.groups.includes('securityPersonnel')" (change)="toggleGroup('securityPersonnel', $event)">
            <label>資訊安全人員</label>
          </div>
        </div>
        <div class="field">
          <div class="ui checkbox">
            <input type="checkbox" name="groupCheckbox" [checked]="revision.groups.includes('users')" (change)="toggleGroup('users', $event)">
            <label>校內人士</label>
          </div>
        </div>
        <div class="field">
          <div class="ui checkbox">
            <input type="checkbox" name="groupCheckbox" [checked]="revision.groups.includes('vendors')" (change)="toggleGroup('vendors', $event)">
            <label>廠商</label>
          </div>
        </div>
      </div>
    </div>

    <div class="field">
      <label>機密性</label>
      <div class="inline fields">
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" name="secrecyRadio" value="1" [checked]="revision.secrecy == 1" (change)="revision.secrecy = 1">
            <label>機密</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" name="secrecyRadio" value="2" [checked]="revision.secrecy == 2" (change)="revision.secrecy = 2">
            <label>敏感</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" name="secrecyRadio" value="3" [checked]="revision.secrecy == 3" (change)="revision.secrecy = 3">
            <label>限閱</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" name="secrecyRadio" value="4" [checked]="revision.secrecy == 4" (change)="revision.secrecy = 4">
            <label>一般</label>
          </div>
        </div>
      </div>
    </div>

    <div style="text-align: right;">
      <button type="button" class="ui teal basic button" (click)="publishrevision()" *ngIf="!revision.published" [class.loading]="isPublishing">發佈</button>
      <button type="button" class="ui red basic button" (click)="deleterevision()" *ngIf="!revision.published" [class.loading]="isDeleting">刪除</button>
      <button type="submit" id="update_button" class="ui basic button" [class.green]="revisionForm.form.valid" [class.red]="!revisionForm.form.valid"
        [disabled]="!revisionForm.form.valid" [class.loading]="isUpdating" *ngIf="!revision.published">更新</button>
    </div>

    <pre>{{revision | json}}</pre>
  </form>

  <div class="ui secdion divider"></div>

  <div class="ui basic segment" [class.loading]="isLoadingFields">
    <h3 class="ui header" style="clear: none;">表單欄位</h3>
    <a class="link" (click)="toggleCollapse()" style="float: right;">展開／收合表單欄位</a>
    <p><small>每個版本有自己的欄位設計。</small></p>
    <div *ngIf="revision.fields.length != 0" class="ui segments">
      <div class="ui segment" style="overflow: auto;" *ngFor="let _ of revision.fields; let i = index; let coloring = odd;" [class.secondary]="coloring">
        <field [(ngModel)]="revision.fields[i]" [update-button]="false" (delete)="revision.fields.splice(i, 1)"></field>
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
  private revision: FormRevision

  private isCreatingField: boolean
  private isLoadingFields: boolean
  private areFieldsCollapsed: boolean

  // 服務
  // 簡單初始化
  constructor(private formService: FormService, @Self() private model: NgModel) {
    model.valueAccessor = this
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
    ($('form#revisionForm * * * .ui.checkbox') as any).checkbox()
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
  submitrevision(): void {
    this.isUpdating = true
    this._shouldUpdate.emit(() => { this.isUpdating = false; })
  }
  publishrevision(): void {
    this.isPublishing = true
    this._shouldPublish.emit(() => { this.isPublishing = false; })
  }
  deleterevision(): void {
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
      this.revision = this.formService.placeholderRevision
    } else {
      this.revision = value
    }
  }

  toggleGroup(group: Group, event: Event) {
    let sourceElement = event.srcElement as HTMLInputElement
    let value = sourceElement.checked

    if (value && !this.revision.groups.includes(group)) {
      // 加入
      this.revision.groups.push(group)
    } else if (!value && this.revision.groups.includes(group)) {
      // 移出
      this.revision.groups.splice(this.revision.groups.indexOf(group), 1)
    }
  }

  createField() {
    this.revision.fields.push(this.formService.placeholderField)
  }
}

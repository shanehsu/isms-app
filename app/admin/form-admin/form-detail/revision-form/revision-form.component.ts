// Angular 2
import {Input, Output, Component, EventEmitter, OnInit, OnChanges, forwardRef} from 'angular2/core'

// 服務
import {FormService} from './../../../../services/form.service'

// 基本型態
import {Field, FormRevision} from './../../../../types/types'

// 子元件
import {FieldsFormComponent} from './../fields-form/fields-form.component'
import {FieldsFormValueAccessor} from './../fields-form/fields-form-value-accessor.directive'

@Component({
  selector: 'revision-form',
  templateUrl: '/app/admin/form-admin/form-detail/revision-form/revision-form.template.html',
  directives: [FieldsFormComponent, FieldsFormValueAccessor]
})

/**
 * 「表單版本」的表單元件
 * 
 * 有兩個輸入，`form-id: string` 以及 `revision: FormRevision`，
 * 這個元件只負責顯示資料、讓使用者填寫資料，並讓使用者更新、刪除表單版本。
 * 
 * 當使用者完成特定動作後，會觸發兩種事件，`revisionDidUpdate` 或是
 * `formDidUpdate`，母元件應該在適當的時間做適當的回應。
 */
export class RevisionFormComponent implements OnInit, OnChanges {
  // 輸入
  // 決定要顯示什麼資料
  @Input('form-id')  _formID: string
  @Input('revision') _revision: FormRevision
  
  // 輸出
  @Output('revisionDidUpdate') _revisionDidUpdate = new EventEmitter<void>()
  @Output('formDidUpdate') _formDidUpdate = new EventEmitter<void>()
  
  private _fields: Field[] = []
  
  // 服務
  // 簡單初始化
  constructor(private _formService: FormService) {}
  
  ngOnInit() {}
  
  ngOnChanges() {
    // 當母元件載入不同的 FormRevision，更新欄位
    
    if (this._revision._id != undefined) {
      // 載入欄位
      this.loadField()
    }
  }
  
  // 更新表單
  // 結果 => 將會送出 `revisionDidUpdate` 事件
  // 母元件應該自己更新顯示的資料
  submit_revision(): void {
    this._formService.updateRevision(this._formID, this._revision)
        .then(() => this._revisionDidUpdate.emit(null))
        .catch(console.error)
  }
  
  // 刪除該表單版本
  // 結果 => 將會送出 `formDidUpdate` 事件
  // 母元件應該更新顯示的資料
  delete_revision(): void {
    this._formService.deleteRevision(this._formID, this._revision._id)
        .then(() => this._formDidUpdate.emit(null))
        .catch(console.error)
  }
  
  // 產生欄位
  loadField(): void {
    // 先清空
    this._fields = this._revision.fields.map(_ => <Field>{})
    
    this._revision.fields.forEach((fieldID, index) => {
      this._formService.field(this._formID, this._revision._id, fieldID)
        .then(field => this._fields[index] = field )
        .catch(console.error)
    })
  }
  
  // 欄位相關
  reload_fields(): void {
    let revisionID = this._revision._id
    this._formService.revision(this._formID, revisionID)
        .then(revision => {
          this._revision.fields = revision.fields
          this.loadField()
        })
        .catch(console.error)
  }
}

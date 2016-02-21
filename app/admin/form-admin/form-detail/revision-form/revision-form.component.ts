// Angular 2
import {Input, Output, Component, EventEmitter} from 'angular2/core'

// 服務
import {FormService} from './../../../../services/form.service'

// 基本型態
import {FormRevision} from './../../../../types/types'

@Component({
  selector: 'revision-form',
  templateUrl: '/app/admin/form-admin/form-detail/revision-form/revision-form.template.html'
})

/**
 * 
 */
export class RevisionFormComponent {
  // 輸入，決定要顯示什麼資料
  @Input('form-id')  _formID: string
  @Input('revision') _revision: FormRevision
  
  @Output('revisionDidUpdate') _revisionDidUpdate = new EventEmitter<void>()
  @Output('formDidUpdate') _formDidUpdate = new EventEmitter<void>()
  
  // 服務
  constructor(private _formService: FormService) {}
  
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
}

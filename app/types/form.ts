import { FormRevision } from './form-revision'

export class Form {
  constructor(json: any) {
    Object.assign(this, json)
    if (json.revisions) {
      this.revisions = json.revisions.map(rev => new FormRevision(rev))
    }
    if (json.revision) {
      this.revision = new FormRevision(json.revision)
    }
  }

  get id() {
    return this._id
  }
  _id: string

  /**
   * 表單編號
   * 範例：ISMS-X-123
   */
  identifier: string

  /**
   * 表單名稱
   * 範例：設備進出表單
   */
  name: string

  /**
   * 所有版本（當管理員取得特定版本時可用）
   */
  revisions?: FormRevision[] | null

  /**
   * 當前版本（當使用者取得特定版本時可用）
   */
  revision?: FormRevision | null
}
import { Inject, Injectable } from '@angular/core'
import { Http, Headers, RequestOptionsArgs, URLSearchParams } from '@angular/http'

// 登入服務
import { AuthService } from './auth.service'

// 三個在這個服務中會用的基本型態
import { Form, FormRevision, Field } from './../types/types'

export type Scope = 'Management' | 'Filling'
export type AssociatedAgent = { name: string, id: string }

@Injectable()
export class FormService {
  private endpoint: string
  constructor(private authService: AuthService,
    @Inject("app.config") private config,
    private http: Http) {
    this.endpoint = config.endpoint + '/forms'
  }
  get placeholder(): Form {
    return new Form({
      _id: '507f191e810c19729de860ea',
      name: 'Placeholder 表單',
      identifier: 'ISMS-PLACEHOLDER-FORM',
      revisions: []
    })
  }
  get placeholderRevision(): FormRevision {
    return new FormRevision({
      _id: '',
      number: 1.0,
      signatures: false,
      skipImmediateChief: false,
      published: false,
      groups: [],
      secrecy: 1,
      template: '',
      fields: []
    })
  }
  get placeholderField(): Field {
    return new Field({
      name: 'Field Name',
      type: 'shortText',
      hint: '',
      metadata: {}
    })
  }
  /**
   * 取得現在登入的使用者，可以填寫或是管理的所有表單
   * 只會回傳 id, name, identifier
   */
  forms(purpose: Scope): Promise<Form[]> {
    let headers = new Headers({
      token: this.authService.token.getValue()
    })
    let search = new URLSearchParams()
    if (purpose == 'Management') {
      search.set('scope', 'admin')
    }
    let options: RequestOptionsArgs = {
      headers: headers,
      search: search
    }
    let URL = this.endpoint

    return new Promise<Form[]>((resolve, reject) => {
      this.http.get(URL, options).map(res => res.json())
        .map((forms: any[]) => forms.map($0 => new Form($0)))
        .subscribe(resolve, reject)
    })
  }

  /**
   * 取得一個表單
   */
  form(id: string, purpose: Scope, revision?: number): Promise<Form> {
    let headers = new Headers({
      token: this.authService.token.getValue()
    })
    let search = new URLSearchParams()
    if (purpose == 'Management') {
      search.set('scope', 'admin')
    } else if (revision) {
      search.set('revisionNumber', revision.toString())
    }
    let options = {
      headers: headers,
      search: search
    }
    let endpoint = this.endpoint + '/' + id

    return new Promise<Form>((resolve, reject) => {
      this.http.get(endpoint, options).map(res => res.json())
        .map($0 => new Form($0))
        .subscribe(resolve, reject)
    })
  }

  /**
   * 建立一個新的表單
   * 
   * 回傳表單的 id
   */
  async create() {
    let headers = new Headers({
      token: this.authService.token.getValue()
    })
    let options: RequestOptionsArgs = {
      headers: headers,
    }
    let endpoint = this.endpoint

    return await this.http.post(endpoint, '', options)
      .map(res => res.text())
      .toPromise()
  }

  async agents() {
    let endpoint = this.endpoint + '/associatedAgents'
    let options: RequestOptionsArgs = {
      headers: new Headers({
        token: this.authService.token.getValue()
      })
    }
    let agents = await this.http.get(endpoint, options).map($0 => $0.json()).toPromise()
    return <AssociatedAgent[]>agents
  }

  /** 
   * 更新一個表單
   */
  async update(form: Form) {
    let headers = new Headers({
      token: this.authService.token.getValue(),
      'Content-Type': 'application/json'
    })
    let options: RequestOptionsArgs = {
      headers: headers
    }
    let URL = this.endpoint + `/${form.id}`
    let payloadObject = {
      name: form.name,
      identifier: form.identifier
    }
    let payload = JSON.stringify(payloadObject)
    await this.http.put(URL, payload, options).toPromise()
  }

  /**
   * 刪除一個表單
   */
  async delete(id: string) {
    let headers = new Headers({
      token: this.authService.token.getValue()
    })
    let options: RequestOptionsArgs = {
      headers: headers
    }
    let URL = this.endpoint + `/${id}`

    await this.http.delete(URL, options).toPromise()
  }

  /// SECTION - 表單版本

  /** 新增表單版本 */
  async createRevision(formId: string) {
    let headers = new Headers({
      token: this.authService.token.getValue()
    })
    let options: RequestOptionsArgs = {
      headers: headers
    }
    let endpoint = this.endpoint + `/${formId}/revisions/`

    await this.http.post(endpoint, '', options).map(res => res.text()).toPromise()
  }
  /** 更新表單版本 */
  async updateRevision(formId: string, revisionNumber: number, revision: FormRevision) {
    let headers = new Headers({
      token: this.authService.token.getValue(),
      'Content-Type': 'application/json'
    })
    let options = {
      headers: headers
    }
    let endpoint = this.endpoint + `/${formId}/revisions/${revisionNumber}`
    let payload = JSON.stringify(revision)
    await this.http.put(endpoint, payload, options).toPromise()
  }

  /**
   * 刪除表單版本
   */
  async deleteRevision(formId: string, revisionNumber: number) {
    let headers = new Headers({
      token: this.authService.token.getValue()
    })
    let options: RequestOptionsArgs = {
      headers: headers
    }
    let endpoint = this.endpoint + `/${formId}/revisions/${revisionNumber}`
    await this.http.delete(endpoint, options).toPromise()

    console.log('Deleted')
  }
}

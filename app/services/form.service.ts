import {Inject, Injectable} from 'angular2/core'
import {Http, Headers} from 'angular2/http'

// 登入服務
import {AuthService}   from './auth.service'

// 三個在這個服務中會用的基本型態
import {Form, FormRevision, Field} from './../types/types'

@Injectable()

/**
 * 表單服務提供 xx 個方法來操縱後端的 Forms API，與單位 API 有
 * 點類似，表單的版本以及欄位必須透過特殊的方法來操作。
 * 
 * 
 */
export class FormService {
  private _baseURL: string
  
  constructor(private _authService: AuthService,
          @Inject("app.config") private _config,
                            private _http: Http) {
    this._baseURL = _config.endpoint + '/forms'
  }
  
  /**
   * 取得現在登入的使用者，可以填寫的所有表單
   * 
   * 只會回傳 id, name, identifier
   * 並不包含表單內容！
   */
  forms(): Promise<Form[]> {
    let headers = new Headers({
      token: this._authService.retrieve_token()
    })
    let options = {
      headers: headers
    }
    let URL = this._baseURL
    
    return new Promise<Form[]>((resolve, reject) => {
      this._http.get(URL, options).map(res => res.json())
          .subscribe(forms => {
            let array = <any[]> forms
            resolve(array.map(element => <Form>element))
          })
    })
  }
  
  /**
   * 取得特定表單內容
   */
  form(id: string): Promise<Form> {
    let headers = new Headers({
      token: this._authService.retrieve_token()
    })
    let options = {
      headers: headers
    }
    let URL = this._baseURL + '/' + id
    
    return new Promise<Form>((resolve, reject) => {
      this._http.get(URL, options).map(res => res.json())
          .subscribe(form => {
            resolve(<Form>form)
          })
    })
  }
  
  /**
   * 建立一個新的表單
   * 
   * 回傳表單的 id
   */
  new(): Promise<string> {
    let headers = new Headers({
      token: this._authService.retrieve_token()
    })
    let options = {
      headers: headers,
    }
    let URL = this._baseURL
    
    return new Promise<string>((resolve, reject) => {
      this._http.post(URL,'', options)
          .map(res => res.text())
          .subscribe(resolve, reject)
    })
  }
  
  /** 
   * 更新一個表單
   */
  update(form: Form): Promise<void> {
    let headers = new Headers({
      token: this._authService.retrieve_token(),
      'Content-Type': 'application/json'
    })
    let options = {
      headers: headers
    }
    let URL = this._baseURL + '/' + form._id
    let payloadObject = {
      name: form.name,
      identifier: form.identifier
    }
    let payload = JSON.stringify(payloadObject)
    
    return new Promise<void>((resolve, reject) => {
      this._http.put(URL, payload, options)
          .subscribe(resolve, reject)
    })
  }
  
  /**
   * 刪除一個表單
   */
  delete(id: string): Promise<void> {
    let headers = new Headers({
      token: this._authService.retrieve_token()
    })
    let options = {
      headers: headers
    }
    let URL = this._baseURL + '/' + id
    
    return new Promise<void>((resolve, reject) => {
      this._http.delete(URL, options)
          .subscribe(resolve, reject)
    })
  }
  
  /**
   * SECTION
   * 
   * 表單版本
   */
  
  /**
   * 取得特定表單版本
   */
  revision(formID: string, revisionID: string): Promise<FormRevision> {
    let headers = new Headers({
      token: this._authService.retrieve_token()
    })
    let options = {
      headers: headers
    }
    let URL = this._baseURL + '/revisions/' + formID + '/' + revisionID
    
    return new Promise<FormRevision>((resolve, reject) => {
      this._http.get(URL, options).map(res => res.json())
          .subscribe(formRevision => {
            resolve(<FormRevision>formRevision)
          })
    })
  }
  
  /**
   * 新增表單版本
   */
  newRevision(formID: string): Promise<string> {
    let headers = new Headers({
      token: this._authService.retrieve_token()
    })
    let options = {
      headers: headers
    }
    let URL = this._baseURL + '/revisions/' + formID
    
    return new Promise<string>((resolve, reject) => {
      this._http.post(URL,'', options)
          .map(res => res.text())
          .subscribe(resolve, reject)
    })
  }
  
  /**
   * 更新表單版本
   */
  updateRevision(formID: string, revision: FormRevision): Promise<void> {
    let headers = new Headers({
      token: this._authService.retrieve_token(),
      'Content-Type': 'application/json'
    })
    let options = {
      headers: headers
    }
    let URL = this._baseURL + '/revisions/' + formID + '/' + revision._id
    
    let payloadObject = {
      revision: revision.revision,
      signatures: revision.signatures,
      group: revision.group,
      secrecyLevel: revision.secrecyLevel
    }
    let payload = JSON.stringify(payloadObject)
    
    return new Promise<void>((resolve, reject) => {
      this._http.put(URL, payload, options)
          .subscribe(resolve, reject)
    })
  }
  
  /**
   * 刪除表單版本
   */
  deleteRevision(formID: string, revisionID: string): Promise<void> {
    let headers = new Headers({
      token: this._authService.retrieve_token()
    })
    let options = {
      headers: headers
    }
    let URL = this._baseURL + '/revisions/' + formID + '/' + revisionID 
    
    return new Promise<void>((resolve, reject) => {
      this._http.delete(URL, options)
          .subscribe(resolve, reject)
    })
  }
  
  /**
   * SECTION
   * 
   * 表單欄位
   */
  
  /**
   * 取得特定表單欄位
   */
  field(formID: string, revisionID: string, fieldID: string): Promise<Field> {
    let headers = new Headers({
      token: this._authService.retrieve_token()
    })
    let options = {
      headers: headers
    }
    let URL = this._baseURL + '/revisions/fields/' + formID + '/' + revisionID + '/' + fieldID
    
    return new Promise<Field>((resolve, reject) => {
      this._http.get(URL, options).map(res => res.json())
          .subscribe(field => {
            resolve({
              _id: field._id,
              name: field.name,
              type: field.type,
              hint: field.hint,
              metadata: JSON.parse(field.metadata)
            })
          })
    })
  }
  
  /**
   * 新增表單欄位
   */
  newField(formID: string, revisionID: string): Promise<string> {
    let headers = new Headers({
      token: this._authService.retrieve_token()
    })
    let options = {
      headers: headers
    }
    let URL = this._baseURL + '/revisions/fields/' + formID + '/' + revisionID
    
    return new Promise<string>((resolve, reject) => {
      this._http.post(URL,'', options)
          .map(res => res.text())
          .subscribe(resolve, reject)
    })
  }
  
  /**
   * 更新表單欄位
   */
  updateField(formID: string, revisionID: string, field: Field): Promise<void> {
    let headers = new Headers({
      token: this._authService.retrieve_token(),
      'Content-Type': 'application/json'
    })
    let options = {
      headers: headers
    }
    let URL = this._baseURL + '/revisions/fields/' + formID + '/' + revisionID + '/' + field._id
    
    let payloadObject = {
      name: field.name,
      type: field.type,
      hint: field.hint,
      metadata: JSON.stringify(field.metadata)
    }
    let payload = JSON.stringify(payloadObject)
    
    return new Promise<void>((resolve, reject) => {
      this._http.put(URL, payload, options)
          .subscribe(resolve, reject)
    })
  }
  
  /**
   * 刪除表單欄位
   */
  deleteField(formID: string, revisionID: string, fieldID: string): Promise<void> {
    let headers = new Headers({
      token: this._authService.retrieve_token()
    })
    let options = {
      headers: headers
    }
    let URL = this._baseURL + '/revisions/fields/' + formID + '/' + revisionID + '/' + fieldID 
    
    return new Promise<void>((resolve, reject) => {
      this._http.delete(URL, options)
          .subscribe(resolve, reject)
    })
  }
}

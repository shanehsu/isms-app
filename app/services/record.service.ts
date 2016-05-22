import {Inject, Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

import {AuthService}   from './auth.service'
import {Field} from './../types/field'

@Injectable()
export class RecordService {
  private _baseURL: string;
  
  constructor(private _http: Http, private _authService: AuthService, @Inject("app.config") private _config) {
    this._baseURL = _config.endpoint + '/records';
  }
  
  // 取得表單完整的 Schema
  schema(formID: string): Promise<Field[]> {
    let headers = new Headers({
      token: this._authService.retrieve_token()
    })
    let options = {
      headers: headers
    }
    let URL = this._baseURL + "/" + formID + "/schema" 
    
    return new Promise<Field[]>((resolve, reject) => {
      this._http.get(URL, options).map(res => res.json())
          .subscribe(forms => {
            let array = <any[]> forms
            resolve(array.map(element => <Field>element))
          })
    })
  }
  
  // 取得表單欄位可以用的空資料
  // 這個方法的 field.metadata 必為物件，不可以是 string！
  emptyRecordForFields(schema: Field[]): any[] {
    let record = []
    record = schema.map(field => {
      let meta: any = field.metadata
      switch (field.type) {
        case 'shortText':
          return ""
        case 'longText':
          return ""
        case 'date':
          return new Date()
        case 'time':
          return {
            hour: 0,
            minute: 0
          }
        case 'options':
          let value = {
            selected: meta.options.map(() => { return false }),
            values: meta.options.map(option => {
              return this.emptyRecordForFields(option.fields)
            })
          }
          if (meta.presentation != 'checkbox') {
            value.selected[0] = true
          }
          return value
        case 'table':
          return []
        default:
          console.error("處理出現問題")
          return undefined
      }
    })
    
    return record
  }
}

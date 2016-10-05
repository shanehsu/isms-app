import {Inject, Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

import {AuthService}   from './auth.service'
import {Field, Record, PopulatedRecord, SinglePopulatedRecord} from './../types/types'

@Injectable()
export class RecordService {
  private baseURL: string;
  
  constructor(private http: Http, private authService: AuthService, @Inject("app.config") private config) {
    this.baseURL = config.endpoint + '/records';
  }
  
  // 取得表單完整的 Schema
  schema(formID: string): Promise<Field[]> {
    let headers = new Headers({
      token: this.authService.retrieve_token()
    })
    let options = {
      headers: headers
    }
    let URL = this.baseURL + "/" + formID + "/schema" 
    
    return new Promise<Field[]>((resolve, reject) => {
      this.http.get(URL, options).map(res => res.json())
          .subscribe(forms => {
            let array = <any[]> forms
            resolve(array.map(element => <Field>element))
          }, reject)
    })
  }
  
  schemaForRevision(formID: string, revisionID: string): Promise<Field[]> {
    let headers = new Headers({
      token: this.authService.retrieve_token()
    })
    let options = {
      headers: headers
    }
    let URL = this.baseURL + "/" + formID + "/" + revisionID + "/schema" 
    
    return new Promise<Field[]>((resolve, reject) => {
      this.http.get(URL, options).map(res => res.json())
          .subscribe(forms => {
            let array = <any[]> forms
            resolve(array.map(element => <Field>element))
          }, reject)
    })
  }
  
  // 取得表單欄位可以用的空資料
  // 這個方法的 field.metadata 必為物件，不可以是 string！
  emptyRecordForFields(schema: Field[]): any[] {
    return schema.map(field => {
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
  }
  
  upload(formID: string, formData: any[]): Promise<string> {
    let URL = this.baseURL + `/${formID}`
    return new Promise<string>((resolve, reject) => {
      let headers = new Headers({
        token: this.authService.retrieve_token(),
        'Content-Type': 'application/json'
      })
      let options = {
        headers: headers
      }
      this.http.post(URL, JSON.stringify({data: formData}), options)
          .map(res => res.text())
          .subscribe(recordID => {
            resolve(recordID)
          }, reject)
    })
  }
  
  records(): Promise<PopulatedRecord[]> {
    let headers = new Headers({
      token: this.authService.retrieve_token()
    })
    let options = {
      headers: headers
    }
    let URL = this.baseURL + "?populate=true"
    
    return new Promise<PopulatedRecord[]>((resolve, reject) => {
      this.http.get(URL, options)
          .map(res => res.json())
          .map(vanillaObjectArray => 
            (vanillaObjectArray as PopulatedRecord[]).map(element => {
              element.created = new Date(element.created)
              return element
            })  
          ).subscribe(recordArray => {
            resolve(recordArray)
          }, reject)
    })
  }
  
  record(id: string): Promise<SinglePopulatedRecord> {
    let headers = new Headers({
      token: this.authService.retrieve_token()
    })
    let options = {
      headers: headers
    }
    let URL = `${this.baseURL}/${id}`
    
    return new Promise<SinglePopulatedRecord>((resolve, reject) => {
      this.http.get(URL, options)
          .map(res => res.json())
          .subscribe(recordObject => {
            resolve(<SinglePopulatedRecord>recordObject)
          }, reject)
    })
  }
  
  awaitSignature(): Promise<PopulatedRecord[]> {
    let headers = new Headers({
      token: this.authService.retrieve_token()
    })
    let options = {
      headers: headers
    }
    let URL = this.baseURL + "/sign"
    
    return new Promise<PopulatedRecord[]>((resolve, reject) => {
      this.http.get(URL, options)
          .map(res => res.json())
          .map(vanillaObjectArray => 
            (vanillaObjectArray as PopulatedRecord[]).map(element => {
              element.created = new Date(element.created)
              return element
            })  
          ).subscribe(recordArray => {
            resolve(recordArray)
          }, reject)
    })
  }
  
  sign(id: string): Promise<void> {
    let headers = new Headers({
      token: this.authService.retrieve_token()
    })
    let options = {
      headers: headers
    }
    let URL = this.baseURL + "/sign/" + id
    
    return new Promise<void>((resolve, reject) => {
      this.http.post(URL, '', options)
          .subscribe(_ => {
            resolve()
          }, reject)
    })
  }
}

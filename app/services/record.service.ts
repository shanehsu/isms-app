import { Inject, Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs, URLSearchParams } from '@angular/http';

import { AuthService } from './auth.service'
import { MeService } from './me.service'
import { Field, Record } from './../types/types'

type RecordData = { [fieldId: string]: any }

@Injectable()
export class RecordService {
  private endpoint: string;

  constructor(private http: Http, private authService: AuthService, private meService: MeService, @Inject("app.config") private config) {
    this.endpoint = config.endpoint + '/records';
  }

  // 取得表單欄位可以用的空資料
  // 這個方法的 field.metadata 必為物件，不可以是 string！
  emptyRecordForFields(schema: Field[]): RecordData {
    let record: RecordData = {}
    for (let field of schema) {
      let id = field.id
      let value: any = null
      let metadata: any = field.metadata
      switch (field.type) {
        case 'shortText':
        case 'longText':
          value = ''
          break
        case 'date':
          value = new Date()
          break
        case 'time':
          value = {
            hour: 0,
            minute: 0
          }
          break
        case 'options':
          value = {}
          let first = metadata.presentation != 'checkbox'
          for (let option of <{ id: string, fields: Field[] }[]>metadata.options) {
            option.fields = option.fields.map(f => new Field(f))
            value[option.id] = {
              selected: first,
              values: this.emptyRecordForFields(option.fields)
            }
            first = false
          }
          break
        case 'table':
          value = []
          metadata.fields = metadata.fields.map(field => new Field(field))
          break
        default:
          console.error('emptyRecordForFields: Error')
          value = undefined
      }

      record[id] = value
    }
    return record
  }

  async submit(formId: string, contents: RecordData, signature: string, associatedAgent?: string): Promise<string> {
    // If user is an agent, associatedAgent is required; if user is not, associatedAgent is forbidden

    let endpoint = this.endpoint
    let payload = {
      formId: formId,
      contents: contents,
      signature: signature
    }
    if (this.meService.user.getValue().group == 'vendors') {
      if (!associatedAgent) {
        throw new Error('廠商填表時，必須填入相關承辦人。')
      } else {
        payload['associatedAgent'] = associatedAgent
      }
    }

    let headers = new Headers({
      token: this.authService.token.getValue(),
      'Content-Type': 'application/json'
    })
    let options = {
      headers: headers
    }
    return await this.http.post(endpoint, JSON.stringify(payload), options)
      .map(res => res.text()).toPromise()
  }

  async records(scope?: "Management") {
    let headers = new Headers({
      token: this.authService.token.getValue()
    })
    let search = new URLSearchParams()
    if (scope == "Management") {
      search.set('scope', 'admin')
    }
    let options = {
      headers: headers,
      search: search
    }
    let endpoint = this.endpoint

    return await this.http.get(endpoint, options)
      .map(res => res.json())
      .map((array: any[]) => array.map(el => new Record(el))).toPromise()
  }

  async record(id: string, scope?: "Management") {
    let headers = new Headers({
      token: this.authService.token.getValue()
    })
    let search = new URLSearchParams()
    if (scope == "Management") {
      search.set('scope', 'admin')
    }
    let options = {
      headers: headers,
      search: search
    }

    let endpoint = `${this.endpoint}/${id}`
    return await this.http.get(endpoint, options)
      .map(res => res.json())
      .map(json => new Record(json))
      .toPromise()
  }

  async sign(id: string, signature: string): Promise<void> {
    let headers = new Headers({
      token: this.authService.token.getValue(),
      "Content-Type": "application/json"
    })
    let options = {
      headers: headers
    }
    let endpoint = this.endpoint + `/${id}/actions/sign`

    await this.http.post(endpoint, JSON.stringify({ as: signature }), options).toPromise()
  }

  async return(id: string): Promise<void> {
    let headers = new Headers({
      token: this.authService.token.getValue()
    })
    let options = {
      headers: headers
    }
    let endpoint = this.endpoint + `/${id}/actions/decline`

    await this.http.post(endpoint, '', options).toPromise()
  }

  async edit(id: string, contents: RecordData, scope?: "Management") {
    let endpoint = this.endpoint + `/${id}`
    let headers = new Headers({
      token: this.authService.token.getValue(),
      "Content-Type": "application/json"
    })
    let options = {
      headers: headers
    }

    await this.http.put(endpoint, JSON.stringify(contents), options)
  }
}

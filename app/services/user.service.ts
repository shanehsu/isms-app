import { Inject, Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'

import { AuthService } from './auth.service'
import { Token } from './../types/token'
import { User } from './../types/user'

import 'rxjs/add/operator/toPromise'

@Injectable()
export class UserService {
  private endpoint: string

  constructor(private authService: AuthService, private http: Http, @Inject("app.config") private config) {
    this.endpoint = config.endpoint + '/users'
  }
  get placeholder(): User {
    return new User({ _id: '', email: '', name: '', group: "guests", tokens: [] })
  }
  async get(id?: string): Promise<User | User[]> {
    let headers = new Headers({
      token: this.authService.token.getValue()
    })

    if (id) {
      let responseJSONObject: Object
      try {
        responseJSONObject = await this.http.get(`${this.endpoint}/${id}`, { headers: headers })
          .map(res => res.json()).toPromise()
      } catch (networkError) {
        console.error('無法取得使用者資訊')
        console.dir(networkError)
      }

      return new User(responseJSONObject)
    } else {
      let responseJSONArray: Object[]
      try {
        responseJSONArray = await this.http.get(this.endpoint, { headers: headers })
          .map(res => res.json()).toPromise()
      } catch (networkError) {
        console.error('無法取得使用者列表')
        console.dir(networkError)
      }

      return responseJSONArray.map(object => new User(object))
    }
  }
  async create(): Promise<string> {
    let headers = new Headers({
      token: this.authService.token.getValue(),
      'Content-Type': 'application/json'
    })
    try {
      return await this.http.post(this.endpoint, "", { headers: headers })
        .map(res => res.text()).toPromise()
    } catch (networkError) {
      console.error('無法新增使用者')
      console.dir(networkError)
    }
  }
  async confirm(userId: string): Promise<void> {
    let headers = new Headers({
      token: this.authService.token.getValue(),
      'Content-Type': 'application/json'
    })
    try {
      await this.http.post(`${this.endpoint}/${userId}/actions/confirm`, null, { headers: headers }).toPromise()
    } catch (networkError) {
      console.error('無法啟用使用者')
      console.dir(networkError)
    }
  }
  async update(user: User): Promise<void> {
    let id = user.id
    let object: User = Object.assign({}, user)
    delete object.tokens

    let headers = new Headers({
      token: this.authService.token.getValue(),
      'Content-Type': 'application/json'
    })

    try {
      await this.http.put(`${this.endpoint}/${id}`, JSON.stringify(object), { headers: headers }).toPromise()
    } catch (networkError) {
      console.error('無法更新使用者')
      console.dir(networkError)
    }
  }
  async delete(id: string): Promise<void> {
    let headers = new Headers({
      token: this.authService.token.getValue(),
      'Content-Type': 'application/json'
    })

    try {
      await this.http.delete(`${this.endpoint}/${id}`, headers).toPromise()
    } catch (networkError) {
      console.error('無法刪除使用者')
      console.dir(networkError)
    }
  }
}

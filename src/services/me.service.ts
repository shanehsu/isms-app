import { Inject, Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from './auth.service'
import { Token } from './../types/token'
import { User } from './../types/user'

import { DebugItem, DebugService } from './debug.service'

import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class MeService {
  private endpoint: string

  isLoading: BehaviorSubject<boolean>
  user: BehaviorSubject<User>

  constructor(private authService: AuthService, private debugService: DebugService, private http: Http, @Inject("app.config") private config) {
    this.endpoint = config.endpoint + '/me'

    this.user = new BehaviorSubject<User>(null)
    this.isLoading = new BehaviorSubject<boolean>(false)

    this.authService.token.subscribe(token => {
      if (token) {
        this.isLoading.next(true)
        this.http.get(this.endpoint, {
          headers: new Headers({ token: token })
        }).map(r => r.json()).subscribe(json => {
          this.user.next(new User(json))
          this.isLoading.next(false)
        }, err => {
          if (err.status == 404) {
            // API 中 404 表示 token 不存在
            this.authService.didLogout()
            this.user.next(null)
          } else {
            this.user.error(err)
          }
          this.isLoading.next(false)
        })
      }
    })

    this.debugService.register({
      source: 'MeService',
      name: 'user',
      subject: this.user
    })
  }

  invalidate_current_token(): Promise<void> {
    let t = this.authService.token.getValue()
    let token = this.user.getValue().tokens.find(token => token.token == t)

    if (token) {
      let endpoint = this.endpoint + `/tokens/${token.id}`
      this.isLoading.next(true)
      return new Promise<void>((resolve, reject) => {
        this.http.delete(endpoint, {
          headers: new Headers({ token: t })
        }).subscribe(_ => {
          this.isLoading.next(false)
          this.user.next(null)
          this.authService.didLogout()
          resolve()
        }, err => {
          this.isLoading.next(false)
          reject(err)
        })
      })
    } else {
      return Promise.reject('邏輯錯誤，沒有在目前的 User 中找到 Token 實例。')
    }
  }

  updatePassword(password: string): Promise<void> {
    // TODO: implement
    return Promise.reject('');
  }
}

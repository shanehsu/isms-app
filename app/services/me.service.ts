import { Inject, Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from './auth.service'
import { Token } from './../types/token'
import { User } from './../types/user'

import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class MeService {
  private endpoint: string

  isLoading: BehaviorSubject<boolean>
  user: BehaviorSubject<User>

  constructor(private authService: AuthService, private http: Http, @Inject("app.config") private config) {
    this.endpoint = config.endpoint + '/me'
    
    this.user = new BehaviorSubject<User>(undefined)
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
          this.user.error(err)
          this.isLoading.next(false)
        })
      }
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

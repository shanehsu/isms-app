import { Inject, Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Group } from './../types/group'
import { User } from './../types/user'
import { Token } from './../types/token'
import { MeService } from './../services/me.service'

import { Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

let ssoURL = "http://localhost:3000/sso"

@Injectable()
export class AuthService {
  public  token: BehaviorSubject<string>
  public  isLoading: BehaviorSubject<boolean>
  private endpoint: string

  constructor(private http: Http, @Inject("app.config") private config, private router: Router) {
    this.endpoint = config.endpoint + '/login'

    this.token = new BehaviorSubject<string>(localStorage.getItem('token'))
    this.isLoading = new BehaviorSubject<boolean>(false)
  }
  login_sso() {
    let ending = ''
    if (window.location.href.includes('?')) {
      ending = '&sso=true&token='
    } else {
      ending = '?sso=true&token='
    }
    window.location.href = ssoURL + '?redirectUrl=' + encodeURIComponent(window.location.href + ending)
  }
  authenticate_sso(token: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let endpoint = this.endpoint + '/sso'
      this.isLoading.next(true)
      this.http.post(endpoint, JSON.stringify({ 'sso_token':  token}), {
        headers: new Headers({ 'Content-Type': 'application/json' })
      }).map(res => res.json()).subscribe((result: {success: boolean, token?: string, message?: string}) => {
        this.isLoading.next(false)
        if (result.success) {
          this.setToken(result.token)
          resolve()
        } else {
          reject(result.message)
        }
      }, err => {
        this.isLoading.next(false)
        reject(err)
      })
    })
  }
  login(email: string, password: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      var endpoint = this.endpoint + '/standalone';
      var headers = new Headers();
      headers.append('Content-Type', 'application/json')
      this.isLoading.next(true)
      this.http.post(endpoint, JSON.stringify({
        email: email,
        password: password
      }), {
        headers: headers
      })
      .map(res => res.json()).subscribe(result => {
        this.isLoading.next(false)
        if (result.success) {
          this.setToken(result.token)
          resolve()
        } else {
          reject(result.message)
        }
      }, err => {
        this.isLoading.next(false)
        reject(err)
      })
    })
  }
  register(name: string, email: string, password: string): Promise<void> {
    var endpoint = this.config.endpoint + '/register'
    var headers = new Headers();
    headers.append('Content-Type', 'application/json')

    return new Promise<void>((resolve, reject) => {
      this.isLoading.next(true)
      this.http.post(endpoint, JSON.stringify({
        name: name,
        email: email,
        password: password
      }), {
        headers: headers
      }).subscribe(_ => {
        this.isLoading.next(false)
        resolve()
      }, err => {
        this.isLoading.next(false)
        reject(err)
      })
    })
  }
  didLogout(): void {
    this.removeToken()
  }
  private setToken(token: string) {
    localStorage.setItem('token', token)
    this.token.next(token)
  }
  private removeToken() {
    localStorage.removeItem('token')
    this.token.next(undefined)
  }
}

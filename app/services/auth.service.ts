import {Inject, Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Group} from './../types/group'
import {User} from './../types/user'
import {Token} from './../types/token'

@Injectable()
export class AuthService {
  private _baseURL: string;
  
  constructor(private _http: Http, @Inject("app.config") private _config) {
    this._baseURL = _config.endpoint + '/auth';
  }
  
  login(email: string) : Promise<void> {
    return new Promise<void>((resolve, reject) => {
      var endpoint = this._baseURL + '/login';
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      
      this._http.post(endpoint, JSON.stringify({
        'email': email
      }), {
        headers: headers
      })
      .map(res => res.text())
      .subscribe(
        data => {
          localStorage.setItem('token', data);
          resolve();
        },
        err => reject()
      )
    });
  }
  
  has_token() : boolean {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
  
  validate_token() {
    return new Promise<boolean>((resolve, reject) => {
      if (this.retrieve_token()) {
        let endpoint = this._baseURL + '/valid';
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        this._http.post(endpoint, JSON.stringify({
          'token': this.retrieve_token()
        }), {
          headers: headers
        })
        .map(res => res.json())
        .subscribe(
          data => {
            if (data.valid) {
              resolve(true);
            } else {
              this.remove_token();
              resolve(false);
            }
          },
          err => resolve(false)
        )
      }
    })
  }
  
  retrieve_token() : string {
    if (this.has_token()) {
      return <string>localStorage.getItem('token');
    } else {
      return '';
    }
  }
  
  remove_token() {
    if (this.has_token()) {
      localStorage.removeItem('token')
      localStorage.removeItem('userid')
    }
  }
  
  me() : Promise<User> {
    if (!this.has_token) {
      return Promise.reject<User>('no token in local storage');
    } else {
      return new Promise<User>((resolve, reject) => {
        let endpoint = this._config.endpoint + '/users/me';
        var headers = new Headers();
        headers.append('token', this.retrieve_token());
        
        this._http.get(endpoint, {
          headers: headers
        }).map(response => response.json()).subscribe(
            data => {
              localStorage.setItem('userid', data._id)
              resolve({
                id: data._id,
                email: data.email,
                name: data.name,
                group: data.group,
                unit: data.unit,
                tokens: (<Array<any>>data.tokens).map(value => {
                  return {
                    id: value._id,
                    origin: value.origin,
                    token: value.token,
                    userAgent: value.userAgent,
                    used: new Date(value.used)
                  }
                })
              });
            },
            err  => {
              console.error(err);
              reject(err);
            }
          )
      })
    }
  }
  
  privilege() : Promise<Group> {
    return new Promise<Group>((resolve, reject) => {
      this.me().then(me => resolve(me.group)).catch(reject);
    })
  }
}

import {Inject, Injectable} from 'angular2/core'
import {Http, Headers} from 'angular2/http'
import {AuthService}   from './auth.service'

import {Token} from './../types/token'
import {User}  from './../types/user'

@Injectable()
export class UserService {
  private _baseURL: string;
  
  constructor(private _authService: AuthService, private _http: Http, @Inject("app.config") private _config) {
    this._baseURL = _config.endpoint + '/users';
  }
  
  /**
   * If `id` is given, a list containing one user is returned. Otherwise, a list of all users is returned.
   * Retrieving all users also means that tokens field is left out.
   */
  get(id?: string) : Promise<User[]> {
    let headers = new Headers({
      token: this._authService.retrieve_token()
    })
    
    if (id) {
      return new Promise<User[]>((resolve, reject) => {
        this._http.get(this._baseURL + '/' + id, {
          headers: headers
        }).map(res => res.json())
          .subscribe(
            user => {
              resolve([
                <User>{
                  id: user._id,
                  email: user.email,
                  name: user.name,
                  title: user.title,
                  unit: user.unit,
                  group: user.group,
                  tokens: (<any[]>user.tokens).map(value => {
                    return {
                      id: value._id,
                      origin: value.origin,
                      token: value.token,
                      userAgent: value.userAgent,
                      used: new Date(value.used)
                    }
                  })
                }
              ])
            },
            err => reject(err)
          )
      });
    }
    
    return new Promise<User[]>((resolve, reject) => {
      this._http.get(this._baseURL, {
        headers: headers
      }).map(res => res.json())
        .subscribe(
          users => resolve( (<any[]>users).map(user => 
              <User> {
                id: user._id,
                email: user.email,
                name: user.name,
                title: user.title,
                unit: user.unit,
                group: user.group,
                tokens: []
              }
          )),
          err => reject(err)
        )
    });
  }
}

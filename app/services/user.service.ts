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
  
  emptyUser() : User {
    return {
      id: '',
      email: '',
      name: '',
      title: '',
      unit: '',
      group: 10,
      tokens: []
    }
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
  
  new(user? : User) : Promise<string> {
    let postObject: any;
    if (user) {
      postObject = user;
      postObject.id = undefined;
    } else {
      postObject = {
        email: '',
        name: '',
        title: '',
        group: 10,
        tokens: []
      }
    }
    
    return new Promise<string>((resolve, reject) => {
      this._http.post(this._baseURL, JSON.stringify(postObject), {
        headers: new Headers({
          token: this._authService.retrieve_token(),
          'Content-Type': 'application/json'
        })
      }).map(res => res.text()).subscribe(id => resolve(id), err => reject(err))
    })
  }
  
  update(originalUser: User) : Promise<void> {
    let user: User = Object.assign({}, originalUser);
    let id = user.id;
    let object: any = user;
    object.tokens = undefined;
    if (user.unit == '') {
      object.unit = undefined;
    }
    return new Promise<void>((resolve, reject) => {
      this._http.put(this._baseURL + '/' + id, JSON.stringify(object), {
        headers: new Headers({
          token: this._authService.retrieve_token(),
          'Content-Type': 'application/json'
        })
      }).subscribe(() => resolve(), err => reject(err))
    })
  }
  
  delete(id: string) : Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._http.delete(this._baseURL + '/' + id, {
        headers: new Headers({
          token: this._authService.retrieve_token(),
          'Content-Type': 'application/json'
        })
      }).subscribe(() => resolve(), err => reject(err))
    })
  }
}

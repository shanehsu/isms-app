import {Inject, Injectable} from '@angular/core'
import {Http, Headers} from '@angular/http'
import {AuthService}   from './auth.service'

import {Token} from './../types/token'
import {User}  from './../types/user'

@Injectable()
export class UserService {
  private endpoint: string;
  
  constructor(private authService: AuthService, private http: Http, @Inject("app.config") private config) {
    this.endpoint = config.endpoint + '/users'
  }
  
  placeholder(): User {
    return new User({
      _id: '',
      email: '',
      name: '',
      group: "guests",
      tokens: []
    })
  }
  
  /**
   * If `id` is given, a list containing one user is returned.
   * Otherwise, a list of all users is returned.
   * Retrieving all users also means that tokens field is left out.
   */
  get(id?: string) : Promise<User[]> {
    let headers = new Headers({
      token: this.authService.token.getValue()
    })
    
    if (id) {
      return new Promise<User[]>((resolve, reject) => {
        this.http.get(this.endpoint + '/' + id, {
          headers: headers
        }).map(res => res.json())
          .subscribe(
            user => {
              resolve([
                <User>{
                  id: user._id,
                  email: user.email,
                  name: user.name,
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
      this.http.get(this.endpoint, {
        headers: headers
      }).map(res => res.json())
        .subscribe(
          users => resolve( (<any[]>users).map(user => 
              <User> {
                id: user._id,
                email: user.email,
                name: user.name,
                unit: user.unit,
                group: user.group,
                tokens: []
              }
          )),
          err => reject(err)
        )
    });
  }
  
  new() : Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.http.post(this.endpoint, "", {
        headers: new Headers({
          token: this.authService.token.getValue(),
          'Content-Type': 'application/json'
        })
      }).map(res => res.text()).subscribe(id => resolve(id), err => reject(err))
    })
  }
  
  update(originalUser: User) : Promise<void> {
    let user: User = Object.assign({}, originalUser);
    let id = user.id;
    let object: any = user;
    
    delete object.tokens
    
    return new Promise<void>((resolve, reject) => {
      this.http.put(this.endpoint + '/' + id, JSON.stringify(object), {
        headers: new Headers({
          token: this.authService.token.getValue(),
          'Content-Type': 'application/json'
        })
      }).subscribe(() => resolve(), err => reject(err))
    })
  }
  
  delete(id: string) : Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.delete(this.endpoint + '/' + id, {
        headers: new Headers({
          token: this.authService.token.getValue(),
          'Content-Type': 'application/json'
        })
      }).subscribe(() => resolve(), err => reject(err))
    })
  }
}

import {Inject, Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {AuthService}   from './auth.service'
import {Token} from './../types/token'

@Injectable()
export class TokenService {
  private _baseURL: string;
  
  constructor(private _authService: AuthService, private _http: Http, @Inject("app.config") private _config) {
    this._baseURL = _config.endpoint + '/tokens';
  }
  
  invalidate_token(tokenId: string) : Promise<void> {
    if (!this._authService.has_token) {
      return Promise.reject<void>('no token in local storage');
    } else {
      return new Promise<void>((resolve, reject) => {
        let endpoint = this._baseURL + '/' + tokenId;
        let headers  = new Headers({
          token: this._authService.retrieve_token()
        });
        this._http.delete(endpoint, {headers: headers}).subscribe(
          res => resolve(),
          err => reject()
        )
      });
    }
  }
}

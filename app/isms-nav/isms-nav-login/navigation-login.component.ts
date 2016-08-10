import {Component, OnInit, EventEmitter, Output} from '@angular/core';

import {AuthService}       from './../../services/auth.service'
import {TokenService}      from './../../services/token.service'
import {Token}             from './../../types/token'
import {User}              from './../../types/user'

@Component({
    selector: 'isms-nav-login',
    templateUrl: '/app/isms-nav/isms-nav-login/navigation-login.template.html'
})

export class NavigationLoginComponent implements OnInit {
  /*
   * _state = -1 代表未知
   * _state =  0 代表尚未登入
   * _state =  1 代表已經登入
   */
  
  private _state: number;
  private _currentUser: User;
  
  @Output() authStatusDidChange: EventEmitter<void> = new EventEmitter<void>();
  
  ngOnInit() {
    if (this._authService.has_token()) {
      this._state = -1;
      this._authService.me().then(user => {
        this._currentUser = user;
        this._state = 1;
        this.authStatusDidChange.emit(null);
      }).catch(() => this._state = 0);
    } else {
      this._state = 0;
    }
  }
  
  login(email: string) {
    this._state = -1;
    
    this._authService.login(email).then(() => {
      this._authService.me().then(user => {
        this._currentUser = user;
        this._state = 1;
        this.authStatusDidChange.emit(null);
      }).catch(() => this._state = 0);
    }).catch(() => {
      this._state = 0;
    });
  }
  
  logout() {
    this._state = 0;
    let token_id = undefined;
    for (var token of this._currentUser.tokens) {
      if (this._authService.retrieve_token() == token.token) {
        token_id = token.id;
      }
    }
    if (token_id) {
      this._tokenService.invalidate_token(token_id)
    }
    this._currentUser = undefined;
    this._authService.remove_token();
    this.authStatusDidChange.emit(null);
  }
  
  constructor(private _authService: AuthService, private _tokenService: TokenService) {
    this._state = 0;
  }
}

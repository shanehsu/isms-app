import {Component, OnInit} from '@angular/core'
import {NgForm}    from '@angular/common';

import {User}             from './../../../types/user'
import {Token}            from './../../../types/token'

import {UserService}       from './../../../services/user.service'
import {UnitService}       from './../../../services/unit.service'

import {UnitNamePipe}      from './../../../pipes/unit-name.pipe'

import {Router, RouteSegment} from '@angular/router'

@Component({
    selector: 'user-detail',
    templateUrl: '/app/admin/user-admin/user-detail/user-detail.template.html',
    pipes: [UnitNamePipe],
    providers: [UserService, UnitService]
})

export class UserDetailComponent implements OnInit {
  private _id: string;
  private _user: User;
  
  ngOnInit() {
    this._user = this._userService.emptyUser();
    this._id = this._routeSegment.getParam('id');
    this._userService.get(this._id).then(user => this._user = user[0]).catch(console.error);
  }
  
  submit() {
    this._userService.update(this._user)
        .then(() => this._router.navigate(['/']))
        .catch(console.error);
  }
  
  cancel() {
    this._router.navigate(['/']);
  }
  
  constructor(private _router: Router, private _routeSegment: RouteSegment, private _userService: UserService) {}
}
import {Component, OnInit} from 'angular2/core';

import {UserService} from './../../../services/user.service'
import {User} from './../../../types/user'

@Component({
    selector: 'user-list',
    templateUrl: '/app/admin/user-admin/user-list/user-list.template.html',
    providers: [UserService]
})

export class UserListComponent implements OnInit {
  private _users: User[];
  
  ngOnInit() {
    this._users = [];
    this._userService.get().then(users => this._users = users)
                           .catch(err => console.error(err));
  }
  
  constructor(private _userService: UserService) {}
}

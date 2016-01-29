import {Component, OnInit} from 'angular2/core';
import {Pipe, PipeTransform} from 'angular2/core';
import {Router}            from 'angular2/router'

import {UserService} from './../../../services/user.service'
import {User} from './../../../types/user'

import {GroupNamePipe, UnitNamePipe} from './../../../pipes/pipes'

@Component({
    selector: 'user-list',
    templateUrl: '/app/admin/user-admin/user-list/user-list.template.html',
    providers: [UserService],
    pipes: [GroupNamePipe, UnitNamePipe]
})

export class UserListComponent implements OnInit {
  private _users: User[];
  
  ngOnInit() {
    this._users = [];
    this._userService.get().then(users => this._users = users)
                           .catch(err => console.error(err));
  }
  
  new() : void {
    this._userService.new()
        .then(id => this.edit(id))
        .catch(console.error);
  }
  
  edit(id: string) : void {
    this._router.navigate(['UserDetail', {id: id}]);
  }
  
  delete(id: string) : void {
    if (!confirm('確定刪除該名使用者?')) {
      return;
    }
    this._userService.delete(id).then(() => {
      this._userService.get().then(users => this._users = users)
                             .catch(err => console.error(err));
    })
  }
  
  constructor(private _router: Router, private _userService: UserService) {}
}

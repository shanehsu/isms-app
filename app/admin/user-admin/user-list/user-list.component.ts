// Angular 2
import {Component, OnInit} from '@angular/core';
import {Pipe, PipeTransform} from '@angular/core';
import {Router}            from '@angular/router'

// Services
import {UserService} from './../../../services/user.service'
import {UnitService} from './../../../services/unit.service'

// Interfaces
import {User} from './../../../types/user'

// Pipes
import {GroupNamePipe, UnitNamePipe} from './../../../pipes/pipes'

@Component({
    selector: 'user-list',
    templateUrl: '/app/admin/user-admin/user-list/user-list.template.html',
    providers: [UserService, UnitService],
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
    this._router.navigate(['/', id]);
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

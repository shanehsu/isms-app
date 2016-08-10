import {Pipe, PipeTransform} from '@angular/core';
import {User}                from './../types/user'
import {UserService}         from './../services/user.service'

@Pipe({name: 'userName', pure: false})

export class UserNamePipe implements PipeTransform {
  private _users: {[id : string] : string } = {};
  
  constructor(userService: UserService) {
    userService.get().then(users => {
      for (let user of users) {
        this._users[user.id] = user.name
      }
    })
  }
  
  transform(id: string): string {
    return this._users[id]
  }
}
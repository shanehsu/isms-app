// Angular 2
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute}            from '@angular/router'

// Services
import {UserService} from './../../services/user.service'
import {UnitService} from './../../services/unit.service'

// Interfaces
import {User} from './../../types/user'

@Component({
    template: `
    <div class="ui one column grid">
      <form class="ui form right aligned column">
        <button type="button" class="ui right floated blue labeled icon button" (click)="new()">
          <i class="plus icon"></i>新增使用者
        </button>
      </form>
    </div>

    <table class="ui striped table">
      <thead>
        <tr>
          <th style="min-width: 7em;">姓名</th>
          <th style="width: 70%">電子郵件</th>
          <th style="width: 30%">單位</th>
          <th style="min-width: 5em;">權限</th>
          <th style="min-width: 12em;">動作</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let user of users">
          <td>{{user.name}}</td>
          <td>{{user.email}}</td>
          <td>{{user.unit | unitName}}</td>
          <td>{{user.group | groupName}}</td>
          <td style="text-align: center;">
            <div class="small ui buttons">
              <button type="button" class="ui basic teal button" (click)="edit(user.id)">編輯</button>
              <button type="button" class="ui basic red button" (click)="delete(user.id)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>`
})

export class UsersListComponent implements OnInit {
  private users: User[]
  
  ngOnInit() {
    this.users = [];
    this.userService.get().then(users => this.users = users)
                           .catch(err => console.error(err));
  }
  
  new(): void {
    this.userService.new()
        .then(id => this.edit(id))
        .catch(console.error);
  }
  
  edit(id: string): void {
    this.router.navigate([id], {relativeTo: this.route});
  }
  
  delete(id: string): void {
    if (!confirm('確定刪除該名使用者?')) {
      return;
    }
    this.userService.delete(id).then(() => {
      this.userService.get().then(users => this.users = users)
                             .catch(err => console.error(err));
    })
  }
  
  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) {  }
}

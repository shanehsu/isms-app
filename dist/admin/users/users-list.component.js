"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// Angular 2
const core_1 = require('@angular/core');
const router_1 = require('@angular/router');
// Services
const user_service_1 = require('./../../services/user.service');
let UsersListComponent = class UsersListComponent {
    constructor(router, route, userService) {
        this.router = router;
        this.route = route;
        this.userService = userService;
    }
    ngOnInit() {
        this.users = [];
        this.userService.get().then(users => this.users = users)
            .catch(err => console.error(err));
    }
    new() {
        this.userService.new()
            .then(id => this.edit(id))
            .catch(console.error);
    }
    edit(id) {
        this.router.navigate([id], { relativeTo: this.route });
    }
    delete(id) {
        if (!confirm('確定刪除該名使用者?')) {
            return;
        }
        this.userService.delete(id).then(() => {
            this.userService.get().then(users => this.users = users)
                .catch(err => console.error(err));
        });
    }
};
UsersListComponent = __decorate([
    core_1.Component({
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
    }), 
    __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, user_service_1.UserService])
], UsersListComponent);
exports.UsersListComponent = UsersListComponent;
//# sourceMappingURL=users-list.component.js.map
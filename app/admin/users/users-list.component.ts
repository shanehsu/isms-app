import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

import { UserService } from './../../services/user.service'
import { UnitService } from './../../services/unit.service'
import { MessageService } from './../../services/message.service'
import { User } from './../../types/user'

enum UserState {
  Normal = 1,
  Deleting = 2,
  Errored = 3
}

@Component({
  template: `
    <div class="ui one column grid">
      <form class="ui form right aligned column">
        <button type="button" class="ui right floated blue labeled icon button" [class.loading]="creating" (click)="create()">
          <i class="plus icon"></i>新增使用者
        </button>
      </form>
    </div>

    <table class="ui striped table">
      <thead>
        <tr>
          <th style="min-width: 6em;">姓名</th>
          <th style="width: 100%;">電子郵件</th>
          <th style="min-width: 10em;">權限</th>
          <th style="min-width: 12em;">動作</th>
        </tr>
      </thead>
      <tbody>
        <!-- 訊息 -->
        <tr style="height: 8em;" *ngIf="!loading && users && users.length == 0 && !loadingError">
          <td style="text-align: center; font-size: 1.4em; color: rgb(160, 160, 160);" colspan="4">
            無資料
          </td>
        </tr>
        <tr style="height: 8em;" *ngIf="loading">
          <td style="text-align: center; font-size: 1.4em; color: rgb(160, 160, 160);" colspan="4">
            載入中 <i class="spinner loading icon"></i>
          </td>
        </tr>
        <tr style="height: 8em;" *ngIf="!loading && loadingError">
          <td style="text-align: center; font-size: 1.4em; color: rgb(160, 160, 160); margin-bottom: 0em;" colspan="4">
            <p>
              載入錯誤 <i class="warning sign icon"></i>
            </p>
            <a style="font-size: 0.5em; color: #7e8bb3;" class="link" (click)="reload()">重新載入？</a>
          </td>
        </tr>
        <tr *ngFor="let user of users" [class.warning]="states[user.id] == 2" [class.error]="states[user.id] == 3">
          <td>{{user.name}}</td>
          <td>{{user.email}}</td>
          <td>{{user.group | groupName}}</td>
          <td style="text-align: center;">
            <div class="small ui buttons">
              <button type="button" class="ui basic teal button" (click)="edit(user.id)">編輯</button>
              <button type="button" class="ui basic red button" (click)="delete(user.id)" [class.loading]="states[user.id] == 2">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>`
})

export class UsersListComponent implements OnInit {
  private loading: boolean
  private loadingError: any

  // 新增狀態
  private creating: boolean

  // 新聞狀態（正常、刪除中、錯誤）
  private states: { [id: string]: UserState }

  private users: User[]

  ngOnInit() {
    this.users = []

    this.loading = true
    this.loadingError = null
    this.creating = false
    this.states = {}

    this.reload()
  }
  reload() {
    this.userService.get()
      .then((users: User[]) => {
        for (let user of users) {
          this.states[user.id] = UserState.Normal
        }
        this.users = users
        this.loading = false
      })
      .catch(err => {
        this.loadingError = err
        this.loading = false
      })
  }
  create(): void {
    this.creating = true
    this.userService.create()
      .then(id => this.edit(id))
      .catch(err => {
        this.creating = false
        this.messageService.error("無法建立使用者", "建立使用者時發生錯誤，請檢查是否有使用者的 email 未修改。")
      });
  }
  edit(id: string): void {
    this.router.navigate([id], { relativeTo: this.route })
  }
  delete(id: string): void {
    if (!confirm('確定刪除該名使用者?')) {
      return
    }
    this.states[id] = UserState.Deleting
    this.userService.delete(id).then(() => {
      delete this.states[id]
      this.users.splice(this.users.findIndex(x => x.id == id), 1)
    }).catch(err => {
      this.states[id] = UserState.Errored
      this.messageService.error('刪除失敗', '刪除失敗，資料與伺服器可能不同步，請考慮重整網頁。')
    })
  }

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private messageService: MessageService) { }
}

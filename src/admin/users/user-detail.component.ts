import { Component, OnInit, AfterViewInit } from '@angular/core'

import { User } from './../../types/user'
import { Token } from './../../types/token'

import { UserService } from './../../services/user.service'

import { Router, ActivatedRoute } from '@angular/router'

@Component({
  template: `
    <form class="ui dimmable basic segment form" [class.loading]="loading" [class.dimmed]="updatingError || loadingError" #userForm="ngForm">
      <div class="ui simple blurring dimmer">
        <div class="content">
          <div class="center">
            <a class="link" (click)="reload()" style="font-size: 1.5em; color: #7e8bb3;">重新載入？</a>
          </div>
        </div>
      </div>

      <div class="field">
        <label>ID</label>
        <p>{{user.id}}</p>
      </div>
      <div class="field">
        <label>姓名</label>
        <input type="text" [(ngModel)]="user.name" name="name" required>
      </div>
      <div class="field">
        <label>電子郵件</label>
        <input type="text" [(ngModel)]="user.email" name="email" required>
      </div>
      <div class="field">
        <label>權限</label>
        <p *ngIf="user.group == 'vendors'">廠商</p>
        <div class="inline fields" id="groupRadio" *ngIf="user.group != 'vendors'">
          <div class="field">
            <div class="ui radio checkbox">
              <input name="radio" type="radio" value="1" [checked]="user.group == 'admins'" (change)="user.group = 'admins'">
              <label>管理員</label>
            </div>
          </div>
          <div class="field">
            <div class="ui radio checkbox">
              <input name="radio" type="radio" value="2" [checked]="user.group == 'securityPersonnel'" (change)="user.group = 'securityPersonnel'">
              <label>資訊安全人員</label>
            </div>
          </div>
          <div class="field">
            <div class="ui radio checkbox">
              <input name="radio" type="radio" value="3" [checked]="user.group == 'users'" (change)="user.group = 'users'">
              <label>一般使用者</label>
            </div>
          </div>
        </div>
      </div>
      <div class="field" *ngIf="user.group == 'vendors'">
        <label>已啟用</label>
        <p>{{user.confirmed ? '可使用' : '不可使用'}}</p>
      </div>

      <div class="field">
        <label>登入代幣</label>
        <p>該使用者有 {{user.tokens.length}} 個登入代幣。</p>
      </div>
      
      <div style="text-align: right;">
        <button type="button" class="ui grey button" (click)="return()">返回</button>
        <button type="button" class="ui green button" *ngIf="!user.confirmed" [class.loading]="confirming" (click)="confirm()">啟用</button>
        <button type="button" class="ui button" [class.blue]="userForm.form.valid" [class.loading]="updating"
          [class.red]="!userForm.form.valid" [disabled]="!userForm.form.valid" (click)="update()">更新</button>
        <button type="button" class="ui button" [class.green]="userForm.form.valid" [class.loading]="updating"
          [class.red]="!userForm.form.valid" [disabled]="!userForm.form.valid" (click)="updateAndReturn()">更新並返回</button>
      </div>
    </form>
    `
})

export class UserDetailComponent implements OnInit, AfterViewInit {
  private user: User
  private loading: boolean
  private confirming: boolean
  private updating: boolean
  private loadingError: any
  private confirmError: any
  private updatingError: any

  ngOnInit() {
    this.user = this.userService.placeholder
    this.loading = true
    this.confirming = false
    this.updating = false
    this.loadingError = null
    this.confirmError = null
    this.updatingError = null

    this.reload()
  }
  ngAfterViewInit() {
    (<any>$('div#groupRadio div.ui.radio.checkbox')).checkbox()
  }
  reload() {
    let id = this.route.snapshot.params['id']
    this.loading = true
    this.loadingError = null
    this.userService.get(id)
      .then((user: User) => {
        this.user = user
        this.loading = false
      })
      .catch(err => {
        this.loadingError = err
        this.loading = false
      })
  }
  async confirm() {
    this.confirming = true
    try {
      await this.userService.confirm(this.user.id)
      this.user.confirmed = true
    } catch (err) {
      this.confirmError = err
    }
    this.confirming = false
  }
  async update() {
    this.updating = true
    this.updatingError = null

    try {
      await this.userService.update(this.user)
    } catch (err) {
      this.updatingError = err
    }
    this.updating = false
  }
  async updateAndReturn() {
    await this.update()
    if (this.updatingError == null) {
      this.return()
    }
  }
  return() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) { }
}

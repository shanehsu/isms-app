import { Component, OnInit, Inject, AfterViewChecked } from '@angular/core';

import { User } from './../types/user'
import { Config } from './../types/config'
import { NavigationItem } from './../types/navigation-item'

import { AuthService } from './../services/auth.service'
import { TokenService } from './../services/token.service'

@Component({
  selector: 'isms-nav',
  template: `
  <div class="ui large fluid stackable menu">
    <a class="item" *ngFor="let item of navigationItems" [routerLink]="[item.path]" routerLinkActive="active">{{item.name}}</a>
    <template [ngIf]="user == undefined">
      <!-- 未登入 -->
      <div class="right item">
        <div class="ui action input">
          <input type="email" placeholder="電子郵件" (keydown)="keydown($event, credential)" #credential>
          <div class="ui green button" [class.loading]="loading" (click)="login(credential.value)">登入</div>
        </div>
      </div>
    </template>
    <template [ngIf]="user != undefined">
      <!-- 已經登入 -->
      <div class="right menu">
        <template [ngIf]="loading">
          <a class="item">
            登出中 <i class="notched circle loading icon" style="margin-left: 0.35714286em; margin-right: 0;"></i>
          </a>
        </template>
        <template [ngIf]="!loading">
          <div id="logoutDropdown" class="ui dropdown link item">
            <span class="text">{{user.name}}</span>
            <i class="dropdown icon"></i>
            <div class="menu">
              <div class="item" (click)="logout()">登出</div>
            </div>
          </div>
        </template>
      </div>
    </template>
  </div>`
})

export class NavigationComponent implements OnInit, AfterViewChecked {
  private navigationItems: NavigationItem[];
  private user: User | undefined
  private loading: boolean

  keydown(event: KeyboardEvent, input: HTMLInputElement) {
    if (event.keyCode == 13) {
      this.login(input.value)
    }
  }

  ngAfterViewChecked() {
    ($('div.ui.dropdown#logoutDropdown') as any).dropdown({
      on: 'hover'
    })
  }

  ngOnInit() {
    // 一開始假設 尚未登入
    this.user = undefined
    this.navigationItems = this.config.navigationItems.filter(item => item.group >= 4)
    this.loading = false

    // 獲取登入狀況
    this.checkLoginState()
  }

  checkLoginState() {
    if (this.authService.has_token) {
      this.loading = true

      this.authService.me().then(user => {
        this.user = user
        this.loading = false
        this.navigationItems = this.config.navigationItems.filter(item => item.group >= user.group)
      }).catch(error => {
        console.warn('原本有的 Token 已經失效或是不存在')
        this.loading = false
      })
    }
  }

  login(email: string) {
    this.loading = true

    this.authService.login(email).then(() => {
      this.authService.me().then(user => {
        // 成功登入、獲取帳號資料
        this.loading = false
        this.user = user
        this.navigationItems = this.config.navigationItems.filter(item => item.group >= user.group)
      }).catch(err => {
        // 獲取帳號資料失敗
        this.loading = false
        this.user = undefined
        this.navigationItems = this.config.navigationItems.filter(item => item.group >= 4)

        console.error(err)
        console.warn("認證成功，但是獲取帳號資訊失敗，請重新整理。")
      })
    }).catch(() => {
      // 登入失敗
      this.loading = false
      this.user = undefined
      this.navigationItems = this.config.navigationItems.filter(item => item.group >= 4)

      console.warn("登入失敗，請檢查電子郵件")
    });
  }

  logout() {
    let tokenId: string = '';

    for (var token of this.user!.tokens) {
      if (this.authService.retrieve_token() == token.token) {
        tokenId = token.id;
      }
    }

    if (tokenId) {
      this.loading = true

      this.tokenService.invalidate_token(tokenId).then(() => {
        console.warn("成功刪除伺服器端的認證代幣。")
        this.loading = false
      }).catch(error => {
        console.warn("無法刪除伺服器端的認證代幣。")
        this.loading = false
      })
    } else {
      console.warn("無法取得 Token 在資料庫中的 ID，無法送出刪除要求。")
    }

    // 刪除 Local Storage 中的 Token 資訊
    this.authService.remove_token()

    this.user = undefined

    this.navigationItems = this.config.navigationItems.filter(item => item.group >= 4)
  }

  constructor(private authService: AuthService, private tokenService: TokenService, @Inject('app.config') private config: Config) { }
}

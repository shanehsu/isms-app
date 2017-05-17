import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms'

import { User } from './../types/user'
import { Config } from './../types/config'
import { NavigationItem } from './../types/navigation-item'

import { AuthService } from './../services/auth.service'
import { MeService } from './../services/me.service'

import { SemanticModalComponent } from 'ng-semantic'

@Component({
  selector: 'isms-nav',
  template: `
  <div class="ui large fluid stackable menu">
    <a class="item" *ngFor="let item of navigationItems" [routerLink]="[item.path]" routerLinkActive="active">{{item.name}}</a>
    <sm-dropdown [title]="'參考資料'" class="link" [options]="{on: 'hover'}">
      <a class="item" href="https://olis.ncue.edu.tw/ct.asp?xItem=7191&CtNode=1130&mp=1">適用法規清單</a>
      <a class="item" href="https://olis.ncue.edu.tw/lp.asp?ctNode=1131&CtUnit=329&BaseDSD=7&mp=1">資訊安全政策</a>
      <a class="item" href="http://www.ncue.edu.tw/files/13-1000-12744.php">隱私權政策</a>
    </sm-dropdown>
    
    <ng-template [ngIf]="user == undefined">
      <div *ngIf="!loading" class="right item">
        <div class="ui green button" (click)="chooseLoginMethodModal.show()">登入</div>
      </div>
      <a class="right item" *ngIf="loading">載入中</a>
    </ng-template>
    <div class="right menu" *ngIf="user != undefined && !loading">
      <sm-dropdown [title]="user.name" class="link" [options]="{on: 'hover'}">
        <sm-item (click)="logout()">登出</sm-item>
      </sm-dropdown>
    </div>
  </div>
  
  <sm-modal title="登入方法" class="small" icon="sign in" #chooseLoginMethodModal>
    <modal-content>
      <p>若您就職於彰化師範大學，請選擇以單一簽入登入；若您是彰化師範大學的合作廠商，請選擇以帳號、密碼登入。</p>
      <p>若您是第一次使用此系統的廠商，請點選左下角的按鈕註冊。</p>
    </modal-content>
    <modal-actions>
      <div class="ui green button" style="float: left;" (click)="register()">註冊</div>
      <div class="ui buttons">
        <div class="ui blue button" (click)="login_standalone()">帳號、密碼</div>
        <div class="ui teal button" (click)="login_sso()">單一簽入</div>
      </div>
    </modal-actions>
  </sm-modal>
  <sm-modal title="廠商登入" class="long" icon="user plus" #standaloneLoginModal>
    <modal-content>
      <form class="ui form" #standaloneLoginForm="ngForm">
        <div class="required field">
          <label>電子郵件</label>
          <input type="email" name="email" placeholder="user@company.com" [(ngModel)]="loginInfo.email" #login_email="ngModel"
                 required pattern="^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$">
        </div>
        <div class="required field">
          <label>密碼</label>
          <input type="password" name="password" placeholder="" [(ngModel)]="loginInfo.password" #login_password="ngModel" required minlength="6">
        </div>
      </form>
    </modal-content>
    <modal-actions>
      <div class="ui green button" [class.disabled]="!standaloneLoginForm.valid" [class.loading]="loading" (click)="submit_login_standalone()">登入</div>
    </modal-actions>
  </sm-modal>
  <sm-modal title="登入失敗" class="small" icon="remove" #loginFailed>
    <modal-content>
      <p>登入失敗，請重試。</p>
    </modal-content>
  </sm-modal>
  <sm-modal title="廠商註冊" class="long" icon="user plus" #standaloneRegisterModal>
    <modal-content>
      <form class="ui form" #standaloneRegisterForm="ngForm">
        <div class="required field">
          <label>姓名</label>
          <input type="text" name="name" placeholder="林杏民" [(ngModel)]="registerInfo.name" #register_name="ngModel" required minlength="2">
        </div>
        <div class="required field">
          <label>電子郵件</label>
          <input type="email" name="email" placeholder="user@company.com" [(ngModel)]="registerInfo.email" #register_email="ngModel"
                 required pattern="^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$">
        </div>
        <div class="required field">
          <label>密碼</label>
          <input type="password" name="password" placeholder="" [(ngModel)]="registerInfo.password" #register_password="ngModel" required minlength="8" validateEqual="confirm" reverse="true">
        </div>
        <div class="required field">
          <label>密碼確認</label>
          <input type="password" name="confirm" placeholder="" [(ngModel)]="registerInfo.confirm" #register_confirm="ngModel" required validateEqual="password">
        </div>
        <div class="ui negative message" [class.hidden]="standaloneRegisterForm.valid">
          <div class="header">表單錯誤</div>
          <ul *ngFor="let error of registerFormErrors">
            <li>{{error}}</li>
          </ul>
        </div>
      </form>
    </modal-content>
    <modal-actions>
      <button type="button" (click)="submit_register_standalone()" class="ui green button" [class.disabled]="!standaloneRegisterForm.valid">註冊</button>
    </modal-actions>
  </sm-modal>
  <sm-modal title="註冊成功" class="small" icon="checkmark" #registerSuccess>
    <modal-content>
      <p>您已經註冊成功，請等待管理員確認。</p>
    </modal-content>
  </sm-modal>
  <sm-modal title="註冊失敗" class="small" icon="remove" #registerFailed>
    <modal-content>
      <p>註冊失敗，請重試。</p>
    </modal-content>
  </sm-modal>
  `
})

export class NavigationComponent implements OnInit {
  private navigationItems: NavigationItem[]
  private user: User | undefined
  private loading: boolean

  @ViewChild('chooseLoginMethodModal')
  private loginMethodModal: SemanticModalComponent

  @ViewChild('standaloneRegisterModal')
  private standaloneRegisterModal: SemanticModalComponent
  @ViewChild('standaloneRegisterForm')
  private standaloneRegisterForm: NgForm
  @ViewChild('register_name')
  private registerNameField: NgModel
  @ViewChild('register_email')
  private registerEmailField: NgModel
  @ViewChild('register_password')
  private registerPasswordField: NgModel
  @ViewChild('register_confirm')
  private registerConfirmField: NgModel
  private registerFormErrors: string[]
  private registerInfo = { name: '', email: '', password: '', confirm: '' }

  @ViewChild('standaloneLoginModal')
  private standaloneLoginModal: SemanticModalComponent
  @ViewChild('login_email')
  private loginEmailField: NgModel
  @ViewChild('login_password')
  private loginPasswordField: NgModel
  private loginInfo = { email: '', password: '' }
  @ViewChild('loginFailed')
  private loginFailedModel: SemanticModalComponent

  @ViewChild('registerSuccess')
  private registerSuccessModal: SemanticModalComponent
  @ViewChild('registerFailed')
  private registerFailedModal: SemanticModalComponent

  ngOnInit() {
    this.navigationItems = []
    this.registerFormErrors = []

    // 訂閱 User 以及 Loading
    this.meService.user.subscribe(u => {
      this.user = u
      if (u) {
        this.navigationItems = this.config.navigationItems.filter(item => {
          let role = true
          if (item.roles) {
            role = false
            if (u.unit) {
              for (let r of item.roles) {
                if (u.unit.role[r]) {
                  role = true
                  break
                }
              }
            }
          }
          return item.group.includes(u.group) && role
        })
      } else {
        this.navigationItems = this.config.navigationItems.filter(item => item.group.includes('guests'))
      }
    })
    this.meService.isLoading.subscribe(_ => {
      this.loading = this.meService.isLoading.getValue() || this.authService.isLoading.getValue()
    })
    this.authService.isLoading.subscribe(_ => {
      this.loading = this.meService.isLoading.getValue() || this.authService.isLoading.getValue()
    })
    this.standaloneRegisterForm.valueChanges.subscribe(_ => {
      let messageGenerator = function (field: string, object: any): string {
        if (object.required) {
          return `${field} 為必填欄位`
        } else if (object.minlength) {
          return `${field} 的長度最少必須達到 ${object.minlength.requiredLength} 個字元（現在長度：${object.minlength.actualLength}）`
        } else if (object.pattern) {
          return `必須填入合法的電子郵件位址`
        } else if (object.validateEqual != undefined && object.validateEqual == false) {
          return `密碼及密碼確認必須相同`
        }
      }

      this.registerFormErrors = []
      let fields = [
        { field: this.registerNameField, name: '姓名' },
        { field: this.registerEmailField, name: '電子郵件' },
        { field: this.registerPasswordField, name: '密碼' },
        { field: this.registerConfirmField, name: '密碼確認' }
      ]

      for (let field of fields) {
        if (field.field.errors) {
          this.registerFormErrors.push(messageGenerator(field.name, field.field.errors))
        }
      }
    })
  }
  login(email: string, password: string) {
    this.loading = true
    this.authService.login(email, password).then(_ => { })
  }
  logout() {
    this.user = undefined

    this.meService.invalidate_current_token().then(() => {
      console.warn("成功刪除伺服器端的認證代幣。")
    }).catch(error => {
      console.warn("無法刪除伺服器端的認證代幣。")
    })

    this.navigationItems = this.config.navigationItems.filter(item => item.group.includes('guests'))
  }
  login_sso(): void {
    this.authService.login_sso()
  }
  login_standalone(): void {
    this.standaloneLoginModal.show()
    this.loginMethodModal.hide()
  }
  register(): void {
    this.standaloneRegisterModal.show()
    this.loginMethodModal.hide()
  }
  submit_login_standalone(): void {
    this.authService.login(this.loginInfo.email, this.loginInfo.password).then(_ => {
      this.standaloneLoginModal.hide()
    }).catch(_ => {
      this.loginFailedModel.show()
    })
  }
  submit_register_standalone(): void {
    console.dir(this.registerInfo)
    this.authService.register(this.registerInfo.name, this.registerInfo.email, this.registerInfo.password).then(_ => {
      this.registerSuccessModal.show()
      this.standaloneRegisterModal.hide()
    }).catch(_ => {
      this.registerFailedModal.show()
      this.standaloneRegisterModal.hide()
    })
  }
  constructor(private authService: AuthService, private meService: MeService, @Inject('app.config') private config: Config) { }
}

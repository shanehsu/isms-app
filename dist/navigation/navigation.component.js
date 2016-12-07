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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
const core_1 = require('@angular/core');
const forms_1 = require('@angular/forms');
const auth_service_1 = require('./../services/auth.service');
const me_service_1 = require('./../services/me.service');
const ng_semantic_1 = require('ng-semantic');
let NavigationComponent = class NavigationComponent {
    constructor(authService, meService, config) {
        this.authService = authService;
        this.meService = meService;
        this.config = config;
        this.registerInfo = { name: '', email: '', password: '', confirm: '' };
        this.loginInfo = { email: '', password: '' };
    }
    ngOnInit() {
        this.navigationItems = [];
        this.registerFormErrors = [];
        // 訂閱 User 以及 Loading
        this.meService.user.subscribe(u => {
            this.user = u;
            if (u) {
                this.navigationItems = this.config.navigationItems.filter(item => item.group.includes(u.group));
            }
            else {
                this.navigationItems = this.config.navigationItems.filter(item => item.group.includes('guests'));
            }
        });
        this.meService.isLoading.subscribe(_ => {
            this.loading = this.meService.isLoading.getValue() || this.authService.isLoading.getValue();
        });
        this.authService.isLoading.subscribe(_ => {
            this.loading = this.meService.isLoading.getValue() || this.authService.isLoading.getValue();
        });
        this.standaloneRegisterForm.valueChanges.subscribe(_ => {
            let messageGenerator = function (field, object) {
                if (object.required) {
                    return `${field} 為必填欄位`;
                }
                else if (object.minlength) {
                    return `${field} 的長度最少必須達到 ${object.minlength.requiredLength} 個字元（現在長度：${object.minlength.actualLength}）`;
                }
                else if (object.pattern) {
                    return `必須填入合法的電子郵件位址`;
                }
                else if (object.validateEqual != undefined && object.validateEqual == false) {
                    return `密碼及密碼確認必須相同`;
                }
            };
            this.registerFormErrors = [];
            let fields = [
                { field: this.registerNameField, name: '姓名' },
                { field: this.registerEmailField, name: '電子郵件' },
                { field: this.registerPasswordField, name: '密碼' },
                { field: this.registerConfirmField, name: '密碼確認' }
            ];
            for (let field of fields) {
                if (field.field.errors) {
                    this.registerFormErrors.push(messageGenerator(field.name, field.field.errors));
                }
            }
        });
    }
    login(email, password) {
        this.loading = true;
        this.authService.login(email, password).then(_ => { });
    }
    logout() {
        this.user = undefined;
        this.meService.invalidate_current_token().then(() => {
            console.warn("成功刪除伺服器端的認證代幣。");
        }).catch(error => {
            console.warn("無法刪除伺服器端的認證代幣。");
        });
        this.navigationItems = this.config.navigationItems.filter(item => item.group.includes('guests'));
    }
    login_sso() {
        this.authService.login_sso();
    }
    login_standalone() {
        this.standaloneLoginModal.show();
        this.loginMethodModal.hide();
    }
    register() {
        this.standaloneRegisterModal.show();
        this.loginMethodModal.hide();
    }
    submit_login_standalone() {
        this.authService.login(this.loginInfo.email, this.loginInfo.password).then(_ => {
            this.standaloneLoginModal.hide();
        }).catch(_ => {
            this.loginFailedModel.show();
        });
    }
    submit_register_standalone() {
        console.dir(this.registerInfo);
        this.authService.register(this.registerInfo.name, this.registerInfo.email, this.registerInfo.password).then(_ => {
            this.registerSuccessModal.show();
            this.standaloneRegisterModal.hide();
        }).catch(_ => {
            this.registerFailedModal.show();
            this.standaloneRegisterModal.hide();
        });
    }
};
__decorate([
    core_1.ViewChild('chooseLoginMethodModal'), 
    __metadata('design:type', ng_semantic_1.SemanticModalComponent)
], NavigationComponent.prototype, "loginMethodModal", void 0);
__decorate([
    core_1.ViewChild('standaloneRegisterModal'), 
    __metadata('design:type', ng_semantic_1.SemanticModalComponent)
], NavigationComponent.prototype, "standaloneRegisterModal", void 0);
__decorate([
    core_1.ViewChild('standaloneRegisterForm'), 
    __metadata('design:type', forms_1.NgForm)
], NavigationComponent.prototype, "standaloneRegisterForm", void 0);
__decorate([
    core_1.ViewChild('register_name'), 
    __metadata('design:type', forms_1.NgModel)
], NavigationComponent.prototype, "registerNameField", void 0);
__decorate([
    core_1.ViewChild('register_email'), 
    __metadata('design:type', forms_1.NgModel)
], NavigationComponent.prototype, "registerEmailField", void 0);
__decorate([
    core_1.ViewChild('register_password'), 
    __metadata('design:type', forms_1.NgModel)
], NavigationComponent.prototype, "registerPasswordField", void 0);
__decorate([
    core_1.ViewChild('register_confirm'), 
    __metadata('design:type', forms_1.NgModel)
], NavigationComponent.prototype, "registerConfirmField", void 0);
__decorate([
    core_1.ViewChild('standaloneLoginModal'), 
    __metadata('design:type', ng_semantic_1.SemanticModalComponent)
], NavigationComponent.prototype, "standaloneLoginModal", void 0);
__decorate([
    core_1.ViewChild('login_email'), 
    __metadata('design:type', forms_1.NgModel)
], NavigationComponent.prototype, "loginEmailField", void 0);
__decorate([
    core_1.ViewChild('login_password'), 
    __metadata('design:type', forms_1.NgModel)
], NavigationComponent.prototype, "loginPasswordField", void 0);
__decorate([
    core_1.ViewChild('loginFailed'), 
    __metadata('design:type', ng_semantic_1.SemanticModalComponent)
], NavigationComponent.prototype, "loginFailedModel", void 0);
__decorate([
    core_1.ViewChild('registerSuccess'), 
    __metadata('design:type', ng_semantic_1.SemanticModalComponent)
], NavigationComponent.prototype, "registerSuccessModal", void 0);
__decorate([
    core_1.ViewChild('registerFailed'), 
    __metadata('design:type', ng_semantic_1.SemanticModalComponent)
], NavigationComponent.prototype, "registerFailedModal", void 0);
NavigationComponent = __decorate([
    core_1.Component({
        selector: 'isms-nav',
        template: `
  <div class="ui large fluid stackable menu">
    <a class="item" *ngFor="let item of navigationItems" [routerLink]="[item.path]" routerLinkActive="active">{{item.name}}</a>
    <template [ngIf]="user == undefined">
      <div *ngIf="!loading" class="right item">
        <div class="ui green button" (click)="chooseLoginMethodModal.show()">登入</div>
      </div>
      <a class="right item" *ngIf="loading">載入中</a>
    </template>
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
          <input type="password" name="password" placeholder="" [(ngModel)]="registerInfo.password" #register_password="ngModel" required minlength="6" validateEqual="confirm" reverse="true">
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
    }),
    __param(2, core_1.Inject('app.config')), 
    __metadata('design:paramtypes', [auth_service_1.AuthService, me_service_1.MeService, Object])
], NavigationComponent);
exports.NavigationComponent = NavigationComponent;
//# sourceMappingURL=navigation.component.js.map
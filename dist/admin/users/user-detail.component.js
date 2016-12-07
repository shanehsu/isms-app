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
const core_1 = require('@angular/core');
const user_service_1 = require('./../../services/user.service');
const router_1 = require('@angular/router');
let UserDetailComponent = class UserDetailComponent {
    constructor(router, route, userService) {
        this.router = router;
        this.route = route;
        this.userService = userService;
    }
    ngOnInit() {
        this._user = this.userService.emptyUser();
        this._id = this.route.snapshot.params['id'];
        this.userService.get(this._id).then(user => this._user = user[0]).catch(console.error);
    }
    ngAfterViewInit() {
        $('#unit_label').popup({
            inline: true,
            hoverable: true
        });
        $('div#groupRadio div.ui.radio.checkbox').checkbox();
    }
    submit() {
        this.userService.update(this._user)
            .then(() => this.router.navigate(['..'], { relativeTo: this.route }))
            .catch(console.error);
    }
    cancel() {
        this.router.navigate(['..'], { relativeTo: this.route });
    }
    gotoUnit(unitID) {
        this.router.navigate(['..', 'units', unitID], { relativeTo: this.route });
    }
};
UserDetailComponent = __decorate([
    core_1.Component({
        template: `
    <form class="ui form" (ngSubmit)="submit()" #userForm="ngForm">
      <div class="field">
        <label>ID</label>
        <p>{{_user.id}}</p>
      </div>

      <div class="field">
        <label>姓名</label>
        <input type="text" [(ngModel)]="_user.name" name="name" required>
      </div>

      <div class="field">
        <label>電子郵件</label>
        <input type="text" [(ngModel)]="_user.email" name="email" required>
      </div>

      <div class="field">
        <label>單位</label>
        <p id="unit_label">{{_user.unit | unitName}}</p>
        
        <!-- 前往該單位的提示 -->
        <div style="text-align: center;" class="ui flowing popup transition hidden">
          <p>前往單位設定畫面</p>
          <button class="ui tiny teal button" type="button" (click)="gotoUnit(_user.unit)">前往</button>
        </div>
      </div>

      <div class="field">
        <label>權限</label>
        <div class="inline fields" id="groupRadio">
          <div class="field">
            <div class="ui radio checkbox">
              <input name="radio" type="radio" value="1" [checked]="_user.group == 1" (change)="_user.group = 1">
              <label>管理員</label>
            </div>
          </div>
          <div class="field">
            <div class="ui radio checkbox">
              <input name="radio" type="radio" value="2" [checked]="_user.group == 2" (change)="_user.group = 2">
              <label>資訊安全人員</label>
            </div>
          </div>
          <div class="field">
            <div class="ui radio checkbox">
              <input name="radio" type="radio" value="3" [checked]="_user.group == 3" (change)="_user.group = 3">
              <label>一般使用者</label>
            </div>
          </div>
        </div>
      </div>

      <div class="field">
        <label>登入代幣</label>
        <p>該使用者有 {{_user.tokens.length}} 個登入代幣。</p>
      </div>
      
      <div style="text-align: right;">
        <button type="button" class="ui basic button" (click)="cancel()">取消</button>
        <button type="submit" class="ui basic button" [class.green]="userForm.form.valid" [class.red]="!userForm.form.valid" [disabled]="!userForm.form.valid">更新</button>
      </div>
    </form>

    `
    }), 
    __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, user_service_1.UserService])
], UserDetailComponent);
exports.UserDetailComponent = UserDetailComponent;
//# sourceMappingURL=user-detail.component.js.map
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
var core_1 = require("@angular/core");
var user_service_1 = require("./../../services/user.service");
var router_1 = require("@angular/router");
var UserDetailComponent = (function () {
    function UserDetailComponent(router, route, userService) {
        this.router = router;
        this.route = route;
        this.userService = userService;
    }
    UserDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._user = this.userService.emptyUser();
        this._id = this.route.snapshot.params['id'];
        this.userService.get(this._id).then(function (user) { return _this._user = user[0]; }).catch(console.error);
    };
    UserDetailComponent.prototype.ngAfterViewInit = function () {
        $('#unit_label').popup({
            inline: true,
            hoverable: true
        });
        $('div#groupRadio div.ui.radio.checkbox').checkbox();
    };
    UserDetailComponent.prototype.submit = function () {
        var _this = this;
        this.userService.update(this._user)
            .then(function () { return _this.router.navigate(['..'], { relativeTo: _this.route }); })
            .catch(console.error);
    };
    UserDetailComponent.prototype.cancel = function () {
        this.router.navigate(['..'], { relativeTo: this.route });
    };
    UserDetailComponent.prototype.gotoUnit = function (unitID) {
        this.router.navigate(['..', 'units', unitID], { relativeTo: this.route });
    };
    return UserDetailComponent;
}());
UserDetailComponent = __decorate([
    core_1.Component({
        template: "\n    <form class=\"ui form\" (ngSubmit)=\"submit()\" #userForm=\"ngForm\">\n      <div class=\"field\">\n        <label>ID</label>\n        <p>{{_user.id}}</p>\n      </div>\n\n      <div class=\"field\">\n        <label>\u59D3\u540D</label>\n        <input type=\"text\" [(ngModel)]=\"_user.name\" name=\"name\" required>\n      </div>\n\n      <div class=\"field\">\n        <label>\u96FB\u5B50\u90F5\u4EF6</label>\n        <input type=\"text\" [(ngModel)]=\"_user.email\" name=\"email\" required>\n      </div>\n\n      <div class=\"field\">\n        <label>\u55AE\u4F4D</label>\n        <p id=\"unit_label\">{{_user.unit | unitName}}</p>\n        \n        <!-- \u524D\u5F80\u8A72\u55AE\u4F4D\u7684\u63D0\u793A -->\n        <div style=\"text-align: center;\" class=\"ui flowing popup transition hidden\">\n          <p>\u524D\u5F80\u55AE\u4F4D\u8A2D\u5B9A\u756B\u9762</p>\n          <button class=\"ui tiny teal button\" type=\"button\" (click)=\"gotoUnit(_user.unit)\">\u524D\u5F80</button>\n        </div>\n      </div>\n\n      <div class=\"field\">\n        <label>\u6B0A\u9650</label>\n        <div class=\"inline fields\" id=\"groupRadio\">\n          <div class=\"field\">\n            <div class=\"ui radio checkbox\">\n              <input name=\"radio\" type=\"radio\" value=\"1\" [checked]=\"_user.group == 1\" (change)=\"_user.group = 1\">\n              <label>\u7BA1\u7406\u54E1</label>\n            </div>\n          </div>\n          <div class=\"field\">\n            <div class=\"ui radio checkbox\">\n              <input name=\"radio\" type=\"radio\" value=\"2\" [checked]=\"_user.group == 2\" (change)=\"_user.group = 2\">\n              <label>\u8CC7\u8A0A\u5B89\u5168\u4EBA\u54E1</label>\n            </div>\n          </div>\n          <div class=\"field\">\n            <div class=\"ui radio checkbox\">\n              <input name=\"radio\" type=\"radio\" value=\"3\" [checked]=\"_user.group == 3\" (change)=\"_user.group = 3\">\n              <label>\u4E00\u822C\u4F7F\u7528\u8005</label>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"field\">\n        <label>\u767B\u5165\u4EE3\u5E63</label>\n        <p>\u8A72\u4F7F\u7528\u8005\u6709 {{_user.tokens.length}} \u500B\u767B\u5165\u4EE3\u5E63\u3002</p>\n      </div>\n      \n      <div style=\"text-align: right;\">\n        <button type=\"button\" class=\"ui basic button\" (click)=\"cancel()\">\u53D6\u6D88</button>\n        <button type=\"submit\" class=\"ui basic button\" [class.green]=\"userForm.form.valid\" [class.red]=\"!userForm.form.valid\" [disabled]=\"!userForm.form.valid\">\u66F4\u65B0</button>\n      </div>\n    </form>\n\n    "
    }),
    __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, user_service_1.UserService])
], UserDetailComponent);
exports.UserDetailComponent = UserDetailComponent;
//# sourceMappingURL=user-detail.component.js.map
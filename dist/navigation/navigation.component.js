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
var core_1 = require("@angular/core");
var auth_service_1 = require("./../services/auth.service");
var token_service_1 = require("./../services/token.service");
var NavigationComponent = (function () {
    function NavigationComponent(authService, tokenService, config) {
        this.authService = authService;
        this.tokenService = tokenService;
        this.config = config;
    }
    NavigationComponent.prototype.keydown = function (event, input) {
        if (event.keyCode == 13) {
            this.login(input.value);
        }
    };
    NavigationComponent.prototype.ngAfterViewChecked = function () {
        $('div.ui.dropdown#logoutDropdown').dropdown({
            on: 'hover'
        });
    };
    NavigationComponent.prototype.ngOnInit = function () {
        // 一開始假設 尚未登入
        this.user = undefined;
        this.navigationItems = this.config.navigationItems.filter(function (item) { return item.group >= 4; });
        this.loading = false;
        // 獲取登入狀況
        this.checkLoginState();
    };
    NavigationComponent.prototype.checkLoginState = function () {
        var _this = this;
        if (this.authService.has_token) {
            this.loading = true;
            this.authService.me().then(function (user) {
                _this.user = user;
                _this.loading = false;
                _this.navigationItems = _this.config.navigationItems.filter(function (item) { return item.group >= user.group; });
            }).catch(function (error) {
                console.warn('原本有的 Token 已經失效或是不存在');
                _this.loading = false;
            });
        }
    };
    NavigationComponent.prototype.login = function (email) {
        var _this = this;
        this.loading = true;
        this.authService.login(email).then(function () {
            _this.authService.me().then(function (user) {
                // 成功登入、獲取帳號資料
                _this.loading = false;
                _this.user = user;
                _this.navigationItems = _this.config.navigationItems.filter(function (item) { return item.group >= user.group; });
            }).catch(function (err) {
                // 獲取帳號資料失敗
                _this.loading = false;
                _this.user = undefined;
                _this.navigationItems = _this.config.navigationItems.filter(function (item) { return item.group >= 4; });
                console.error(err);
                console.warn("認證成功，但是獲取帳號資訊失敗，請重新整理。");
            });
        }).catch(function () {
            // 登入失敗
            _this.loading = false;
            _this.user = undefined;
            _this.navigationItems = _this.config.navigationItems.filter(function (item) { return item.group >= 4; });
            console.warn("登入失敗，請檢查電子郵件");
        });
    };
    NavigationComponent.prototype.logout = function () {
        var _this = this;
        var tokenId = '';
        for (var _i = 0, _a = this.user.tokens; _i < _a.length; _i++) {
            var token = _a[_i];
            if (this.authService.retrieve_token() == token.token) {
                tokenId = token.id;
            }
        }
        if (tokenId) {
            this.loading = true;
            this.tokenService.invalidate_token(tokenId).then(function () {
                console.warn("成功刪除伺服器端的認證代幣。");
                _this.loading = false;
            }).catch(function (error) {
                console.warn("無法刪除伺服器端的認證代幣。");
                _this.loading = false;
            });
        }
        else {
            console.warn("無法取得 Token 在資料庫中的 ID，無法送出刪除要求。");
        }
        // 刪除 Local Storage 中的 Token 資訊
        this.authService.remove_token();
        this.user = undefined;
        this.navigationItems = this.config.navigationItems.filter(function (item) { return item.group >= 4; });
    };
    return NavigationComponent;
}());
NavigationComponent = __decorate([
    core_1.Component({
        selector: 'isms-nav',
        template: "\n  <div class=\"ui large fluid stackable menu\">\n    <a class=\"item\" *ngFor=\"let item of navigationItems\" [routerLink]=\"[item.path]\" routerLinkActive=\"active\">{{item.name}}</a>\n    <template [ngIf]=\"user == undefined\">\n      <!-- \u672A\u767B\u5165 -->\n      <div class=\"right item\">\n        <div class=\"ui action input\">\n          <input type=\"email\" placeholder=\"\u96FB\u5B50\u90F5\u4EF6\" (keydown)=\"keydown($event, credential)\" #credential>\n          <div class=\"ui green button\" [class.loading]=\"loading\" (click)=\"login(credential.value)\">\u767B\u5165</div>\n        </div>\n      </div>\n    </template>\n    <template [ngIf]=\"user != undefined\">\n      <!-- \u5DF2\u7D93\u767B\u5165 -->\n      <div class=\"right menu\">\n        <template [ngIf]=\"loading\">\n          <a class=\"item\">\n            \u767B\u51FA\u4E2D <i class=\"notched circle loading icon\" style=\"margin-left: 0.35714286em; margin-right: 0;\"></i>\n          </a>\n        </template>\n        <template [ngIf]=\"!loading\">\n          <div id=\"logoutDropdown\" class=\"ui dropdown link item\">\n            <span class=\"text\">{{user.name}}</span>\n            <i class=\"dropdown icon\"></i>\n            <div class=\"menu\">\n              <div class=\"item\" (click)=\"logout()\">\u767B\u51FA</div>\n            </div>\n          </div>\n        </template>\n      </div>\n    </template>\n  </div>"
    }),
    __param(2, core_1.Inject('app.config')),
    __metadata("design:paramtypes", [auth_service_1.AuthService, token_service_1.TokenService, Object])
], NavigationComponent);
exports.NavigationComponent = NavigationComponent;
//# sourceMappingURL=navigation.component.js.map
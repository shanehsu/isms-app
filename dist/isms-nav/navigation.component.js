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
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var auth_service_1 = require("./../services/auth.service");
var token_service_1 = require("./../services/token.service");
var NavigationComponent = (function () {
    function NavigationComponent(router, _location, _authService, _tokenService, _config) {
        this.router = router;
        this._location = _location;
        this._authService = _authService;
        this._tokenService = _tokenService;
        this._config = _config;
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
        this.navigationItems = this._config.navigationItems.filter(function (item) { return item.group >= 4; });
        this.loading = false;
        // 獲取登入狀況
        this.checkLoginState();
    };
    NavigationComponent.prototype.navigate = function (item) {
        this.router.navigate([item.path]);
    };
    NavigationComponent.prototype.isActive = function (item) {
        return this._location.path().startsWith(item.path);
    };
    NavigationComponent.prototype.checkLoginState = function () {
        var _this = this;
        if (this._authService.has_token) {
            this.loading = true;
            this._authService.me().then(function (user) {
                _this.user = user;
                _this.loading = false;
                _this.navigationItems = _this._config.navigationItems.filter(function (item) { return item.group >= user.group; });
            }).catch(function (error) {
                console.warn('原本有的 Token 已經失效或是不存在');
                _this.loading = false;
            });
        }
    };
    NavigationComponent.prototype.login = function (email) {
        var _this = this;
        this.loading = true;
        this._authService.login(email).then(function () {
            _this._authService.me().then(function (user) {
                // 成功登入、獲取帳號資料
                _this.loading = false;
                _this.user = user;
                _this.navigationItems = _this._config.navigationItems.filter(function (item) { return item.group >= user.group; });
            }).catch(function (err) {
                // 獲取帳號資料失敗
                _this.loading = false;
                _this.user = undefined;
                _this.navigationItems = _this._config.navigationItems.filter(function (item) { return item.group >= 4; });
                console.error(err);
                console.warn("認證成功，但是獲取帳號資訊失敗，請重新整理。");
            });
        }).catch(function () {
            // 登入失敗
            _this.loading = false;
            _this.user = undefined;
            _this.navigationItems = _this._config.navigationItems.filter(function (item) { return item.group >= 4; });
            console.warn("登入失敗，請檢查電子郵件");
        });
    };
    NavigationComponent.prototype.logout = function () {
        var _this = this;
        var tokenId = '';
        for (var _i = 0, _a = this.user.tokens; _i < _a.length; _i++) {
            var token = _a[_i];
            if (this._authService.retrieve_token() == token.token) {
                tokenId = token.id;
            }
        }
        if (tokenId) {
            this.loading = true;
            this._tokenService.invalidate_token(tokenId).then(function () {
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
        this._authService.remove_token();
        this.user = undefined;
        this.navigationItems = this._config.navigationItems.filter(function (item) { return item.group >= 4; });
    };
    return NavigationComponent;
}());
NavigationComponent = __decorate([
    core_1.Component({
        selector: 'isms-nav',
        templateUrl: '/app/isms-nav/navigation.template.html',
        directives: []
    }),
    __param(4, core_1.Inject('app.config')),
    __metadata("design:paramtypes", [router_1.Router, common_1.Location, auth_service_1.AuthService, token_service_1.TokenService, Object])
], NavigationComponent);
exports.NavigationComponent = NavigationComponent;
//# sourceMappingURL=navigation.component.js.map
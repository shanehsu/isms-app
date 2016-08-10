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
var core_1 = require('@angular/core');
var auth_service_1 = require('./../../services/auth.service');
var token_service_1 = require('./../../services/token.service');
var NavigationLoginComponent = (function () {
    function NavigationLoginComponent(_authService, _tokenService) {
        this._authService = _authService;
        this._tokenService = _tokenService;
        this.authStatusDidChange = new core_1.EventEmitter();
        this._state = 0;
    }
    NavigationLoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this._authService.has_token()) {
            this._state = -1;
            this._authService.me().then(function (user) {
                _this._currentUser = user;
                _this._state = 1;
                _this.authStatusDidChange.emit(null);
            }).catch(function () { return _this._state = 0; });
        }
        else {
            this._state = 0;
        }
    };
    NavigationLoginComponent.prototype.login = function (email) {
        var _this = this;
        this._state = -1;
        this._authService.login(email).then(function () {
            _this._authService.me().then(function (user) {
                _this._currentUser = user;
                _this._state = 1;
                _this.authStatusDidChange.emit(null);
            }).catch(function () { return _this._state = 0; });
        }).catch(function () {
            _this._state = 0;
        });
    };
    NavigationLoginComponent.prototype.logout = function () {
        this._state = 0;
        var token_id = undefined;
        for (var _i = 0, _a = this._currentUser.tokens; _i < _a.length; _i++) {
            var token = _a[_i];
            if (this._authService.retrieve_token() == token.token) {
                token_id = token.id;
            }
        }
        if (token_id) {
            this._tokenService.invalidate_token(token_id);
        }
        this._currentUser = undefined;
        this._authService.remove_token();
        this.authStatusDidChange.emit(null);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], NavigationLoginComponent.prototype, "authStatusDidChange", void 0);
    NavigationLoginComponent = __decorate([
        core_1.Component({
            selector: 'isms-nav-login',
            templateUrl: '/app/isms-nav/isms-nav-login/navigation-login.template.html'
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, token_service_1.TokenService])
    ], NavigationLoginComponent);
    return NavigationLoginComponent;
}());
exports.NavigationLoginComponent = NavigationLoginComponent;
//# sourceMappingURL=navigation-login.component.js.map
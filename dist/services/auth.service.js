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
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var AuthService = (function () {
    function AuthService(_http, _config) {
        this._http = _http;
        this._config = _config;
        this._baseURL = _config.endpoint + '/auth';
    }
    AuthService.prototype.login = function (email) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var endpoint = _this._baseURL + '/login';
            var headers = new http_1.Headers();
            headers.append('Content-Type', 'application/json');
            _this._http.post(endpoint, JSON.stringify({
                'email': email
            }), {
                headers: headers
            })
                .map(function (res) { return res.text(); })
                .subscribe(function (data) {
                localStorage.setItem('token', data);
                resolve();
            }, function (err) { return reject(); });
        });
    };
    AuthService.prototype.has_token = function () {
        if (localStorage.getItem('token')) {
            return true;
        }
        else {
            return false;
        }
    };
    AuthService.prototype.validate_token = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.retrieve_token()) {
                var endpoint = _this._baseURL + '/valid';
                var headers = new http_1.Headers();
                headers.append('Content-Type', 'application/json');
                _this._http.post(endpoint, JSON.stringify({
                    'token': _this.retrieve_token()
                }), {
                    headers: headers
                })
                    .map(function (res) { return res.json(); })
                    .subscribe(function (data) {
                    if (data.valid) {
                        resolve(true);
                    }
                    else {
                        _this.remove_token();
                        resolve(false);
                    }
                }, function (err) { return resolve(false); });
            }
        });
    };
    AuthService.prototype.retrieve_token = function () {
        if (this.has_token()) {
            return localStorage.getItem('token');
        }
        else {
            return '';
        }
    };
    AuthService.prototype.remove_token = function () {
        if (this.has_token()) {
            localStorage.removeItem('token');
            localStorage.removeItem('userid');
        }
    };
    AuthService.prototype.me = function () {
        var _this = this;
        if (!this.has_token) {
            return Promise.reject('no token in local storage');
        }
        else {
            return new Promise(function (resolve, reject) {
                var endpoint = _this._config.endpoint + '/users/me';
                var headers = new http_1.Headers();
                headers.append('token', _this.retrieve_token());
                _this._http.get(endpoint, {
                    headers: headers
                }).map(function (response) { return response.json(); }).subscribe(function (data) {
                    localStorage.setItem('userid', data._id);
                    resolve({
                        id: data._id,
                        email: data.email,
                        name: data.name,
                        group: data.group,
                        unit: data.unit,
                        tokens: data.tokens.map(function (value) {
                            return {
                                id: value._id,
                                origin: value.origin,
                                token: value.token,
                                userAgent: value.userAgent,
                                used: new Date(value.used)
                            };
                        })
                    });
                }, function (err) {
                    console.error(err);
                    reject(err);
                });
            });
        }
    };
    AuthService.prototype.privilege = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.me().then(function (me) { return resolve(me.group); }).catch(reject);
        });
    };
    AuthService = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject("app.config")), 
        __metadata('design:paramtypes', [http_1.Http, Object])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
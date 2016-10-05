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
var http_1 = require("@angular/http");
var auth_service_1 = require("./auth.service");
var UserService = (function () {
    function UserService(_authService, _http, _config) {
        this._authService = _authService;
        this._http = _http;
        this._config = _config;
        this._baseURL = _config.endpoint + '/users';
    }
    UserService.prototype.emptyUser = function () {
        return {
            id: '',
            email: '',
            name: '',
            unit: '',
            group: 10,
            tokens: []
        };
    };
    /**
     * If `id` is given, a list containing one user is returned.
     * Otherwise, a list of all users is returned.
     * Retrieving all users also means that tokens field is left out.
     */
    UserService.prototype.get = function (id) {
        var _this = this;
        var headers = new http_1.Headers({
            token: this._authService.retrieve_token()
        });
        if (id) {
            return new Promise(function (resolve, reject) {
                _this._http.get(_this._baseURL + '/' + id, {
                    headers: headers
                }).map(function (res) { return res.json(); })
                    .subscribe(function (user) {
                    resolve([
                        {
                            id: user._id,
                            email: user.email,
                            name: user.name,
                            unit: user.unit,
                            group: user.group,
                            tokens: user.tokens.map(function (value) {
                                return {
                                    id: value._id,
                                    origin: value.origin,
                                    token: value.token,
                                    userAgent: value.userAgent,
                                    used: new Date(value.used)
                                };
                            })
                        }
                    ]);
                }, function (err) { return reject(err); });
            });
        }
        return new Promise(function (resolve, reject) {
            _this._http.get(_this._baseURL, {
                headers: headers
            }).map(function (res) { return res.json(); })
                .subscribe(function (users) { return resolve(users.map(function (user) {
                return ({
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    unit: user.unit,
                    group: user.group,
                    tokens: []
                });
            })); }, function (err) { return reject(err); });
        });
    };
    UserService.prototype.new = function (user) {
        var _this = this;
        var postObject;
        if (user) {
            postObject = user;
            postObject.id = undefined;
        }
        else {
            postObject = {
                email: '',
                name: '',
                group: 10,
                tokens: []
            };
        }
        return new Promise(function (resolve, reject) {
            _this._http.post(_this._baseURL, JSON.stringify(postObject), {
                headers: new http_1.Headers({
                    token: _this._authService.retrieve_token(),
                    'Content-Type': 'application/json'
                })
            }).map(function (res) { return res.text(); }).subscribe(function (id) { return resolve(id); }, function (err) { return reject(err); });
        });
    };
    UserService.prototype.update = function (originalUser) {
        var _this = this;
        var user = Object.assign({}, originalUser);
        var id = user.id;
        var object = user;
        object.tokens = undefined;
        if (user.unit == '') {
            object.unit = undefined;
        }
        return new Promise(function (resolve, reject) {
            _this._http.put(_this._baseURL + '/' + id, JSON.stringify(object), {
                headers: new http_1.Headers({
                    token: _this._authService.retrieve_token(),
                    'Content-Type': 'application/json'
                })
            }).subscribe(function () { return resolve(); }, function (err) { return reject(err); });
        });
    };
    UserService.prototype.delete = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._http.delete(_this._baseURL + '/' + id, {
                headers: new http_1.Headers({
                    token: _this._authService.retrieve_token(),
                    'Content-Type': 'application/json'
                })
            }).subscribe(function () { return resolve(); }, function (err) { return reject(err); });
        });
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __param(2, core_1.Inject("app.config")),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        http_1.Http, Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
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
const http_1 = require('@angular/http');
const auth_service_1 = require('./auth.service');
let UserService = class UserService {
    constructor(_authService, _http, _config) {
        this._authService = _authService;
        this._http = _http;
        this._config = _config;
        this._baseURL = _config.endpoint + '/users';
    }
    emptyUser() {
        return {
            id: '',
            email: '',
            name: '',
            group: "guests",
            tokens: [],
            unit: {}
        };
    }
    /**
     * If `id` is given, a list containing one user is returned.
     * Otherwise, a list of all users is returned.
     * Retrieving all users also means that tokens field is left out.
     */
    get(id) {
        let headers = new http_1.Headers({
            token: this._authService.retrieve_token()
        });
        if (id) {
            return new Promise((resolve, reject) => {
                this._http.get(this._baseURL + '/' + id, {
                    headers: headers
                }).map(res => res.json())
                    .subscribe(user => {
                    resolve([
                        {
                            id: user._id,
                            email: user.email,
                            name: user.name,
                            unit: user.unit,
                            group: user.group,
                            tokens: user.tokens.map(value => {
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
                }, err => reject(err));
            });
        }
        return new Promise((resolve, reject) => {
            this._http.get(this._baseURL, {
                headers: headers
            }).map(res => res.json())
                .subscribe(users => resolve(users.map(user => ({
                id: user._id,
                email: user.email,
                name: user.name,
                unit: user.unit,
                group: user.group,
                tokens: []
            }))), err => reject(err));
        });
    }
    new() {
        return new Promise((resolve, reject) => {
            this._http.post(this._baseURL, "", {
                headers: new http_1.Headers({
                    token: this._authService.retrieve_token(),
                    'Content-Type': 'application/json'
                })
            }).map(res => res.text()).subscribe(id => resolve(id), err => reject(err));
        });
    }
    update(originalUser) {
        let user = Object.assign({}, originalUser);
        let id = user.id;
        let object = user;
        delete object.tokens;
        return new Promise((resolve, reject) => {
            this._http.put(this._baseURL + '/' + id, JSON.stringify(object), {
                headers: new http_1.Headers({
                    token: this._authService.retrieve_token(),
                    'Content-Type': 'application/json'
                })
            }).subscribe(() => resolve(), err => reject(err));
        });
    }
    delete(id) {
        return new Promise((resolve, reject) => {
            this._http.delete(this._baseURL + '/' + id, {
                headers: new http_1.Headers({
                    token: this._authService.retrieve_token(),
                    'Content-Type': 'application/json'
                })
            }).subscribe(() => resolve(), err => reject(err));
        });
    }
};
UserService = __decorate([
    core_1.Injectable(),
    __param(2, core_1.Inject("app.config")), 
    __metadata('design:paramtypes', [auth_service_1.AuthService, http_1.Http, Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
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
const user_1 = require('./../types/user');
const BehaviorSubject_1 = require('rxjs/BehaviorSubject');
let MeService = class MeService {
    constructor(authService, http, config) {
        this.authService = authService;
        this.http = http;
        this.config = config;
        this.endpoint = config.endpoint + '/me';
        this.user = new BehaviorSubject_1.BehaviorSubject(undefined);
        this.isLoading = new BehaviorSubject_1.BehaviorSubject(false);
        this.authService.token.subscribe(token => {
            if (token) {
                this.isLoading.next(true);
                this.http.get(this.endpoint, {
                    headers: new http_1.Headers({ token: token })
                }).map(r => r.json()).subscribe(json => {
                    this.user.next(new user_1.User(json));
                    this.isLoading.next(false);
                }, err => {
                    this.user.error(err);
                    this.isLoading.next(false);
                });
            }
        });
    }
    invalidate_current_token() {
        let t = this.authService.token.getValue();
        let token = this.user.getValue().tokens.find(token => token.token == t);
        if (token) {
            let endpoint = this.endpoint + `/tokens/${token.id}`;
            this.isLoading.next(true);
            return new Promise((resolve, reject) => {
                this.http.delete(endpoint, {
                    headers: new http_1.Headers({ token: t })
                }).subscribe(_ => {
                    this.isLoading.next(false);
                    this.authService.didLogout();
                    resolve();
                }, err => {
                    this.isLoading.next(false);
                    reject(err);
                });
            });
        }
        else {
            return Promise.reject('邏輯錯誤，沒有在目前的 User 中找到 Token 實例。');
        }
    }
    updatePassword(password) {
        // TODO: implement
        return Promise.reject('');
    }
};
MeService = __decorate([
    core_1.Injectable(),
    __param(2, core_1.Inject("app.config")), 
    __metadata('design:paramtypes', [auth_service_1.AuthService, http_1.Http, Object])
], MeService);
exports.MeService = MeService;
//# sourceMappingURL=me.service.js.map
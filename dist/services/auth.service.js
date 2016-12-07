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
const router_1 = require('@angular/router');
const BehaviorSubject_1 = require('rxjs/BehaviorSubject');
let ssoURL = "http://localhost:3000/sso";
let AuthService = class AuthService {
    constructor(http, config, router) {
        this.http = http;
        this.config = config;
        this.router = router;
        this.endpoint = config.endpoint + '/login';
        this.token = new BehaviorSubject_1.BehaviorSubject(localStorage.getItem('token'));
        this.isLoading = new BehaviorSubject_1.BehaviorSubject(false);
    }
    login_sso() {
        let ending = '';
        if (window.location.href.includes('?')) {
            ending = '&sso=true&token=';
        }
        else {
            ending = '?sso=true&token=';
        }
        window.location.href = ssoURL + '?redirectUrl=' + encodeURIComponent(window.location.href + ending);
    }
    authenticate_sso(token) {
        return new Promise((resolve, reject) => {
            let endpoint = this.endpoint + '/sso';
            this.isLoading.next(true);
            this.http.post(endpoint, JSON.stringify({ 'sso_token': token }), {
                headers: new http_1.Headers({ 'Content-Type': 'application/json' })
            }).map(res => res.json()).subscribe((result) => {
                this.isLoading.next(false);
                if (result.success) {
                    this.setToken(result.token);
                    resolve();
                }
                else {
                    reject(result.message);
                }
            }, err => {
                this.isLoading.next(false);
                reject(err);
            });
        });
    }
    login(email, password) {
        return new Promise((resolve, reject) => {
            var endpoint = this.endpoint + '/standalone';
            var headers = new http_1.Headers();
            headers.append('Content-Type', 'application/json');
            this.isLoading.next(true);
            this.http.post(endpoint, JSON.stringify({
                email: email,
                password: password
            }), {
                headers: headers
            })
                .map(res => res.json()).subscribe(result => {
                this.isLoading.next(false);
                if (result.success) {
                    this.setToken(result.token);
                    resolve();
                }
                else {
                    reject(result.message);
                }
            }, err => {
                this.isLoading.next(false);
                reject(err);
            });
        });
    }
    register(name, email, password) {
        var endpoint = this.config.endpoint + '/register';
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return new Promise((resolve, reject) => {
            this.isLoading.next(true);
            this.http.post(endpoint, JSON.stringify({
                name: name,
                email: email,
                password: password
            }), {
                headers: headers
            }).subscribe(_ => {
                this.isLoading.next(false);
                resolve();
            }, err => {
                this.isLoading.next(false);
                reject(err);
            });
        });
    }
    didLogout() {
        this.removeToken();
    }
    setToken(token) {
        localStorage.setItem('token', token);
        this.token.next(token);
    }
    removeToken() {
        localStorage.removeItem('token');
        this.token.next(undefined);
    }
};
AuthService = __decorate([
    core_1.Injectable(),
    __param(1, core_1.Inject("app.config")), 
    __metadata('design:paramtypes', [http_1.Http, Object, router_1.Router])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
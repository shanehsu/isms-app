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
const piece_1 = require('./../types/piece');
const auth_service_1 = require('./auth.service');
let NewsService = class NewsService {
    constructor(_http, _authService, _config) {
        this._http = _http;
        this._authService = _authService;
        this._config = _config;
        this._baseURL = _config.endpoint + '/news';
    }
    placeholder() {
        return new piece_1.Piece({
            _id: '4e7020cb7cac81af7136236b', date: new Date(),
            summary: '新聞簡述', source: '新聞來源', link: 'http://www.google.com/'
        });
    }
    retrieve() {
        return new Promise((resolve, reject) => this._http.get(this._baseURL)
            .map(res => res.json())
            .subscribe((data) => resolve(data.map(p => new piece_1.Piece(p))), err => reject(err)));
    }
    retrievePage(page) {
        let params = new http_1.URLSearchParams();
        params.set('page', page.toString());
        return new Promise((resolve, reject) => this._http.get(this._baseURL, {
            search: params
        }).map(res => res.json())
            .subscribe((data) => resolve(data.map(p => new piece_1.Piece(p))), err => reject(err)));
    }
    retrievePiece(id) {
        return new Promise((resolve, reject) => this._http.get(this._baseURL + '/' + id)
            .map(response => response.json())
            .subscribe(data => resolve(new piece_1.Piece(data)), err => reject(err)));
    }
    create(piece) {
        return new Promise((resolve, reject) => {
            let header = new http_1.Headers({
                token: this._authService.retrieve_token(),
                'Content-Type': 'application/json'
            });
            this._http.post(this._baseURL, '', {
                headers: header
            })
                .map(res => res.text())
                .subscribe(id => {
                resolve(id);
            }, err => reject());
        });
    }
    update(piece) {
        return new Promise((resolve, reject) => {
            let header = new http_1.Headers({
                token: this._authService.retrieve_token(),
                'Content-Type': 'application/json'
            });
            this._http.put(this._baseURL + '/' + piece.id, JSON.stringify({
                date: piece.date,
                link: piece.link,
                source: piece.source,
                summary: piece.summary
            }), {
                headers: header
            }).subscribe(_ => resolve(), err => reject(err));
        });
    }
    delete(id) {
        return new Promise((resolve, reject) => {
            let header = new http_1.Headers({
                token: this._authService.retrieve_token()
            });
            this._http.delete(this._baseURL + '/' + id, {
                headers: header
            }).map(res => res.status)
                .subscribe(_ => resolve(), err => reject());
        });
    }
};
NewsService = __decorate([
    core_1.Injectable(),
    __param(2, core_1.Inject("app.config")), 
    __metadata('design:paramtypes', [http_1.Http, auth_service_1.AuthService, Object])
], NewsService);
exports.NewsService = NewsService;
//# sourceMappingURL=news.service.js.map
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
var NewsService = (function () {
    function NewsService(_http, _authService, _config) {
        this._http = _http;
        this._authService = _authService;
        this._config = _config;
        this._baseURL = _config.endpoint + '/pieces';
    }
    NewsService.prototype.fake = function () {
        return {
            id: '',
            date: new Date(),
            summary: '',
            source: '',
            link: ''
        };
    };
    NewsService.prototype.retrieve = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this._http.get(_this._baseURL)
                .map(function (response) { return response.json(); })
                .subscribe(function (data) {
                var pieces = [];
                for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                    var piece = data_1[_i];
                    pieces.push({
                        id: piece._id,
                        date: new Date(piece.date),
                        summary: piece.summary,
                        source: piece.source,
                        link: piece.link
                    });
                }
                resolve(pieces);
            }, function (err) {
                reject();
                console.error(err);
            });
        });
    };
    NewsService.prototype.retrieveFromDate = function (fromDate) {
        var _this = this;
        var params = new http_1.URLSearchParams();
        params.set('fromDate', fromDate.toISOString());
        return new Promise(function (resolve, reject) {
            return _this._http.get(_this._baseURL, {
                search: params
            }).map(function (response) { return response.json(); })
                .subscribe(function (data) {
                var pieces = [];
                for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                    var piece = data_2[_i];
                    pieces.push({
                        id: piece._id,
                        date: new Date(piece.date),
                        summary: piece.summary,
                        source: piece.source,
                        link: piece.link
                    });
                }
                resolve(pieces);
            }, function (err) {
                reject();
                console.error(err);
            });
        });
    };
    NewsService.prototype.retrievePiece = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this._http.get(_this._baseURL + '/' + id)
                .map(function (response) { return response.json(); })
                .subscribe(function (piece) {
                resolve({
                    id: piece._id,
                    date: new Date(piece.date),
                    summary: piece.summary,
                    source: piece.source,
                    link: piece.link
                });
            }, function (err) {
                reject();
                console.error(err);
            });
        });
    };
    NewsService.prototype.create = function (piece) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var object = {
                date: piece.date.toISOString(),
                summary: piece.summary,
                source: piece.source,
                link: piece.link
            };
            var header = new http_1.Headers({
                token: _this._authService.retrieve_token(),
                'Content-Type': 'application/json'
            });
            _this._http.post(_this._baseURL, JSON.stringify(object), {
                headers: header
            })
                .map(function (res) { return res.text(); })
                .subscribe(function (id) {
                resolve(id);
            }, function (err) { return reject(); });
        });
    };
    NewsService.prototype.update = function (piece) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var header = new http_1.Headers({
                token: _this._authService.retrieve_token(),
                'Content-Type': 'application/json'
            });
            _this._http.put(_this._baseURL + '/' + piece.id, JSON.stringify({
                date: piece.date,
                link: piece.link,
                source: piece.source,
                summary: piece.summary
            }), {
                headers: header
            })
                .subscribe(function (data) {
                resolve();
            }, function (err) { return reject(null); });
        });
    };
    NewsService.prototype.delete = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var header = new http_1.Headers({
                token: _this._authService.retrieve_token()
            });
            _this._http.delete(_this._baseURL + '/' + id, {
                headers: header
            })
                .map(function (res) { return res.status; })
                .subscribe(function (data) {
                if (data == 200) {
                    resolve();
                }
                else {
                    reject();
                }
            }, function (err) { return reject(); });
        });
    };
    return NewsService;
}());
NewsService = __decorate([
    core_1.Injectable(),
    __param(2, core_1.Inject("app.config")),
    __metadata("design:paramtypes", [http_1.Http, auth_service_1.AuthService, Object])
], NewsService);
exports.NewsService = NewsService;
//# sourceMappingURL=news.service.js.map
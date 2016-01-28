System.register(['angular2/core', 'angular2/http', './auth.service'], function(exports_1) {
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
    var core_1, http_1, auth_service_1;
    var NewsService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }],
        execute: function() {
            NewsService = (function () {
                function NewsService(_http, _authService, _config) {
                    this._http = _http;
                    this._authService = _authService;
                    this._config = _config;
                    this._baseURL = _config.endpoint + '/pieces';
                }
                NewsService.prototype.retrieve = function () {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        return _this._http.get(_this._baseURL)
                            .map(function (response) { return response.json(); })
                            .subscribe(function (data) {
                            var pieces = [];
                            for (var _i = 0; _i < data.length; _i++) {
                                var piece = data[_i];
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
                            for (var _i = 0; _i < data.length; _i++) {
                                var piece = data[_i];
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
                            .map(function (res) { return res.json(); })
                            .subscribe(function (data) {
                            var piece;
                            piece.id = data._id;
                            piece.date = new Date(data.date);
                            piece.link = data.link;
                            piece.source = data.source;
                            piece.summary = data.summary;
                            resolve(piece);
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
                            .map(function (res) { return res.json(); })
                            .subscribe(function (data) {
                            var piece;
                            piece.id = data._id;
                            piece.date = new Date(data.date);
                            piece.link = data.link;
                            piece.source = data.source;
                            piece.summary = data.summary;
                            resolve(piece);
                        }, function (err) { return reject(); });
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
                NewsService = __decorate([
                    core_1.Injectable(),
                    __param(2, core_1.Inject("app.config")), 
                    __metadata('design:paramtypes', [http_1.Http, auth_service_1.AuthService, Object])
                ], NewsService);
                return NewsService;
            })();
            exports_1("NewsService", NewsService);
        }
    }
});
//# sourceMappingURL=news.service.js.map
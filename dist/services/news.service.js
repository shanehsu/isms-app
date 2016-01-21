System.register(['angular2/core', 'angular2/http'], function(exports_1) {
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
    var core_1, http_1;
    var NewsService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            NewsService = (function () {
                function NewsService(_http, _config) {
                    this._http = _http;
                    this._config = _config;
                    this._baseURL = _config.endpoint + '/pieces';
                }
                NewsService.prototype.retrieve = function (fromDate) {
                    var _this = this;
                    if (fromDate === void 0) { fromDate = Date(); }
                    return new Promise(function (resolve) {
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
                        }, function (err) { return console.error(err); }, function () { return console.log("HTTP GET Complete."); });
                    });
                };
                NewsService = __decorate([
                    core_1.Injectable(),
                    __param(1, core_1.Inject("app.config")), 
                    __metadata('design:paramtypes', [http_1.Http, Object])
                ], NewsService);
                return NewsService;
            })();
            exports_1("NewsService", NewsService);
        }
    }
});
//# sourceMappingURL=news.service.js.map
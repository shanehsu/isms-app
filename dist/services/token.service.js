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
    var TokenService;
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
            TokenService = (function () {
                function TokenService(_authService, _http, _config) {
                    this._authService = _authService;
                    this._http = _http;
                    this._config = _config;
                    this._baseURL = _config.endpoint + '/tokens';
                }
                TokenService.prototype.invalidate_token = function (tokenId) {
                    var _this = this;
                    if (!this._authService.has_token) {
                        return Promise.reject('no token in local storage');
                    }
                    else {
                        return new Promise(function (resolve, reject) {
                            var endpoint = _this._baseURL + '/' + tokenId;
                            var headers = new http_1.Headers({
                                token: _this._authService.retrieve_token()
                            });
                            _this._http.delete(endpoint, { headers: headers }).subscribe(function (res) { return resolve(); }, function (err) { return reject(); });
                        });
                    }
                };
                TokenService = __decorate([
                    core_1.Injectable(),
                    __param(2, core_1.Inject("app.config")), 
                    __metadata('design:paramtypes', [auth_service_1.AuthService, http_1.Http, Object])
                ], TokenService);
                return TokenService;
            })();
            exports_1("TokenService", TokenService);
        }
    }
});
//# sourceMappingURL=token.service.js.map
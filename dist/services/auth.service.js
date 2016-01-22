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
    var AuthService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            AuthService = (function () {
                function AuthService(_http, _config) {
                    this._http = _http;
                    this._config = _config;
                    this._baseURL = _config.endpoint + '/auth';
                }
                AuthService.prototype.login = function (email) {
                    var _this = this;
                    return new Promise(function (resolve) {
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
                            resolve(true);
                        }, function (err) { return resolve(false); }, function () { return console.log('Authentication Complete'); });
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
                    return new Promise(function (resolve) {
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
                            }, function (err) { return resolve(false); }, function () { return console.log('Authentication Complete'); });
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
                    }
                };
                AuthService = __decorate([
                    core_1.Injectable(),
                    __param(1, core_1.Inject("app.config")), 
                    __metadata('design:paramtypes', [http_1.Http, Object])
                ], AuthService);
                return AuthService;
            })();
            exports_1("AuthService", AuthService);
        }
    }
});
/*
authenticate(data) {
  var username = data.credentials.username;
  var password = data.credentials.password;

  var creds = "username=" + username + "&password=" + password;

  var headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  this.http.post('http://localhost:3001/sessions/create', creds, {
    headers: headers
    })
    .map(res => res.json())
    .subscribe(
      data => this.saveJwt(data.id_token),
      err => this.logError(err),
      () => console.log('Authentication Complete')
    );
}

saveJwt(jwt) {
  if(jwt) {
    localStorage.setItem('id_token', jwt)
  }
}
 */
// TODO: Identity Object and /auth/me 
//# sourceMappingURL=auth.service.js.map
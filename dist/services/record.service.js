System.register(['angular2/core', 'angular2/http', './auth.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
    var RecordService;
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
            RecordService = (function () {
                function RecordService(_http, _authService, _config) {
                    this._http = _http;
                    this._authService = _authService;
                    this._config = _config;
                    this._baseURL = _config.endpoint + '/records';
                }
                // 取得表單完整的 Schema
                RecordService.prototype.schema = function (formID) {
                    var _this = this;
                    var headers = new http_1.Headers({
                        token: this._authService.retrieve_token()
                    });
                    var options = {
                        headers: headers
                    };
                    var URL = this._baseURL + "/" + formID + "/schema";
                    return new Promise(function (resolve, reject) {
                        _this._http.get(URL, options).map(function (res) { return res.json(); })
                            .subscribe(function (forms) {
                            var array = forms;
                            resolve(array.map(function (element) { return element; }));
                        });
                    });
                };
                // 取得表單欄位可以用的空資料
                // 這個方法的 field.metadata 必為物件，不可以是 string！
                RecordService.prototype.emptyRecordForFields = function (schema) {
                    var _this = this;
                    var record = [];
                    record = schema.map(function (field) {
                        var meta = field.metadata;
                        switch (field.type) {
                            case 'shortText':
                                return "";
                            case 'longText':
                                return "";
                            case 'date':
                                return new Date();
                            case 'time':
                                return {
                                    hour: 0,
                                    minute: 0
                                };
                            case 'options':
                                var value = {
                                    selected: meta.options.map(function () { return false; }),
                                    values: meta.options.map(function (option) {
                                        return _this.emptyRecordForFields(option.fields);
                                    })
                                };
                                if (meta.presentation != 'checkbox') {
                                    value.selected[0] = true;
                                }
                                return value;
                            case 'table':
                                return [];
                            default:
                                console.error("處理出現問題");
                                return undefined;
                        }
                    });
                    return record;
                };
                RecordService = __decorate([
                    core_1.Injectable(),
                    __param(2, core_1.Inject("app.config")), 
                    __metadata('design:paramtypes', [http_1.Http, auth_service_1.AuthService, Object])
                ], RecordService);
                return RecordService;
            }());
            exports_1("RecordService", RecordService);
        }
    }
});
//# sourceMappingURL=record.service.js.map
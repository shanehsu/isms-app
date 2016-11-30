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
var RecordService = (function () {
    function RecordService(http, authService, config) {
        this.http = http;
        this.authService = authService;
        this.config = config;
        this.baseURL = config.endpoint + '/records';
    }
    // 取得表單完整的 Schema
    RecordService.prototype.schema = function (formID) {
        var _this = this;
        var headers = new http_1.Headers({
            token: this.authService.retrieve_token()
        });
        var options = {
            headers: headers
        };
        var URL = this.baseURL + "/" + formID + "/schema";
        return new Promise(function (resolve, reject) {
            _this.http.get(URL, options).map(function (res) { return res.json(); })
                .subscribe(function (forms) {
                var array = forms;
                resolve(array.map(function (element) { return element; }));
            }, reject);
        });
    };
    RecordService.prototype.schemaForRevision = function (formID, revisionID) {
        var _this = this;
        var headers = new http_1.Headers({
            token: this.authService.retrieve_token()
        });
        var options = {
            headers: headers
        };
        var URL = this.baseURL + "/" + formID + "/" + revisionID + "/schema";
        return new Promise(function (resolve, reject) {
            _this.http.get(URL, options).map(function (res) { return res.json(); })
                .subscribe(function (forms) {
                var array = forms;
                resolve(array.map(function (element) { return element; }));
            }, reject);
        });
    };
    // 取得表單欄位可以用的空資料
    // 這個方法的 field.metadata 必為物件，不可以是 string！
    RecordService.prototype.emptyRecordForFields = function (schema) {
        var _this = this;
        return schema.map(function (field) {
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
    };
    RecordService.prototype.upload = function (formID, formData) {
        var _this = this;
        var URL = this.baseURL + ("/" + formID);
        return new Promise(function (resolve, reject) {
            var headers = new http_1.Headers({
                token: _this.authService.retrieve_token(),
                'Content-Type': 'application/json'
            });
            var options = {
                headers: headers
            };
            _this.http.post(URL, JSON.stringify({ data: formData }), options)
                .map(function (res) { return res.text(); })
                .subscribe(function (recordID) {
                resolve(recordID);
            }, reject);
        });
    };
    RecordService.prototype.records = function () {
        var _this = this;
        var headers = new http_1.Headers({
            token: this.authService.retrieve_token()
        });
        var options = {
            headers: headers
        };
        var URL = this.baseURL + "?populate=true";
        return new Promise(function (resolve, reject) {
            _this.http.get(URL, options)
                .map(function (res) { return res.json(); })
                .map(function (vanillaObjectArray) {
                return vanillaObjectArray.map(function (element) {
                    element.created = new Date(element.created);
                    return element;
                });
            }).subscribe(function (recordArray) {
                resolve(recordArray);
            }, reject);
        });
    };
    RecordService.prototype.record = function (id) {
        var _this = this;
        var headers = new http_1.Headers({
            token: this.authService.retrieve_token()
        });
        var options = {
            headers: headers
        };
        var URL = this.baseURL + "/" + id;
        return new Promise(function (resolve, reject) {
            _this.http.get(URL, options)
                .map(function (res) { return res.json(); })
                .subscribe(function (recordObject) {
                resolve(recordObject);
            }, reject);
        });
    };
    RecordService.prototype.awaitSignature = function () {
        var _this = this;
        var headers = new http_1.Headers({
            token: this.authService.retrieve_token()
        });
        var options = {
            headers: headers
        };
        var URL = this.baseURL + "/sign";
        return new Promise(function (resolve, reject) {
            _this.http.get(URL, options)
                .map(function (res) { return res.json(); })
                .map(function (vanillaObjectArray) {
                return vanillaObjectArray.map(function (element) {
                    element.created = new Date(element.created);
                    return element;
                });
            }).subscribe(function (recordArray) {
                resolve(recordArray);
            }, reject);
        });
    };
    RecordService.prototype.sign = function (id) {
        var _this = this;
        var headers = new http_1.Headers({
            token: this.authService.retrieve_token()
        });
        var options = {
            headers: headers
        };
        var URL = this.baseURL + "/sign/" + id;
        return new Promise(function (resolve, reject) {
            _this.http.post(URL, '', options)
                .subscribe(function (_) {
                resolve();
            }, reject);
        });
    };
    return RecordService;
}());
RecordService = __decorate([
    core_1.Injectable(),
    __param(2, core_1.Inject("app.config")),
    __metadata("design:paramtypes", [http_1.Http, auth_service_1.AuthService, Object])
], RecordService);
exports.RecordService = RecordService;
//# sourceMappingURL=record.service.js.map
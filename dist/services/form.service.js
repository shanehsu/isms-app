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
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
// 登入服務
var auth_service_1 = require('./auth.service');
var FormService = (function () {
    function FormService(_authService, _config, _http) {
        this._authService = _authService;
        this._config = _config;
        this._http = _http;
        this._baseURL = _config.endpoint + '/forms';
    }
    /**
     * 取得現在登入的使用者，可以填寫的所有表單
     *
     * 只會回傳 id, name, identifier
     * 並不包含表單內容！
     */
    FormService.prototype.forms = function () {
        var _this = this;
        var headers = new http_1.Headers({
            token: this._authService.retrieve_token()
        });
        var options = {
            headers: headers
        };
        var URL = this._baseURL;
        return new Promise(function (resolve, reject) {
            _this._http.get(URL, options).map(function (res) { return res.json(); })
                .subscribe(function (forms) {
                var array = forms;
                resolve(array.map(function (element) { return element; }));
            });
        });
    };
    FormService.prototype.fillableForms = function () {
        var _this = this;
        var headers = new http_1.Headers({
            token: this._authService.retrieve_token()
        });
        var options = {
            headers: headers
        };
        var URL = this._baseURL + '/?type=fillable';
        return new Promise(function (resolve, reject) {
            _this._http.get(URL, options).map(function (res) { return res.json(); })
                .subscribe(function (forms) {
                var array = forms;
                resolve(array.map(function (element) { return element; }));
            });
        });
    };
    /**
     * 取得特定表單內容
     */
    FormService.prototype.form = function (id) {
        var _this = this;
        var headers = new http_1.Headers({
            token: this._authService.retrieve_token()
        });
        var options = {
            headers: headers
        };
        var URL = this._baseURL + '/' + id;
        return new Promise(function (resolve, reject) {
            _this._http.get(URL, options).map(function (res) { return res.json(); })
                .subscribe(function (form) {
                resolve(form);
            });
        });
    };
    /**
     * 建立一個新的表單
     *
     * 回傳表單的 id
     */
    FormService.prototype.new = function () {
        var _this = this;
        var headers = new http_1.Headers({
            token: this._authService.retrieve_token()
        });
        var options = {
            headers: headers,
        };
        var URL = this._baseURL;
        return new Promise(function (resolve, reject) {
            _this._http.post(URL, '', options)
                .map(function (res) { return res.text(); })
                .subscribe(resolve, reject);
        });
    };
    /**
     * 更新一個表單
     */
    FormService.prototype.update = function (form) {
        var _this = this;
        var headers = new http_1.Headers({
            token: this._authService.retrieve_token(),
            'Content-Type': 'application/json'
        });
        var options = {
            headers: headers
        };
        var URL = this._baseURL + '/' + form._id;
        var payloadObject = {
            name: form.name,
            identifier: form.identifier
        };
        var payload = JSON.stringify(payloadObject);
        return new Promise(function (resolve, reject) {
            _this._http.put(URL, payload, options)
                .subscribe(function () { return resolve(); }, reject);
        });
    };
    /**
     * 刪除一個表單
     */
    FormService.prototype.delete = function (id) {
        var _this = this;
        var headers = new http_1.Headers({
            token: this._authService.retrieve_token()
        });
        var options = {
            headers: headers
        };
        var URL = this._baseURL + '/' + id;
        return new Promise(function (resolve, reject) {
            _this._http.delete(URL, options)
                .subscribe(function () { return resolve(); }, reject);
        });
    };
    /**
     * SECTION
     *
     * 表單版本
     */
    /**
     * 取得特定表單版本
     */
    FormService.prototype.revision = function (formID, revisionID) {
        var _this = this;
        var headers = new http_1.Headers({
            token: this._authService.retrieve_token()
        });
        var options = {
            headers: headers
        };
        var URL = this._baseURL + '/revisions/' + formID + '/' + revisionID;
        return new Promise(function (resolve, reject) {
            _this._http.get(URL, options).map(function (res) { return res.json(); })
                .subscribe(function (formRevision) {
                resolve(formRevision);
            });
        });
    };
    /**
     * 新增表單版本
     */
    FormService.prototype.newRevision = function (formID) {
        var _this = this;
        var headers = new http_1.Headers({
            token: this._authService.retrieve_token()
        });
        var options = {
            headers: headers
        };
        var URL = this._baseURL + '/revisions/' + formID;
        return new Promise(function (resolve, reject) {
            _this._http.post(URL, '', options)
                .map(function (res) { return res.text(); })
                .subscribe(resolve, reject);
        });
    };
    /**
     * 更新表單版本
     */
    FormService.prototype.updateRevision = function (formID, revision) {
        var _this = this;
        var headers = new http_1.Headers({
            token: this._authService.retrieve_token(),
            'Content-Type': 'application/json'
        });
        var options = {
            headers: headers
        };
        var URL = this._baseURL + '/revisions/' + formID + '/' + revision._id;
        var payloadObject = {
            revision: revision.revision,
            signatures: revision.signatures,
            officerSignature: revision.officerSignature,
            group: revision.group,
            secrecyLevel: revision.secrecyLevel
        };
        var payload = JSON.stringify(payloadObject);
        return new Promise(function (resolve, reject) {
            _this._http.put(URL, payload, options)
                .subscribe(function () { return resolve(); }, reject);
        });
    };
    /**
     * 發佈版本
     */
    FormService.prototype.publishRevision = function (formID, revision) {
        var _this = this;
        var headers = new http_1.Headers({
            token: this._authService.retrieve_token(),
            'Content-Type': 'application/json'
        });
        var options = {
            headers: headers
        };
        var URL = this._baseURL + '/revisions/' + formID + '/' + revision._id + '/publish';
        var payloadObject = {};
        var payload = JSON.stringify(payloadObject);
        return new Promise(function (resolve, reject) {
            _this._http.put(URL, payload, options)
                .subscribe(function () { return resolve(); }, reject);
        });
    };
    /**
     * 刪除表單版本
     */
    FormService.prototype.deleteRevision = function (formID, revisionID) {
        var _this = this;
        var headers = new http_1.Headers({
            token: this._authService.retrieve_token()
        });
        var options = {
            headers: headers
        };
        var URL = this._baseURL + '/revisions/' + formID + '/' + revisionID;
        return new Promise(function (resolve, reject) {
            _this._http.delete(URL, options)
                .subscribe(function () { return resolve(); }, reject);
        });
    };
    /**
     * SECTION
     *
     * 表單欄位
     */
    /**
     * 取得特定表單欄位
     */
    FormService.prototype.field = function (formID, revisionID, fieldID) {
        var _this = this;
        var headers = new http_1.Headers({
            token: this._authService.retrieve_token()
        });
        var options = {
            headers: headers
        };
        var URL = this._baseURL + '/revisions/fields/' + formID + '/' + revisionID + '/' + fieldID;
        return new Promise(function (resolve, reject) {
            _this._http.get(URL, options).map(function (res) { return res.json(); })
                .subscribe(function (field) {
                resolve({
                    _id: field._id,
                    name: field.name,
                    type: field.type,
                    hint: field.hint,
                    metadata: JSON.parse(field.metadata)
                });
            });
        });
    };
    /**
     * 新增表單欄位
     */
    FormService.prototype.newField = function (formID, revisionID) {
        var _this = this;
        var headers = new http_1.Headers({
            token: this._authService.retrieve_token()
        });
        var options = {
            headers: headers
        };
        var URL = this._baseURL + '/revisions/fields/' + formID + '/' + revisionID;
        return new Promise(function (resolve, reject) {
            _this._http.post(URL, '', options)
                .map(function (res) { return res.text(); })
                .subscribe(resolve, reject);
        });
    };
    /**
     * 更新表單欄位
     */
    FormService.prototype.updateField = function (formID, revisionID, field) {
        var _this = this;
        var headers = new http_1.Headers({
            token: this._authService.retrieve_token(),
            'Content-Type': 'application/json'
        });
        var options = {
            headers: headers
        };
        var URL = this._baseURL + '/revisions/fields/' + formID + '/' + revisionID + '/' + field._id;
        var payloadObject = {
            name: field.name,
            type: field.type,
            hint: field.hint,
            metadata: JSON.stringify(field.metadata)
        };
        var payload = JSON.stringify(payloadObject);
        return new Promise(function (resolve, reject) {
            _this._http.put(URL, payload, options)
                .subscribe(function () { return resolve(); }, reject);
        });
    };
    /**
     * 刪除表單欄位
     */
    FormService.prototype.deleteField = function (formID, revisionID, fieldID) {
        var _this = this;
        var headers = new http_1.Headers({
            token: this._authService.retrieve_token()
        });
        var options = {
            headers: headers
        };
        var URL = this._baseURL + '/revisions/fields/' + formID + '/' + revisionID + '/' + fieldID;
        return new Promise(function (resolve, reject) {
            _this._http.delete(URL, options)
                .subscribe(function () { return resolve(); }, reject);
        });
    };
    FormService = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject("app.config")), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, Object, http_1.Http])
    ], FormService);
    return FormService;
}());
exports.FormService = FormService;
//# sourceMappingURL=form.service.js.map
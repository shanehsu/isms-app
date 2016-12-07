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
// 登入服務
const auth_service_1 = require('./auth.service');
let FormService = class FormService {
    constructor(_authService, _config, _http) {
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
    forms() {
        let headers = new http_1.Headers({
            token: this._authService.retrieve_token()
        });
        let options = {
            headers: headers
        };
        let URL = this._baseURL;
        return new Promise((resolve, reject) => {
            this._http.get(URL, options).map(res => res.json())
                .subscribe(forms => {
                let array = forms;
                resolve(array.map(element => element));
            });
        });
    }
    fillableForms() {
        let headers = new http_1.Headers({
            token: this._authService.retrieve_token()
        });
        let options = {
            headers: headers
        };
        let URL = this._baseURL + '/?type=fillable';
        return new Promise((resolve, reject) => {
            this._http.get(URL, options).map(res => res.json())
                .subscribe(forms => {
                let array = forms;
                resolve(array.map(element => element));
            });
        });
    }
    /**
     * 取得特定表單內容
     */
    form(id) {
        let headers = new http_1.Headers({
            token: this._authService.retrieve_token()
        });
        let options = {
            headers: headers
        };
        let URL = this._baseURL + '/' + id;
        return new Promise((resolve, reject) => {
            this._http.get(URL, options).map(res => res.json())
                .subscribe(form => {
                resolve(form);
            });
        });
    }
    /**
     * 建立一個新的表單
     *
     * 回傳表單的 id
     */
    new() {
        let headers = new http_1.Headers({
            token: this._authService.retrieve_token()
        });
        let options = {
            headers: headers,
        };
        let URL = this._baseURL;
        return new Promise((resolve, reject) => {
            this._http.post(URL, '', options)
                .map(res => res.text())
                .subscribe(resolve, reject);
        });
    }
    /**
     * 更新一個表單
     */
    update(form) {
        let headers = new http_1.Headers({
            token: this._authService.retrieve_token(),
            'Content-Type': 'application/json'
        });
        let options = {
            headers: headers
        };
        let URL = this._baseURL + '/' + form._id;
        let payloadObject = {
            name: form.name,
            identifier: form.identifier
        };
        let payload = JSON.stringify(payloadObject);
        return new Promise((resolve, reject) => {
            this._http.put(URL, payload, options)
                .subscribe(() => resolve(), reject);
        });
    }
    /**
     * 刪除一個表單
     */
    delete(id) {
        let headers = new http_1.Headers({
            token: this._authService.retrieve_token()
        });
        let options = {
            headers: headers
        };
        let URL = this._baseURL + '/' + id;
        return new Promise((resolve, reject) => {
            this._http.delete(URL, options)
                .subscribe(() => resolve(), reject);
        });
    }
    /**
     * SECTION
     *
     * 表單版本
     */
    /**
     * 取得特定表單版本
     */
    revision(formID, revisionID) {
        let headers = new http_1.Headers({
            token: this._authService.retrieve_token()
        });
        let options = {
            headers: headers
        };
        let URL = this._baseURL + '/revisions/' + formID + '/' + revisionID;
        return new Promise((resolve, reject) => {
            this._http.get(URL, options).map(res => res.json())
                .subscribe(formRevision => {
                resolve(formRevision);
            });
        });
    }
    /**
     * 新增表單版本
     */
    newRevision(formID) {
        let headers = new http_1.Headers({
            token: this._authService.retrieve_token()
        });
        let options = {
            headers: headers
        };
        let URL = this._baseURL + '/revisions/' + formID;
        return new Promise((resolve, reject) => {
            this._http.post(URL, '', options)
                .map(res => res.text())
                .subscribe(resolve, reject);
        });
    }
    /**
     * 更新表單版本
     */
    updateRevision(formID, revision) {
        let headers = new http_1.Headers({
            token: this._authService.retrieve_token(),
            'Content-Type': 'application/json'
        });
        let options = {
            headers: headers
        };
        let URL = this._baseURL + '/revisions/' + formID + '/' + revision._id;
        let payloadObject = {
            revision: revision.revision,
            signatures: revision.signatures,
            officerSignature: revision.officerSignature,
            group: revision.group,
            secrecyLevel: revision.secrecyLevel
        };
        let payload = JSON.stringify(payloadObject);
        return new Promise((resolve, reject) => {
            this._http.put(URL, payload, options)
                .subscribe(() => resolve(), reject);
        });
    }
    /**
     * 發佈版本
     */
    publishRevision(formID, revision) {
        let headers = new http_1.Headers({
            token: this._authService.retrieve_token(),
            'Content-Type': 'application/json'
        });
        let options = {
            headers: headers
        };
        let URL = this._baseURL + '/revisions/' + formID + '/' + revision._id + '/publish';
        let payloadObject = {};
        let payload = JSON.stringify(payloadObject);
        return new Promise((resolve, reject) => {
            this._http.put(URL, payload, options)
                .subscribe(() => resolve(), reject);
        });
    }
    /**
     * 刪除表單版本
     */
    deleteRevision(formID, revisionID) {
        let headers = new http_1.Headers({
            token: this._authService.retrieve_token()
        });
        let options = {
            headers: headers
        };
        let URL = this._baseURL + '/revisions/' + formID + '/' + revisionID;
        return new Promise((resolve, reject) => {
            this._http.delete(URL, options)
                .subscribe(() => resolve(), reject);
        });
    }
    /**
     * SECTION
     *
     * 表單欄位
     */
    /**
     * 取得特定表單欄位
     */
    field(formID, revisionID, fieldID) {
        let headers = new http_1.Headers({
            token: this._authService.retrieve_token()
        });
        let options = {
            headers: headers
        };
        let URL = this._baseURL + '/revisions/fields/' + formID + '/' + revisionID + '/' + fieldID;
        return new Promise((resolve, reject) => {
            this._http.get(URL, options).map(res => res.json())
                .subscribe(field => {
                resolve({
                    _id: field._id,
                    name: field.name,
                    type: field.type,
                    hint: field.hint,
                    metadata: JSON.parse(field.metadata)
                });
            });
        });
    }
    /**
     * 新增表單欄位
     */
    newField(formID, revisionID) {
        let headers = new http_1.Headers({
            token: this._authService.retrieve_token()
        });
        let options = {
            headers: headers
        };
        let URL = this._baseURL + '/revisions/fields/' + formID + '/' + revisionID;
        return new Promise((resolve, reject) => {
            this._http.post(URL, '', options)
                .map(res => res.text())
                .subscribe(resolve, reject);
        });
    }
    /**
     * 更新表單欄位
     */
    updateField(formID, revisionID, field) {
        let headers = new http_1.Headers({
            token: this._authService.retrieve_token(),
            'Content-Type': 'application/json'
        });
        let options = {
            headers: headers
        };
        let URL = this._baseURL + '/revisions/fields/' + formID + '/' + revisionID + '/' + field._id;
        let payloadObject = {
            name: field.name,
            type: field.type,
            hint: field.hint,
            metadata: JSON.stringify(field.metadata)
        };
        let payload = JSON.stringify(payloadObject);
        return new Promise((resolve, reject) => {
            this._http.put(URL, payload, options)
                .subscribe(() => resolve(), reject);
        });
    }
    /**
     * 刪除表單欄位
     */
    deleteField(formID, revisionID, fieldID) {
        let headers = new http_1.Headers({
            token: this._authService.retrieve_token()
        });
        let options = {
            headers: headers
        };
        let URL = this._baseURL + '/revisions/fields/' + formID + '/' + revisionID + '/' + fieldID;
        return new Promise((resolve, reject) => {
            this._http.delete(URL, options)
                .subscribe(() => resolve(), reject);
        });
    }
};
FormService = __decorate([
    core_1.Injectable(),
    __param(1, core_1.Inject("app.config")), 
    __metadata('design:paramtypes', [auth_service_1.AuthService, Object, http_1.Http])
], FormService);
exports.FormService = FormService;
//# sourceMappingURL=form.service.js.map
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
const auth_service_1 = require('./auth.service');
let RecordService = class RecordService {
    constructor(http, authService, config) {
        this.http = http;
        this.authService = authService;
        this.config = config;
        this.baseURL = config.endpoint + '/records';
    }
    // 取得表單完整的 Schema
    schema(formID) {
        let headers = new http_1.Headers({
            token: this.authService.retrieve_token()
        });
        let options = {
            headers: headers
        };
        let URL = this.baseURL + "/" + formID + "/schema";
        return new Promise((resolve, reject) => {
            this.http.get(URL, options).map(res => res.json())
                .subscribe(forms => {
                let array = forms;
                resolve(array.map(element => element));
            }, reject);
        });
    }
    schemaForRevision(formID, revisionID) {
        let headers = new http_1.Headers({
            token: this.authService.retrieve_token()
        });
        let options = {
            headers: headers
        };
        let URL = this.baseURL + "/" + formID + "/" + revisionID + "/schema";
        return new Promise((resolve, reject) => {
            this.http.get(URL, options).map(res => res.json())
                .subscribe(forms => {
                let array = forms;
                resolve(array.map(element => element));
            }, reject);
        });
    }
    // 取得表單欄位可以用的空資料
    // 這個方法的 field.metadata 必為物件，不可以是 string！
    emptyRecordForFields(schema) {
        return schema.map(field => {
            let meta = field.metadata;
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
                    let value = {
                        selected: meta.options.map(() => { return false; }),
                        values: meta.options.map(option => {
                            return this.emptyRecordForFields(option.fields);
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
    }
    upload(formID, formData) {
        let URL = this.baseURL + `/${formID}`;
        return new Promise((resolve, reject) => {
            let headers = new http_1.Headers({
                token: this.authService.retrieve_token(),
                'Content-Type': 'application/json'
            });
            let options = {
                headers: headers
            };
            this.http.post(URL, JSON.stringify({ data: formData }), options)
                .map(res => res.text())
                .subscribe(recordID => {
                resolve(recordID);
            }, reject);
        });
    }
    records() {
        let headers = new http_1.Headers({
            token: this.authService.retrieve_token()
        });
        let options = {
            headers: headers
        };
        let URL = this.baseURL + "?populate=true";
        return new Promise((resolve, reject) => {
            this.http.get(URL, options)
                .map(res => res.json())
                .map(vanillaObjectArray => vanillaObjectArray.map(element => {
                element.created = new Date(element.created);
                return element;
            })).subscribe(recordArray => {
                resolve(recordArray);
            }, reject);
        });
    }
    record(id) {
        let headers = new http_1.Headers({
            token: this.authService.retrieve_token()
        });
        let options = {
            headers: headers
        };
        let URL = `${this.baseURL}/${id}`;
        return new Promise((resolve, reject) => {
            this.http.get(URL, options)
                .map(res => res.json())
                .subscribe(recordObject => {
                resolve(recordObject);
            }, reject);
        });
    }
    awaitSignature() {
        let headers = new http_1.Headers({
            token: this.authService.retrieve_token()
        });
        let options = {
            headers: headers
        };
        let URL = this.baseURL + "/sign";
        return new Promise((resolve, reject) => {
            this.http.get(URL, options)
                .map(res => res.json())
                .map(vanillaObjectArray => vanillaObjectArray.map(element => {
                element.created = new Date(element.created);
                return element;
            })).subscribe(recordArray => {
                resolve(recordArray);
            }, reject);
        });
    }
    sign(id) {
        let headers = new http_1.Headers({
            token: this.authService.retrieve_token()
        });
        let options = {
            headers: headers
        };
        let URL = this.baseURL + "/sign/" + id;
        return new Promise((resolve, reject) => {
            this.http.post(URL, '', options)
                .subscribe(_ => {
                resolve();
            }, reject);
        });
    }
};
RecordService = __decorate([
    core_1.Injectable(),
    __param(2, core_1.Inject("app.config")), 
    __metadata('design:paramtypes', [http_1.Http, auth_service_1.AuthService, Object])
], RecordService);
exports.RecordService = RecordService;
//# sourceMappingURL=record.service.js.map
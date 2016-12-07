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
let UnitService = class UnitService {
    constructor(_authService, _http, _config) {
        this._authService = _authService;
        this._http = _http;
        this._config = _config;
        this._baseURL = _config.endpoint + '/units';
    }
    /**
     * Returns a placeholder Unit that is empty.
     */
    empty() {
        return {
            id: '',
            name: '',
            identifier: 0,
            parentUnit: '',
            childUnits: [],
            manager: '',
            docsControl: '',
            agents: []
        };
    }
    /**
     * Intended from private use only, maps a returned JSON object to Unit object.
     */
    __util__map__(object) {
        return {
            id: object._id,
            name: object.name,
            identifier: object.identifier,
            parentUnit: object.parentUnit,
            childUnits: object.childUnits,
            manager: object.manager,
            docsControl: object.docsControl,
            agents: object.agents
        };
    }
    /**
     * Lists all units.
     *
     * Returns a Promise of an array of Unit.
     */
    units() {
        let headers = new http_1.Headers({
            token: this._authService.retrieve_token()
        });
        let options = {
            headers: headers
        };
        let URL = this._baseURL;
        return new Promise((resolve, reject) => {
            this._http.get(URL, options)
                .map(res => res.json())
                .subscribe(units => {
                let anyArray = units;
                let unitArray = anyArray.map(this.__util__map__);
                resolve(unitArray);
            }, reject);
        });
    }
    /**
     * Get a Unit.
     *
     * Returns a Promise of a Unit.
     */
    unit(id) {
        let headers = new http_1.Headers({
            token: this._authService.retrieve_token()
        });
        let options = {
            headers: headers
        };
        let URL = this._baseURL + '/' + id;
        return new Promise((resolve, reject) => {
            this._http.get(URL, options)
                .map(res => res.json())
                .subscribe(units => {
                let anyObject = units;
                let unitObject = this.__util__map__(anyObject);
                resolve(unitObject);
            }, reject);
        });
    }
    /**
     * Creates a Unit.
     *
     * Returns a Promise of a string, id of the newly created Unit.
     */
    new() {
        let headers = new http_1.Headers({
            token: this._authService.retrieve_token(),
            'Content-Type': 'application/json'
        });
        let options = {
            headers: headers,
        };
        let URL = this._baseURL;
        let payloadObject = {
            name: '',
            identifier: 0
        };
        let payload = JSON.stringify(payloadObject);
        return new Promise((resolve, reject) => {
            this._http.post(URL, payload, options)
                .map(res => { console.dir(res); return res.text(); })
                .subscribe(resolve, reject);
        });
    }
    /**
     * Updates a Unit.
     *
     * Only the name, and identifier information can be updated through this method.
     *
     * Returns a Promise.
     */
    update(unit) {
        let headers = new http_1.Headers({
            token: this._authService.retrieve_token(),
            'Content-Type': 'application/json'
        });
        let options = {
            headers: headers
        };
        let URL = this._baseURL + '/' + unit.id;
        let payloadObject = {
            name: unit.name,
            // identifier should really be an integer in parsing,
            // but the backend mongoose really handle the verification.
            identifier: unit.identifier
        };
        let payload = JSON.stringify(payloadObject);
        return new Promise((resolve, reject) => {
            this._http.put(URL, payload, options)
                .subscribe(() => resolve(), reject);
        });
    }
    /**
     * Deletes a Unit.
     *
     * Returns a Promise.
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
     * Returns a list of users without unit.
     */
    freeUsers() {
        let headers = new http_1.Headers({
            token: this._authService.retrieve_token()
        });
        let options = {
            headers: headers
        };
        let URL = this._baseURL + '/freeUsers';
        return new Promise((resolve, reject) => {
            this._http.get(URL, options)
                .map(res => res.json())
                .subscribe(resolve, reject);
        });
    }
    /**
     * Returns a list of users belonging to the given unit.
     */
    usersInUnit(id) {
        let headers = new http_1.Headers({
            token: this._authService.retrieve_token()
        });
        let options = {
            headers: headers
        };
        let URL = this._baseURL + '/usersInUnit/' + id;
        return new Promise((resolve, reject) => {
            this._http.get(URL, options)
                .map(res => res.json())
                .subscribe(resolve, reject);
        });
    }
    /**
     * Relate the user to the given unit.
     */
    relateUser(unitID, userID) {
        let headers = new http_1.Headers({
            token: this._authService.retrieve_token(),
            'Content-Type': 'application/json'
        });
        let options = {
            headers: headers
        };
        let URL = this._baseURL + '/relateUser/';
        let payloadObject = {
            user: userID,
            unit: unitID
        };
        let payloadString = JSON.stringify(payloadObject);
        return new Promise((resolve, reject) => {
            this._http.put(URL, payloadString, options)
                .subscribe(() => resolve(), reject);
        });
    }
    /**
     * Remove the user from the given unit.
     */
    removeUser(unitID, userID) {
        let headers = new http_1.Headers({
            token: this._authService.retrieve_token(),
            'Content-Type': 'application/json'
        });
        let options = {
            headers: headers
        };
        let URL = this._baseURL + '/removeUser/';
        let payloadObject = {
            user: userID,
            unit: unitID
        };
        let payloadString = JSON.stringify(payloadObject);
        return new Promise((resolve, reject) => {
            this._http.put(URL, payloadString, options)
                .subscribe(() => resolve(), reject);
        });
    }
    /**
     * Assign the given role of the given unit to the given user.
     */
    assignRole(unitID, userID, role) {
        let headers = new http_1.Headers({
            token: this._authService.retrieve_token(),
            'Content-Type': 'application/json'
        });
        let options = {
            headers: headers
        };
        let URL = this._baseURL + '/assignRole/';
        let payloadObject = {
            user: userID,
            unit: unitID,
            role: role
        };
        let payloadString = JSON.stringify(payloadObject);
        return new Promise((resolve, reject) => {
            this._http.put(URL, payloadString, options)
                .subscribe(() => resolve(), reject);
        });
    }
    /**
     * Deassign the given role of the given unit to the given user.
     */
    deassignRole(unitID, userID, role) {
        let headers = new http_1.Headers({
            token: this._authService.retrieve_token(),
            'Content-Type': 'application/json'
        });
        let options = {
            headers: headers
        };
        let URL = this._baseURL + '/deassignRole/';
        let payloadObject = {
            user: userID,
            unit: unitID,
            role: role
        };
        let payloadString = JSON.stringify(payloadObject);
        return new Promise((resolve, reject) => {
            this._http.put(URL, payloadString, options)
                .subscribe(() => resolve(), reject);
        });
    }
    /**
     * Returns a list of IDs of Units without parent unit.
     */
    freeUnits(id) {
        let headers = new http_1.Headers({
            token: this._authService.retrieve_token()
        });
        let options = {
            headers: headers
        };
        let URL = this._baseURL + '/freeUnits';
        return new Promise((resolve, reject) => {
            this._http.get(URL, options)
                .map(res => res.json())
                .subscribe(ids => {
                let data = ids.filter(x => x != id);
                resolve(data);
            }, reject);
        });
    }
    /**
     * Relate the user to the given unit.
     */
    relateParent(parentID, childID) {
        let headers = new http_1.Headers({
            token: this._authService.retrieve_token(),
            'Content-Type': 'application/json'
        });
        let options = {
            headers: headers
        };
        let URL = this._baseURL + '/relateParent/';
        let payloadObject = {
            parent: parentID,
            child: childID
        };
        let payloadString = JSON.stringify(payloadObject);
        return new Promise((resolve, reject) => {
            this._http.put(URL, payloadString, options)
                .subscribe(() => resolve(), reject);
        });
    }
    /**
     * Remove the user from the given unit.
     */
    removeParent(parentID, childID) {
        let headers = new http_1.Headers({
            token: this._authService.retrieve_token(),
            'Content-Type': 'application/json'
        });
        let options = {
            headers: headers
        };
        let URL = this._baseURL + '/removeParent/';
        let payloadObject = {
            parent: parentID,
            child: childID
        };
        let payloadString = JSON.stringify(payloadObject);
        return new Promise((resolve, reject) => {
            this._http.put(URL, payloadString, options)
                .subscribe(() => resolve(), reject);
        });
    }
};
UnitService = __decorate([
    core_1.Injectable(),
    __param(2, core_1.Inject("app.config")), 
    __metadata('design:paramtypes', [auth_service_1.AuthService, http_1.Http, Object])
], UnitService);
exports.UnitService = UnitService;
//# sourceMappingURL=unit.service.js.map
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
var auth_service_1 = require('./auth.service');
var UnitService = (function () {
    function UnitService(_authService, _http, _config) {
        this._authService = _authService;
        this._http = _http;
        this._config = _config;
        this._baseURL = _config.endpoint + '/units';
    }
    /**
     * Returns a placeholder Unit that is empty.
     */
    UnitService.prototype.empty = function () {
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
    };
    /**
     * Intended from private use only, maps a returned JSON object to Unit object.
     */
    UnitService.prototype.__util__map__ = function (object) {
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
    };
    /**
     * Lists all units.
     *
     * Returns a Promise of an array of Unit.
     */
    UnitService.prototype.units = function () {
        var _this = this;
        var headers = new http_1.Headers({
            token: this._authService.retrieve_token()
        });
        var options = {
            headers: headers
        };
        var URL = this._baseURL;
        return new Promise(function (resolve, reject) {
            _this._http.get(URL, options)
                .map(function (res) { return res.json(); })
                .subscribe(function (units) {
                var anyArray = units;
                var unitArray = anyArray.map(_this.__util__map__);
                resolve(unitArray);
            }, reject);
        });
    };
    /**
     * Get a Unit.
     *
     * Returns a Promise of a Unit.
     */
    UnitService.prototype.unit = function (id) {
        var _this = this;
        var headers = new http_1.Headers({
            token: this._authService.retrieve_token()
        });
        var options = {
            headers: headers
        };
        var URL = this._baseURL + '/' + id;
        return new Promise(function (resolve, reject) {
            _this._http.get(URL, options)
                .map(function (res) { return res.json(); })
                .subscribe(function (units) {
                var anyObject = units;
                var unitObject = _this.__util__map__(anyObject);
                resolve(unitObject);
            }, reject);
        });
    };
    /**
     * Creates a Unit.
     *
     * Returns a Promise of a string, id of the newly created Unit.
     */
    UnitService.prototype.new = function () {
        var _this = this;
        var headers = new http_1.Headers({
            token: this._authService.retrieve_token(),
            'Content-Type': 'application/json'
        });
        var options = {
            headers: headers,
        };
        var URL = this._baseURL;
        var payloadObject = {
            name: '',
            identifier: 0
        };
        var payload = JSON.stringify(payloadObject);
        return new Promise(function (resolve, reject) {
            _this._http.post(URL, payload, options)
                .map(function (res) { console.dir(res); return res.text(); })
                .subscribe(resolve, reject);
        });
    };
    /**
     * Updates a Unit.
     *
     * Only the name, and identifier information can be updated through this method.
     *
     * Returns a Promise.
     */
    UnitService.prototype.update = function (unit) {
        var _this = this;
        var headers = new http_1.Headers({
            token: this._authService.retrieve_token(),
            'Content-Type': 'application/json'
        });
        var options = {
            headers: headers
        };
        var URL = this._baseURL + '/' + unit.id;
        var payloadObject = {
            name: unit.name,
            // identifier should really be an integer in parsing,
            // but the backend mongoose really handle the verification.
            identifier: unit.identifier
        };
        var payload = JSON.stringify(payloadObject);
        return new Promise(function (resolve, reject) {
            _this._http.put(URL, payload, options)
                .subscribe(function () { return resolve(); }, reject);
        });
    };
    /**
     * Deletes a Unit.
     *
     * Returns a Promise.
     */
    UnitService.prototype.delete = function (id) {
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
     * Returns a list of users without unit.
     */
    UnitService.prototype.freeUsers = function () {
        var _this = this;
        var headers = new http_1.Headers({
            token: this._authService.retrieve_token()
        });
        var options = {
            headers: headers
        };
        var URL = this._baseURL + '/freeUsers';
        return new Promise(function (resolve, reject) {
            _this._http.get(URL, options)
                .map(function (res) { return res.json(); })
                .subscribe(resolve, reject);
        });
    };
    /**
     * Returns a list of users belonging to the given unit.
     */
    UnitService.prototype.usersInUnit = function (id) {
        var _this = this;
        var headers = new http_1.Headers({
            token: this._authService.retrieve_token()
        });
        var options = {
            headers: headers
        };
        var URL = this._baseURL + '/usersInUnit/' + id;
        return new Promise(function (resolve, reject) {
            _this._http.get(URL, options)
                .map(function (res) { return res.json(); })
                .subscribe(resolve, reject);
        });
    };
    /**
     * Relate the user to the given unit.
     */
    UnitService.prototype.relateUser = function (unitID, userID) {
        var _this = this;
        var headers = new http_1.Headers({
            token: this._authService.retrieve_token(),
            'Content-Type': 'application/json'
        });
        var options = {
            headers: headers
        };
        var URL = this._baseURL + '/relateUser/';
        var payloadObject = {
            user: userID,
            unit: unitID
        };
        var payloadString = JSON.stringify(payloadObject);
        return new Promise(function (resolve, reject) {
            _this._http.put(URL, payloadString, options)
                .subscribe(function () { return resolve(); }, reject);
        });
    };
    /**
     * Remove the user from the given unit.
     */
    UnitService.prototype.removeUser = function (unitID, userID) {
        var _this = this;
        var headers = new http_1.Headers({
            token: this._authService.retrieve_token(),
            'Content-Type': 'application/json'
        });
        var options = {
            headers: headers
        };
        var URL = this._baseURL + '/removeUser/';
        var payloadObject = {
            user: userID,
            unit: unitID
        };
        var payloadString = JSON.stringify(payloadObject);
        return new Promise(function (resolve, reject) {
            _this._http.put(URL, payloadString, options)
                .subscribe(function () { return resolve(); }, reject);
        });
    };
    /**
     * Assign the given role of the given unit to the given user.
     */
    UnitService.prototype.assignRole = function (unitID, userID, role) {
        var _this = this;
        var headers = new http_1.Headers({
            token: this._authService.retrieve_token(),
            'Content-Type': 'application/json'
        });
        var options = {
            headers: headers
        };
        var URL = this._baseURL + '/assignRole/';
        var payloadObject = {
            user: userID,
            unit: unitID,
            role: role
        };
        var payloadString = JSON.stringify(payloadObject);
        return new Promise(function (resolve, reject) {
            _this._http.put(URL, payloadString, options)
                .subscribe(function () { return resolve(); }, reject);
        });
    };
    /**
     * Deassign the given role of the given unit to the given user.
     */
    UnitService.prototype.deassignRole = function (unitID, userID, role) {
        var _this = this;
        var headers = new http_1.Headers({
            token: this._authService.retrieve_token(),
            'Content-Type': 'application/json'
        });
        var options = {
            headers: headers
        };
        var URL = this._baseURL + '/deassignRole/';
        var payloadObject = {
            user: userID,
            unit: unitID,
            role: role
        };
        var payloadString = JSON.stringify(payloadObject);
        return new Promise(function (resolve, reject) {
            _this._http.put(URL, payloadString, options)
                .subscribe(function () { return resolve(); }, reject);
        });
    };
    /**
     * Returns a list of IDs of Units without parent unit.
     */
    UnitService.prototype.freeUnits = function (id) {
        var _this = this;
        var headers = new http_1.Headers({
            token: this._authService.retrieve_token()
        });
        var options = {
            headers: headers
        };
        var URL = this._baseURL + '/freeUnits';
        return new Promise(function (resolve, reject) {
            _this._http.get(URL, options)
                .map(function (res) { return res.json(); })
                .subscribe(function (ids) {
                var data = ids.filter(function (x) { return x != id; });
                resolve(data);
            }, reject);
        });
    };
    /**
     * Relate the user to the given unit.
     */
    UnitService.prototype.relateParent = function (parentID, childID) {
        var _this = this;
        var headers = new http_1.Headers({
            token: this._authService.retrieve_token(),
            'Content-Type': 'application/json'
        });
        var options = {
            headers: headers
        };
        var URL = this._baseURL + '/relateParent/';
        var payloadObject = {
            parent: parentID,
            child: childID
        };
        var payloadString = JSON.stringify(payloadObject);
        return new Promise(function (resolve, reject) {
            _this._http.put(URL, payloadString, options)
                .subscribe(function () { return resolve(); }, reject);
        });
    };
    /**
     * Remove the user from the given unit.
     */
    UnitService.prototype.removeParent = function (parentID, childID) {
        var _this = this;
        var headers = new http_1.Headers({
            token: this._authService.retrieve_token(),
            'Content-Type': 'application/json'
        });
        var options = {
            headers: headers
        };
        var URL = this._baseURL + '/removeParent/';
        var payloadObject = {
            parent: parentID,
            child: childID
        };
        var payloadString = JSON.stringify(payloadObject);
        return new Promise(function (resolve, reject) {
            _this._http.put(URL, payloadString, options)
                .subscribe(function () { return resolve(); }, reject);
        });
    };
    UnitService = __decorate([
        core_1.Injectable(),
        __param(2, core_1.Inject("app.config")), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, http_1.Http, Object])
    ], UnitService);
    return UnitService;
}());
exports.UnitService = UnitService;
//# sourceMappingURL=unit.service.js.map
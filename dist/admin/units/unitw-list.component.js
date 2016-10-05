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
// Angular 2
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
// Services
var unit_service_1 = require("./../../../services/unit.service");
var user_service_1 = require("./../../../services/user.service");
// Pipes
var unit_name_pipe_1 = require("./../../../pipes/unit-name.pipe");
var user_name_pipe_1 = require("./../../../pipes/user-name.pipe");
var UnitListComponent = (function () {
    function UnitListComponent(_router, _unitService) {
        this._router = _router;
        this._unitService = _unitService;
        this._units = [];
    }
    UnitListComponent.prototype.ngOnInit = function () {
        var _this = this;
        // 取得所有單位
        this._unitService.units()
            .then(function (units) { return _this._units = units; })
            .catch(console.error);
    };
    UnitListComponent.prototype.new = function () {
        var _this = this;
        this._unitService.new()
            .then(function (newUnitID) { return _this._router.navigate(["admin", "unit", newUnitID]); })
            .catch(console.error);
    };
    UnitListComponent.prototype.edit = function (unitID) {
        this._router.navigate(["admin", "unit", unitID]);
    };
    UnitListComponent.prototype.delete = function (unitID) {
        var _this = this;
        this._unitService.delete(unitID)
            .then(function () { return _this._unitService.units()
            .then(function (units) { return _this._units = units; })
            .catch(console.error); })
            .catch(console.error);
    };
    return UnitListComponent;
}());
UnitListComponent = __decorate([
    core_1.Component({
        selector: 'unit-list',
        template: "\n  <div class=\"ui one column grid\">\n    <form class=\"ui form right aligned column\">\n      <button type=\"button\" class=\"ui right floated blue labeled icon button\" (click)=\"new()\">\n        <i class=\"plus icon\"></i>\n        \u65B0\u589E\u55AE\u4F4D\n      </button>\n    </form>\n  </div>\n\n  <table class=\"ui unstackable striped table\">\n    <thead>\n      <tr>\n        <th>\u55AE\u4F4D</th>\n        <th class=\"on tablet on small screen on large screen\">\u7DE8\u865F</th>\n        <th class=\"on tablet on small screen on large screen\">\u6BCD\u55AE\u4F4D</th>\n        <th class=\"on large screen\">\u5B50\u55AE\u4F4D</th>\n        <th class=\"on tablet on small screen on large screen\">\u4E3B\u7BA1</th>\n        <th class=\"on small screen on large screen\">\u6587\u7BA1</th>\n        <th class=\"on large screen\">\u627F\u8FA6\u4EBA</th>\n        <th style=\"width: 12em;\">\u52D5\u4F5C</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr *ngFor=\"let unit of _units\">\n        <td>{{unit.name}}</td>\n        <td class=\"on tablet on small screen on large screen\">{{unit.identifier}}</td>\n        <td class=\"on tablet on small screen on large screen\">{{unit.parentUnit | unitName:'silent'}}</td>\n        <td class=\"on large screen\">\n          <p *ngFor=\"let childUnit of unit.childUnits\">{{childUnit | unitName:'silent'}}</p>\n        </td>\n        <td class=\"on tablet on small screen on large screen\">{{unit.manager | userName}}</td>\n        <td class=\"on small screen on large screen\">{{unit.docsControl | userName}}</td>\n        <td class=\"on large screen\">\n          <p *ngFor=\"let agent of unit.agents\">{{agent | userName}}</p>\n        </td>\n        <td style=\"text-align: center;\">\n          <div class=\"small ui buttons\">\n            <button type=\"button\" class=\"ui basic teal button\" (click)=\"edit(unit.id)\">\u7DE8\u8F2F</button>\n            <button type=\"button\" class=\"ui basic red button\" (click)=\"delete(unit.id)\">\u522A\u9664</button>\n          </div>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n  ",
        providers: [unit_service_1.UnitService, user_service_1.UserService],
        pipes: [unit_name_pipe_1.UnitNamePipe, user_name_pipe_1.UserNamePipe]
    }),
    __metadata("design:paramtypes", [router_1.Router, typeof (_a = typeof unit_service_1.UnitService !== "undefined" && unit_service_1.UnitService) === "function" && _a || Object])
], UnitListComponent);
exports.UnitListComponent = UnitListComponent;
var _a;
//# sourceMappingURL=unitw-list.component.js.map
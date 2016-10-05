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
        templateUrl: '/app/admin/unit-admin/unit-list/unit-list.template.html',
        providers: [unit_service_1.UnitService, user_service_1.UserService],
        pipes: [unit_name_pipe_1.UnitNamePipe, user_name_pipe_1.UserNamePipe]
    }),
    __metadata("design:paramtypes", [router_1.Router, unit_service_1.UnitService])
], UnitListComponent);
exports.UnitListComponent = UnitListComponent;
//# sourceMappingURL=unit-list.component.js.map
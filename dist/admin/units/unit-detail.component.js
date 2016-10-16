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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
// Services
var unit_service_1 = require('./../../services/unit.service');
var UnitDetailComponent = (function () {
    function UnitDetailComponent(router, route, unitService) {
        this.router = router;
        this.route = route;
        this.unitService = unitService;
    }
    UnitDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Get a placeholder Unit to get around the undefined key bug.
        this._unit = this.unitService.empty();
        this._unitUserIDs = [];
        this._freeUserIDs = [];
        this._freeUnitIDs = [];
        this._unitID = this.route.snapshot.params['id'];
        // Get the Unit from UnitService
        this.unitService.unit(this._unitID)
            .then(function (unit) { return _this._unit = unit; })
            .catch(console.error);
        this.unitService.usersInUnit(this._unitID)
            .then(function (userIDs) { return _this._unitUserIDs = userIDs; })
            .catch(console.error);
        this.unitService.freeUsers()
            .then(function (userIDs) { return _this._freeUserIDs = userIDs; })
            .catch(console.error);
        this.unitService.freeUnits(this._unitID)
            .then(function (unitIDs) { return _this._freeUnitIDs = unitIDs; })
            .catch(console.error);
    };
    UnitDetailComponent.prototype.ngAfterViewInit = function () {
        $('#update_button').popup({
            inline: true
        });
    };
    UnitDetailComponent.prototype.submit_name_and_identifier = function () {
        var _this = this;
        this.unitService.update(this._unit)
            .then(function () { return _this.router.navigate(['..'], { relativeTo: _this.route }); })
            .catch(console.error);
    };
    UnitDetailComponent.prototype.relateUser = function (unitID, userID) {
        var _this = this;
        this.unitService.relateUser(unitID, userID)
            .then(function () {
            _this.unitService.usersInUnit(_this._unitID)
                .then(function (userIDs) { return _this._unitUserIDs = userIDs; })
                .catch(console.error);
            _this.unitService.freeUsers()
                .then(function (userIDs) { return _this._freeUserIDs = userIDs; })
                .catch(console.error);
        })
            .catch(console.error);
    };
    UnitDetailComponent.prototype.removeUser = function (unitID, userID) {
        var _this = this;
        this.unitService.removeUser(unitID, userID)
            .then(function () {
            _this.unitService.usersInUnit(_this._unitID)
                .then(function (userIDs) { return _this._unitUserIDs = userIDs; })
                .catch(console.error);
            _this.unitService.freeUsers()
                .then(function (userIDs) { return _this._freeUserIDs = userIDs; })
                .catch(console.error);
        })
            .catch(console.error);
    };
    UnitDetailComponent.prototype.assignRole = function (unitID, userID, role) {
        var _this = this;
        this.unitService.assignRole(unitID, userID, role)
            .then(function () {
            _this.unitService.unit(_this._unitID)
                .then(function (unit) { return _this._unit = unit; })
                .catch(console.error);
            _this.unitService.usersInUnit(_this._unitID)
                .then(function (userIDs) { return _this._unitUserIDs = userIDs; })
                .catch(console.error);
        })
            .catch(console.error);
    };
    UnitDetailComponent.prototype.deassignRole = function (unitID, userID, role) {
        var _this = this;
        this.unitService.deassignRole(unitID, userID, role)
            .then(function () {
            _this.unitService.unit(_this._unitID)
                .then(function (unit) { return _this._unit = unit; })
                .catch(console.error);
            _this.unitService.usersInUnit(_this._unitID)
                .then(function (userIDs) { return _this._unitUserIDs = userIDs; })
                .catch(console.error);
        })
            .catch(console.error);
    };
    UnitDetailComponent.prototype.relateParent = function (parentUnit, childUnit) {
        var _this = this;
        this.unitService.relateParent(parentUnit, childUnit)
            .then(function () {
            _this.unitService.unit(_this._unitID)
                .then(function (unit) { return _this._unit = unit; })
                .catch(console.error);
        }).catch(console.error);
    };
    UnitDetailComponent.prototype.removeParent = function (parentUnit, childUnit) {
        var _this = this;
        this.unitService.removeParent(parentUnit, childUnit)
            .then(function () {
            _this.unitService.unit(_this._unitID)
                .then(function (unit) { return _this._unit = unit; })
                .catch(console.error);
            _this.unitService.freeUnits(_this._unitID)
                .then(function (unitIDs) { return _this._freeUnitIDs = unitIDs; })
                .catch(console.error);
        }).catch(console.error);
    };
    UnitDetailComponent.prototype.cancel = function () {
        this.router.navigate(['..'], { relativeTo: this.route });
    };
    UnitDetailComponent = __decorate([
        core_1.Component({
            template: "\n  <div class=\"ui one column grid\">\n    <div class=\"column\">\n        <div class=\"ui padded raised segment\">\n        <h2 class=\"ui header\">\u57FA\u672C\u8CC7\u8A0A</h2>\n\n        <form class=\"ui form\" (ngSubmit)=\"submit_name_and_identifier()\" #unitForm=\"ngForm\">\n            <div class=\"field\">\n            <label>ID</label>\n            <p>{{_unit.id}}</p>\n            </div>\n            <div class=\"field\">\n            <label>\u55AE\u4F4D\u540D\u7A31</label>\n            <input type=\"text\" [(ngModel)]=\"_unit.name\" name=\"name\" required>\n            </div>\n            <div class=\"field\">\n            <label>\u55AE\u4F4D\u7DE8\u865F</label>\n            <input type=\"number\" min=\"0\" [(ngModel)]=\"_unit.identifier\" name=\"title\" required>\n            </div>\n            <div style=\"text-align: right;\">\n            <button type=\"button\" class=\"ui basic button\" (click)=\"cancel()\">\u53D6\u6D88</button>\n            <button type=\"submit\" id=\"update_button\" class=\"ui basic button\" [class.green]=\"unitForm.form.valid\" [class.red]=\"!unitForm.form.valid\"\n                [disabled]=\"!unitForm.form.valid\" data-content=\"\u8A72\u6309\u9215\u53EA\u80FD\u66F4\u65B0\u55AE\u4F4D\u540D\u7A31\u4EE5\u53CA\u55AE\u4F4D\u7DE8\u865F\u3002\">\u66F4\u65B0</button>\n            </div>\n        </form>\n        </div>\n    </div>\n    <div class=\"column\">\n        <div class=\"ui two column grid\">\n        <div class=\"column\">\n            <div class=\"ui segments\">\n            <h2 class=\"ui top attached header\">\u4EBA\u54E1\u8CC7\u8A0A</h2>\n            <div class=\"ui attached segment\">\n                <h3 class=\"ui header\">\u55AE\u4F4D\u5167</h3>\n                <p *ngIf=\"_unitUserIDs.length == 0\">\u55AE\u4F4D\u5167\u7121\u4EBA\u54E1</p>\n                <div>\n                <a class=\"link append-separator\" data-separator=\"\u3001\" *ngFor=\"let userID of _unitUserIDs\" (click)=\"removeUser(_unit.id, userID)\">{{userID | userName}}</a>\n                </div>\n            </div>\n            <div class=\"ui attached segment\">\n                <h3 class=\"ui header\">\u7121\u55AE\u4F4D</h3>\n                <div>\n                <a class=\"link append-separator\" data-separator=\"\u3001\" *ngFor=\"let userID of _freeUserIDs\" (click)=\"relateUser(_unit.id, userID)\">{{userID | userName}}</a>\n                </div>\n            </div>\n            <div class=\"ui bottom attached info message\">\n                <p>\u9EDE\u9078\u4EE5\u52A0\u5165\uFF0F\u79FB\u51FA\u55AE\u4F4D</p>\n            </div>\n            </div>\n        </div>\n        <div class=\"column\">\n            <div class=\"ui segments\">\n            <h2 class=\"ui top attached header\">\u4E3B\u7BA1</h2>\n            <div class=\"ui attached segment\" *ngIf=\"_unit.manager\">\n                \u76EE\u524D\u7531 <a class=\"link\" (click)=\"deassignRole(_unit.id, _unit.manager, 'manager')\">{{_unit.manager | userName}}</a> \u4EFB\u8077\n            </div>\n            <div class=\"ui attached segment\" *ngIf=\"!_unit.manager\">\n                <p *ngIf=\"_unitUserIDs.length == 0\">\u55AE\u4F4D\u5167\u7121\u4EBA\u54E1</p>\n                <div>\n                <a class=\"link append-separator\" data-separator=\"\u3001\" *ngFor=\"let userID of _unitUserIDs\" (click)=\"assignRole(_unit.id, userID, 'manager')\">{{userID | userName}}</a>\n                </div>\n            </div>\n            <div class=\"ui bottom attached info message\">\n                <p *ngIf=\"_unit.manager\">\u9EDE\u9078\u4EE5\u89E3\u9664\u8077\u52D9</p>\n                <p *ngIf=\"!_unit.manager\">\u9EDE\u9078\u4EE5\u6307\u5B9A\u8077\u52D9</p>\n            </div>\n            </div>\n        </div>\n        <div class=\"column\">\n            <div class=\"ui segments\">\n            <h2 class=\"ui top attached header\">\u6587\u7BA1</h2>\n            <div class=\"ui attached segment\" *ngIf=\"_unit.docsControl\">\n                \u76EE\u524D\u7531 <a class=\"link\" (click)=\"deassignRole(_unit.id, _unit.docsControl, 'docsControl')\">{{_unit.docsControl | userName}}</a> \u4EFB\u8077\n            </div>\n            <div class=\"ui attached segment\" *ngIf=\"!_unit.docsControl\">\n                <p *ngIf=\"_unitUserIDs.length == 0\">\u55AE\u4F4D\u5167\u7121\u4EBA\u54E1</p>\n                <div>\n                <a class=\"link append-separator\" data-separator=\"\u3001\" *ngFor=\"let userID of _unitUserIDs\" (click)=\"assignRole(_unit.id, userID, 'docsControl')\">{{userID | userName}}</a>\n                </div>\n            </div>\n            <div class=\"ui bottom attached info message\">\n                <p *ngIf=\"_unit.docsControl\">\u9EDE\u9078\u4EE5\u89E3\u9664\u8077\u52D9</p>\n                <p *ngIf=\"!_unit.docsControl\">\u9EDE\u9078\u4EE5\u6307\u5B9A\u8077\u52D9</p>\n            </div>\n            </div>\n        </div>\n        <div class=\"column\">\n            <div class=\"ui segments\">\n            <h2 class=\"ui top attached header\">\u627F\u8FA6\u4EBA</h2>\n            <div class=\"ui attached segment\" *ngIf=\"_unit.agents.length > 0\">\n                <h3 class=\"ui header\">\u73FE\u4EFB\u627F\u8FA6\u4EBA</h3>\n                <div>\n                <a class=\"link append-separator\" data-separator=\"\u3001\" *ngFor=\"let agent of _unit.agents\" (click)=\"deassignRole(_unit.id, agent, 'agent')\">{{agent | userName}}</a>\n                </div>\n            </div>\n            <div class=\"ui attached segment\" *ngIf=\"_unit.agents.length != _unitUserIDs.length\">\n                <h3 class=\"ui header\">\u975E\u627F\u8FA6\u4EBA</h3>\n                <div>\n                <template ngFor let-userID [ngForOf]=\"_unitUserIDs\">\n                    <a class=\"link append-separator\" data-separator=\"\u3001\" *ngIf=\"_unit.agents.indexOf(userID) < 0\" (click)=\"assignRole(_unit.id, userID, 'agent')\">{{userID | userName}}</a>\n                </template>\n                </div>\n            </div>\n            <div class=\"ui attached segment\" *ngIf=\"_unitUserIDs.length == 0\">\n                <p>\u6C92\u6709\u4EBA\u54E1\u5728\u55AE\u4F4D\u4E2D</p>\n            </div>\n            <div class=\"ui bottom attached info message\">\n                <p>\u9EDE\u9078\u4EE5\u6307\u5B9A\uFF0F\u89E3\u9664\u8077\u52D9</p>\n            </div>\n            </div>\n        </div>\n        <div class=\"column\">\n            <div class=\"ui segments\">\n            <h2 class=\"ui top attached header\">\u6BCD\u55AE\u4F4D</h2>\n            <div class=\"ui attached segment\" *ngIf=\"_unit.parentUnit\">\n                \u76EE\u524D\u7684\u6BCD\u55AE\u4F4D\uFF1A<a class=\"link\" (click)=\"removeParent(_unit.parentUnit, _unit.id)\">{{_unit.parentUnit | unitName}}</a>\n            </div>\n            <div class=\"ui attached segment\" *ngIf=\"!_unit.parentUnit\">\n                <a class=\"link append-separator\" data-separator=\"\u3001\" *ngFor=\"let unitID of _freeUnitIDs\" (click)=\"relateParent(unitID, _unit.id)\">{{unitID | unitName}}</a>\n            </div>\n            <div class=\"ui bottom attached info message\" *ngIf=\"_unit.parentUnit\">\n                <p>\u9EDE\u9078\u4EE5\u89E3\u9664\u6BCD\u55AE\u4F4D</p>\n            </div>\n            <div class=\"ui bottom attached info message\" *ngIf=\"!_unit.parentUnit\">\n                <p>\u9EDE\u9078\u4EE5\u6307\u5B9A\u70BA\u6BCD\u55AE\u4F4D</p>\n            </div>\n            </div>\n        </div>\n        <div class=\"column\">\n            <div class=\"ui segments\">\n            <h2 class=\"ui top attached header\">\u5B50\u55AE\u4F4D</h2>\n            <div class=\"ui attached segment\">\n                <p *ngIf=\"_unit.childUnits.length == 0\">\u6C92\u6709\u5B50\u55AE\u4F4D</p>\n                <p *ngFor=\"let childUnit of _unit.childUnits\">\n                {{childUnit | unitName:'silent'}}\n                </p>\n            </div>\n            </div>\n        </div>\n        </div>\n    </div>\n    </div>\n\n  "
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, unit_service_1.UnitService])
    ], UnitDetailComponent);
    return UnitDetailComponent;
}());
exports.UnitDetailComponent = UnitDetailComponent;
//# sourceMappingURL=unit-detail.component.js.map
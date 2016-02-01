System.register(['angular2/core', 'angular2/router', './../../../services/unit.service', './../../../services/user.service', './../../../pipes/pipes'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, unit_service_1, user_service_1, pipes_1;
    var UnitDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (unit_service_1_1) {
                unit_service_1 = unit_service_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (pipes_1_1) {
                pipes_1 = pipes_1_1;
            }],
        execute: function() {
            UnitDetailComponent = (function () {
                function UnitDetailComponent(_router, _routeParams, _unitService) {
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this._unitService = _unitService;
                }
                UnitDetailComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    // Get a placeholder Unit to get around the undefined key bug.
                    this._unit = this._unitService.empty();
                    this._unitUserIDs = [];
                    this._freeUserIDs = [];
                    this._freeUnitIDs = [];
                    this._unitID = this._routeParams.get('id');
                    // Get the Unit from UnitService
                    this._unitService.unit(this._unitID)
                        .then(function (unit) { return _this._unit = unit; })
                        .catch(console.error);
                    this._unitService.usersInUnit(this._unitID)
                        .then(function (userIDs) { return _this._unitUserIDs = userIDs; })
                        .catch(console.error);
                    this._unitService.freeUsers()
                        .then(function (userIDs) { return _this._freeUserIDs = userIDs; })
                        .catch(console.error);
                    this._unitService.freeUnits(this._unitID)
                        .then(function (unitIDs) { return _this._freeUnitIDs = unitIDs; })
                        .catch(console.error);
                };
                UnitDetailComponent.prototype.submit_name_and_identifier = function () {
                    var _this = this;
                    this._unitService.update(this._unit)
                        .then(function () { return _this._router.navigate(['UnitList']); })
                        .catch(console.error);
                };
                UnitDetailComponent.prototype.relateUser = function (unitID, userID) {
                    var _this = this;
                    this._unitService.relateUser(unitID, userID)
                        .then(function () {
                        _this._unitService.usersInUnit(_this._unitID)
                            .then(function (userIDs) { return _this._unitUserIDs = userIDs; })
                            .catch(console.error);
                        _this._unitService.freeUsers()
                            .then(function (userIDs) { return _this._freeUserIDs = userIDs; })
                            .catch(console.error);
                    })
                        .catch(console.error);
                };
                UnitDetailComponent.prototype.removeUser = function (unitID, userID) {
                    var _this = this;
                    this._unitService.removeUser(unitID, userID)
                        .then(function () {
                        _this._unitService.usersInUnit(_this._unitID)
                            .then(function (userIDs) { return _this._unitUserIDs = userIDs; })
                            .catch(console.error);
                        _this._unitService.freeUsers()
                            .then(function (userIDs) { return _this._freeUserIDs = userIDs; })
                            .catch(console.error);
                    })
                        .catch(console.error);
                };
                UnitDetailComponent.prototype.assignRole = function (unitID, userID, role) {
                    var _this = this;
                    this._unitService.assignRole(unitID, userID, role)
                        .then(function () {
                        _this._unitService.unit(_this._unitID)
                            .then(function (unit) { return _this._unit = unit; })
                            .catch(console.error);
                        _this._unitService.usersInUnit(_this._unitID)
                            .then(function (userIDs) { return _this._unitUserIDs = userIDs; })
                            .catch(console.error);
                    })
                        .catch(console.error);
                };
                UnitDetailComponent.prototype.deassignRole = function (unitID, userID, role) {
                    var _this = this;
                    this._unitService.deassignRole(unitID, userID, role)
                        .then(function () {
                        _this._unitService.unit(_this._unitID)
                            .then(function (unit) { return _this._unit = unit; })
                            .catch(console.error);
                        _this._unitService.usersInUnit(_this._unitID)
                            .then(function (userIDs) { return _this._unitUserIDs = userIDs; })
                            .catch(console.error);
                    })
                        .catch(console.error);
                };
                UnitDetailComponent.prototype.relateParent = function (parentUnit, childUnit) {
                    var _this = this;
                    this._unitService.relateParent(parentUnit, childUnit)
                        .then(function () {
                        _this._unitService.unit(_this._unitID)
                            .then(function (unit) { return _this._unit = unit; })
                            .catch(console.error);
                    }).catch(console.error);
                };
                UnitDetailComponent.prototype.removeParent = function (parentUnit, childUnit) {
                    var _this = this;
                    this._unitService.removeParent(parentUnit, childUnit)
                        .then(function () {
                        _this._unitService.unit(_this._unitID)
                            .then(function (unit) { return _this._unit = unit; })
                            .catch(console.error);
                        _this._unitService.freeUnits(_this._unitID)
                            .then(function (unitIDs) { return _this._freeUnitIDs = unitIDs; })
                            .catch(console.error);
                    }).catch(console.error);
                };
                UnitDetailComponent.prototype.cancel = function () {
                    this._router.navigate(['UnitList']);
                };
                UnitDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'unit-detail',
                        templateUrl: '/app/admin/unit-admin/unit-detail/unit-detail.template.html',
                        providers: [unit_service_1.UnitService, user_service_1.UserService],
                        pipes: [pipes_1.UnitNamePipe, pipes_1.UserNamePipe]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, unit_service_1.UnitService])
                ], UnitDetailComponent);
                return UnitDetailComponent;
            })();
            exports_1("UnitDetailComponent", UnitDetailComponent);
        }
    }
});
//# sourceMappingURL=unit-detail.component.js.map
System.register(['angular2/core', 'angular2/router', './../../../services/unit.service', './../../../services/user.service', './../../../pipes/unit-name.pipe', './../../../pipes/user-name.pipe'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, unit_service_1, user_service_1, unit_name_pipe_1, user_name_pipe_1;
    var UnitListComponent;
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
            function (unit_name_pipe_1_1) {
                unit_name_pipe_1 = unit_name_pipe_1_1;
            },
            function (user_name_pipe_1_1) {
                user_name_pipe_1 = user_name_pipe_1_1;
            }],
        execute: function() {
            UnitListComponent = (function () {
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
                        .then(function (newUnitID) { return _this._router.navigate(["UnitDetail", { id: newUnitID }]); })
                        .catch(console.error);
                };
                UnitListComponent.prototype.edit = function (unitID) {
                    this._router.navigate(["UnitDetail", { id: unitID }]);
                };
                UnitListComponent.prototype.delete = function (unitID) {
                    var _this = this;
                    this._unitService.delete(unitID)
                        .then(function () { return _this._unitService.units()
                        .then(function (units) { return _this._units = units; })
                        .catch(console.error); })
                        .catch(console.error);
                };
                UnitListComponent = __decorate([
                    core_1.Component({
                        selector: 'unit-list',
                        templateUrl: '/app/admin/unit-admin/unit-list/unit-list.template.html',
                        providers: [unit_service_1.UnitService, user_service_1.UserService],
                        pipes: [unit_name_pipe_1.UnitNamePipe, user_name_pipe_1.UserNamePipe]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, unit_service_1.UnitService])
                ], UnitListComponent);
                return UnitListComponent;
            })();
            exports_1("UnitListComponent", UnitListComponent);
        }
    }
});
//# sourceMappingURL=unit-list.component.js.map
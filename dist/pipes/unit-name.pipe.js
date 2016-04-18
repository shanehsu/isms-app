System.register(['angular2/core', './../services/unit.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, unit_service_1;
    var UnitNamePipe;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (unit_service_1_1) {
                unit_service_1 = unit_service_1_1;
            }],
        execute: function() {
            UnitNamePipe = (function () {
                function UnitNamePipe(unitService) {
                    var _this = this;
                    this._units = {};
                    unitService.units().then(function (units) {
                        for (var _i = 0, units_1 = units; _i < units_1.length; _i++) {
                            var unit = units_1[_i];
                            _this._units[unit.id] = unit.name;
                        }
                    });
                }
                UnitNamePipe.prototype.transform = function (id, args) {
                    if (!id || id == '') {
                        if (args.indexOf('silent') < 0) {
                            return '未隸屬任何單位';
                        }
                        else {
                            return '';
                        }
                    }
                    else if (this._units[id]) {
                        return this._units[id];
                    }
                    else {
                        return 'ID 屬於不存在的單位';
                    }
                };
                UnitNamePipe = __decorate([
                    core_1.Pipe({ name: 'unitName', pure: false }), 
                    __metadata('design:paramtypes', [unit_service_1.UnitService])
                ], UnitNamePipe);
                return UnitNamePipe;
            }());
            exports_1("UnitNamePipe", UnitNamePipe);
        }
    }
});
//# sourceMappingURL=unit-name.pipe.js.map
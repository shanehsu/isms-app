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
const core_1 = require('@angular/core');
const unit_service_1 = require('./../services/unit.service');
let UnitNamePipe = class UnitNamePipe {
    constructor(unitService) {
        this._units = {};
        unitService.units().then(units => {
            for (let unit of units) {
                this._units[unit.id] = unit.name;
            }
        });
    }
    transform(id, args) {
        if (!id || id == '') {
            if (!args || args.indexOf('silent') < 0) {
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
    }
};
UnitNamePipe = __decorate([
    core_1.Pipe({ name: 'unitName', pure: false }), 
    __metadata('design:paramtypes', [unit_service_1.UnitService])
], UnitNamePipe);
exports.UnitNamePipe = UnitNamePipe;
//# sourceMappingURL=unit-name.pipe.js.map
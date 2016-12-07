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
const group_name_pipe_1 = require('./group-name.pipe');
const unit_name_pipe_1 = require('./unit-name.pipe');
const user_name_pipe_1 = require('./user-name.pipe');
const chinese_date_pipe_1 = require('./chinese-date.pipe');
var group_name_pipe_2 = require('./group-name.pipe');
exports.GroupNamePipe = group_name_pipe_2.GroupNamePipe;
var unit_name_pipe_2 = require('./unit-name.pipe');
exports.UnitNamePipe = unit_name_pipe_2.UnitNamePipe;
var user_name_pipe_2 = require('./user-name.pipe');
exports.UserNamePipe = user_name_pipe_2.UserNamePipe;
var chinese_date_pipe_2 = require('./chinese-date.pipe');
exports.ChineseDatePipe = chinese_date_pipe_2.ChineseDatePipe;
let pipesModule = class pipesModule {
};
pipesModule = __decorate([
    core_1.NgModule({
        declarations: [
            chinese_date_pipe_1.ChineseDatePipe,
            group_name_pipe_1.GroupNamePipe,
            unit_name_pipe_1.UnitNamePipe,
            user_name_pipe_1.UserNamePipe
        ],
        exports: [
            chinese_date_pipe_1.ChineseDatePipe,
            group_name_pipe_1.GroupNamePipe,
            unit_name_pipe_1.UnitNamePipe,
            user_name_pipe_1.UserNamePipe
        ]
    }), 
    __metadata('design:paramtypes', [])
], pipesModule);
exports.pipesModule = pipesModule;
//# sourceMappingURL=pipes.module.js.map
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
let ChineseDatePipe = class ChineseDatePipe {
    transform(value, args) {
        if (!value) {
            return '錯誤';
        }
        if (args && args.indexOf("builtin") >= 0) {
            let formatter = Intl.DateTimeFormat("zh-Hant-TW", { year: 'numeric', month: 'long', day: 'numeric' });
            return formatter.format(value);
        }
        let year = value.getFullYear();
        let month = value.getMonth() + 1;
        let date = value.getDate();
        return year + ' 年 ' + month + ' 月 ' + date + ' 日';
    }
};
ChineseDatePipe = __decorate([
    core_1.Pipe({ name: 'chineseDate' }), 
    __metadata('design:paramtypes', [])
], ChineseDatePipe);
exports.ChineseDatePipe = ChineseDatePipe;
//# sourceMappingURL=chinese-date.pipe.js.map
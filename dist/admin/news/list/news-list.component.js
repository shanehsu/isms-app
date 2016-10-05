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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var news_service_1 = require("./../../../services/news.service");
var NewsListComponent = (function () {
    function NewsListComponent(_router, _newsService) {
        this._router = _router;
        this._newsService = _newsService;
    }
    NewsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._piecesToKeep = 20;
        this._pieces = [];
        this._newsService.retrieve().then(function (pieces) { return _this._pieces = pieces; });
    };
    NewsListComponent.prototype.new = function () {
        var _this = this;
        this._newsService.create(this._newsService.fake())
            .then(function (id) { return _this.edit(id); })
            .catch(function () { return _this._newsService.retrieve().then(function (pieces) { return _this._pieces = pieces; }); });
    };
    NewsListComponent.prototype.deleteExcessive = function () {
        var _this = this;
        var piecesToKeep = this._piecesToKeep;
        var length = this._pieces.length;
        if (piecesToKeep >= this._pieces.length)
            return;
        var shouldDelete = confirm("確定刪除多餘的 " + (length - piecesToKeep) + " 筆消息？");
        if (!shouldDelete)
            return;
        var issuedRequest = 0;
        var receivedResponse = 0;
        for (var index = this._piecesToKeep; index < this._pieces.length; index++) {
            issuedRequest++;
            this._newsService.delete(this._pieces[index].id)
                .then(function () {
                receivedResponse++;
                _this._newsService.retrieve().then(function (pieces) { return _this._pieces = pieces; });
                if (issuedRequest == receivedResponse) {
                    _this._newsService.retrieve().then(function (pieces) { return _this._pieces = pieces; });
                }
            })
                .catch(function () {
                receivedResponse++;
                _this._newsService.retrieve().then(function (pieces) { return _this._pieces = pieces; });
                if (issuedRequest == receivedResponse) {
                    _this._newsService.retrieve().then(function (pieces) { return _this._pieces = pieces; });
                }
            });
        }
    };
    NewsListComponent.prototype.edit = function (id) {
        this._router.navigate([{ id: id }]);
    };
    NewsListComponent.prototype.delete = function (id) {
        var _this = this;
        var shouldDelete = confirm("確定要刪除嗎？");
        if (shouldDelete) {
            this._newsService.delete(id).then(function () { return _this._newsService.retrieve().then(function (pieces) { return _this._pieces = pieces; }); })
                .catch(function () { return _this._newsService.retrieve().then(function (pieces) { return _this._pieces = pieces; }); });
        }
    };
    return NewsListComponent;
}());
NewsListComponent = __decorate([
    core_1.Component({
        template: "\n  <div class=\"ui two column grid\">\n    <form class=\"ui form left aligned column\">\n      <div class=\"inline field\">\n        <div class=\"ui right labeled input\">\n          <div class=\"ui basic label\">\u7559\u4E0B\u6700\u65B0</div>\n          <input type=\"number\" style=\"width: 5em; text-align: center;\" min=\"1\" max=\"99\" id=\"amount\" [(ngModel)]=\"_piecesToKeep\" [ngModelOptions]=\"{standalone: true}\">\n          <div class=\"ui basic label\">\u5247\u6D88\u606F</div>\n        </div>\n        <button class=\"ui red button\" (click)=\"deleteExcessive()\">\u522A\u9664</button>\n      </div>\n    </form>\n    <form class=\"ui form right aligned column\">\n      <button type=\"button\" class=\"ui right floated blue labeled icon button\" (click)=\"new()\">\n        <i class=\"plus icon\"></i>\n        \u65B0\u589E\u6D88\u606F\n      </button>\n    </form>\n  </div>\n  <table class=\"ui striped table\">\n    <thead>\n      <tr>\n        <th style=\"min-width: 10em;\">\u65E5\u671F</th>\n        <th style=\"min-width: 6em;\">\u4F86\u6E90</th>\n        <th style=\"width: 100%\">\u65B0\u805E\u7C21\u4ECB</th>\n        <th style=\"min-width: 12em;\">\u52D5\u4F5C</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr *ngFor=\"let piece of _pieces\">\n        <td>{{piece.date | chineseDate}}</td>\n        <td>{{piece.source}}</td>\n        <td>{{piece.summary}}</td>\n        <td style=\"text-align: center;\">\n          <div class=\"small ui buttons\">\n            <button type=\"button\" class=\"ui basic teal button\" (click)=\"edit(piece.id)\">\u7DE8\u8F2F</button>\n            <button type=\"button\" class=\"ui basic red button\" (click)=\"delete(piece.id)\">\u522A\u9664</button>\n          </div>\n        </td>\n      </tr>\n    </tbody>\n  </table>"
    }),
    __metadata("design:paramtypes", [router_1.Router, news_service_1.NewsService])
], NewsListComponent);
exports.NewsListComponent = NewsListComponent;
//# sourceMappingURL=news-list.component.js.map
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
var news_service_1 = require("./../services/news.service");
var NewsComponent = (function () {
    function NewsComponent(newsService) {
        this.newsService = newsService;
    }
    NewsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.hasNewer = false;
        this.currentPage = 1;
        this.pieces = [];
        this.piecesView = [];
        this.newsService.retrieve().then(function (pieces) {
            _this.pieces = pieces;
            _this.piecesView = _this.pieces.slice(0, 10);
            _this.hasOlder = (pieces.length > 10);
        });
    };
    NewsComponent.prototype.older = function () {
        if (!this.hasOlder)
            return;
        this.hasNewer = true;
        this.currentPage++;
        this.hasOlder = this.pieces.length > this.currentPage * 10;
        this.piecesView = this.pieces.slice((this.currentPage - 1) * 10, this.currentPage * 10);
    };
    NewsComponent.prototype.newer = function () {
        if (!this.hasNewer)
            return;
        this.hasOlder = true;
        this.currentPage--;
        this.hasNewer = this.currentPage > 1;
        this.piecesView = this.pieces.slice((this.currentPage - 1) * 10, this.currentPage * 10);
    };
    return NewsComponent;
}());
NewsComponent = __decorate([
    core_1.Component({
        template: "\n  <h2 class=\"ui header\">\u6700\u65B0\u6D88\u606F</h2>\n  <table class=\"ui padded basic striped table\">\n    <thead>\n      <tr>\n        <th style=\"width: 13em\">\u65E5\u671F</th>\n        <th style=\"width: 13em\">\u4F86\u6E90</th>\n        <th>\u65B0\u805E\u7C21\u4ECB</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr *ngFor=\"let piece of piecesView\">\n        <td>{{piece.date | chineseDate}}</td>\n        <td>{{piece.source}}</td>\n        <td><a [href]=\"piece.link\">{{piece.summary}}</a></td>\n      </tr>\n    </tbody>\n    <tfoot class=\"full-width\">\n      <tr>\n        <th colspan=\"3\" style=\"padding: 0.5em 0.5em;\">\n          <div class=\"ui right floated mini pagination menu\">\n            <a class=\"icon item\" [class.disabled]=\"!hasNewer\" (click)=\"newer()\"><i class=\"left chevron icon\"></i></a>\n            <a class=\"icon item\" [class.disabled]=\"!hasOlder\" (click)=\"older()\"><i class=\"right chevron icon\"></i></a>\n          </div>\n        </th>\n      </tr>\n    </tfoot>\n  </table>\n  "
    }),
    __metadata("design:paramtypes", [news_service_1.NewsService])
], NewsComponent);
exports.NewsComponent = NewsComponent;
//# sourceMappingURL=news.component.js.map
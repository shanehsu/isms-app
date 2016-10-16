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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var news_service_1 = require('./../../services/news.service');
var router_2 = require('@angular/router');
var NewsDetailComponent = (function () {
    function NewsDetailComponent(router, route, newsService) {
        this.router = router;
        this.route = route;
        this.newsService = newsService;
    }
    NewsDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.piece = this.newsService.fake();
        this.id = this.route.snapshot.params['id'];
        this.newsService.retrievePiece(this.id).then(function (piece) { return _this.piece = piece; });
    };
    NewsDetailComponent.prototype.submit = function () {
        var _this = this;
        this.newsService.update(this.piece).then(function (piece) { return _this.router.navigate(['..'], { relativeTo: _this.route }); })
            .catch(function (err) { return console.error(err); });
    };
    NewsDetailComponent.prototype.cancel = function () {
        this.router.navigate(['..'], { relativeTo: this.route });
    };
    NewsDetailComponent = __decorate([
        core_1.Component({
            template: "\n    <form class=\"ui form\" (ngSubmit)=\"submit()\" #pieceForm=\"ngForm\">\n      <div class=\"field\">\n        <label>ID</label>\n        <p>{{piece.id}}</p>\n      </div>\n      <div class=\"field\">\n        <label>\u65E5\u671F</label>\n        <form-control type=\"date\" [(ngModel)]=\"piece.date\" name=\"date\"></form-control>\n      </div>\n      <div class=\"field\">\n        <label>\u7C21\u4ECB</label>\n        <input type=\"text\" [(ngModel)]=\"piece.summary\" name=\"summary\" required>\n      </div>\n      <div class=\"field\">\n        <label>\u4F86\u6E90</label>\n        <input type=\"text\" [(ngModel)]=\"piece.source\" name=\"source\" required>\n      </div>\n      <div class=\"field\">\n        <label>\u9023\u7D50</label>\n        <input type=\"text\" [(ngModel)]=\"piece.link\" name=\"link\">\n      </div>\n      \n      <div style=\"text-align: right;\">\n        <button type=\"button\" class=\"ui basic button\" (click)=\"cancel()\">\u53D6\u6D88</button>\n        <button type=\"submit\" class=\"ui basic button\" [class.green]=\"pieceForm.form.valid\" [class.red]=\"!pieceForm.form.valid\" [disabled]=\"!pieceForm.form.valid\">\u66F4\u65B0</button>\n      </div>\n    </form>\n    "
        }), 
        __metadata('design:paramtypes', [router_2.Router, router_1.ActivatedRoute, news_service_1.NewsService])
    ], NewsDetailComponent);
    return NewsDetailComponent;
}());
exports.NewsDetailComponent = NewsDetailComponent;
//# sourceMappingURL=news-detail.component.js.map
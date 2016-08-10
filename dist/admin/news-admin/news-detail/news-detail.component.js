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
var news_service_1 = require('./../../../services/news.service');
var router_1 = require('@angular/router');
var isms_form_controls_1 = require('./../../../controls/isms-form-controls');
var NewsDetailComponent = (function () {
    function NewsDetailComponent(_router, _routeSegment, _newsService) {
        this._router = _router;
        this._routeSegment = _routeSegment;
        this._newsService = _newsService;
    }
    NewsDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._piece = this._newsService.fake();
        this._id = this._routeSegment.getParam('id');
        this._newsService.retrievePiece(this._id).then(function (piece) { return _this._piece = piece; });
    };
    NewsDetailComponent.prototype.submit = function () {
        var _this = this;
        this._newsService.update(this._piece).then(function (piece) { return _this._router.navigate(['/admin/news']); })
            .catch(function (err) { return console.error(err); });
    };
    NewsDetailComponent.prototype.cancel = function () {
        this._router.navigate(['/admin/news']);
    };
    NewsDetailComponent = __decorate([
        core_1.Component({
            selector: 'news-detail',
            templateUrl: '/app/admin/news-admin/news-detail/news-detail.template.html',
            directives: [isms_form_controls_1.DateFormControl]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.RouteSegment, news_service_1.NewsService])
    ], NewsDetailComponent);
    return NewsDetailComponent;
}());
exports.NewsDetailComponent = NewsDetailComponent;
//# sourceMappingURL=news-detail.component.js.map
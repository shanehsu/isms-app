System.register(['angular2/core', './../../../services/news.service', 'angular2/router', './../../../controls/datepicker/datepicker.component'], function(exports_1, context_1) {
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
    var core_1, news_service_1, router_1, datepicker_component_1;
    var NewsDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (news_service_1_1) {
                news_service_1 = news_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (datepicker_component_1_1) {
                datepicker_component_1 = datepicker_component_1_1;
            }],
        execute: function() {
            NewsDetailComponent = (function () {
                function NewsDetailComponent(_router, _routeParams, _newsService) {
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this._newsService = _newsService;
                }
                NewsDetailComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._piece = this._newsService.fake();
                    this._id = this._routeParams.get('id');
                    this._newsService.retrievePiece(this._id).then(function (piece) { return _this._piece = piece; });
                };
                NewsDetailComponent.prototype.submit = function () {
                    var _this = this;
                    this._newsService.update(this._piece).then(function (piece) { return _this._router.navigate(['NewsList']); })
                        .catch(function (err) { return console.error(err); });
                };
                NewsDetailComponent.prototype.cancel = function () {
                    this._router.navigate(['NewsList']);
                };
                NewsDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'news-detail',
                        templateUrl: '/app/admin/news-admin/news-detail/news-detail.template.html',
                        directives: [datepicker_component_1.DatePicker]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, news_service_1.NewsService])
                ], NewsDetailComponent);
                return NewsDetailComponent;
            }());
            exports_1("NewsDetailComponent", NewsDetailComponent);
        }
    }
});
//# sourceMappingURL=news-detail.component.js.map
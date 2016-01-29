System.register(['angular2/core', 'angular2/router', './../../../services/news.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, news_service_1;
    var NewsListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (news_service_1_1) {
                news_service_1 = news_service_1_1;
            }],
        execute: function() {
            NewsListComponent = (function () {
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
                        .then(function () { return _this._newsService.retrieve().then(function (pieces) { return _this._pieces = pieces; }); })
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
                    this._router.navigate(['NewsDetail', { 'id': id }]);
                };
                NewsListComponent.prototype.delete = function (id) {
                    var _this = this;
                    var shouldDelete = confirm("確定要刪除嗎？");
                    if (shouldDelete) {
                        this._newsService.delete(id).then(function () { return _this._newsService.retrieve().then(function (pieces) { return _this._pieces = pieces; }); })
                            .catch(function () { return _this._newsService.retrieve().then(function (pieces) { return _this._pieces = pieces; }); });
                    }
                };
                NewsListComponent = __decorate([
                    core_1.Component({
                        selector: 'news-list',
                        templateUrl: '/app/admin/news-admin/news-list/news-list.template.html',
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, news_service_1.NewsService])
                ], NewsListComponent);
                return NewsListComponent;
            })();
            exports_1("NewsListComponent", NewsListComponent);
        }
    }
});
//# sourceMappingURL=news-list.component.js.map
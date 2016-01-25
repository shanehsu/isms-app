System.register(['angular2/core', './../../services/news.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, news_service_1;
    var NewsAdminComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (news_service_1_1) {
                news_service_1 = news_service_1_1;
            }],
        execute: function() {
            NewsAdminComponent = (function () {
                function NewsAdminComponent(_newsService) {
                    this._newsService = _newsService;
                }
                NewsAdminComponent.prototype.ngOnInit = function () {
                };
                NewsAdminComponent = __decorate([
                    core_1.Component({
                        selector: 'isms-news-admin',
                        templateUrl: '/app/admin/news-admin/news-admin.template.html'
                    }), 
                    __metadata('design:paramtypes', [news_service_1.NewsService])
                ], NewsAdminComponent);
                return NewsAdminComponent;
            })();
            exports_1("NewsAdminComponent", NewsAdminComponent);
        }
    }
});
//# sourceMappingURL=news-admin.component.js.map
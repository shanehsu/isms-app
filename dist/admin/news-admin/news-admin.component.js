System.register(['angular2/core', 'angular2/router', './news-list/news-list.component', './news-detail/news-detail.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, news_list_component_1, news_detail_component_1;
    var NewsAdminComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (news_list_component_1_1) {
                news_list_component_1 = news_list_component_1_1;
            },
            function (news_detail_component_1_1) {
                news_detail_component_1 = news_detail_component_1_1;
            }],
        execute: function() {
            NewsAdminComponent = (function () {
                function NewsAdminComponent() {
                }
                NewsAdminComponent.prototype.ngOnInit = function () {
                };
                NewsAdminComponent = __decorate([
                    core_1.Component({
                        selector: 'news-admin',
                        templateUrl: '/app/admin/news-admin/news-admin.template.html',
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/',
                            name: 'NewsList',
                            component: news_list_component_1.NewsListComponent,
                            useAsDefault: true
                        },
                        {
                            path: '/:id',
                            name: 'NewsDetail',
                            component: news_detail_component_1.NewsDetailComponent
                        }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], NewsAdminComponent);
                return NewsAdminComponent;
            })();
            exports_1("NewsAdminComponent", NewsAdminComponent);
        }
    }
});
//# sourceMappingURL=news-admin.component.js.map
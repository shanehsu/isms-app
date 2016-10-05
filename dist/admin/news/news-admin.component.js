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
var news_list_component_1 = require("./news-list/news-list.component");
var news_detail_component_1 = require("./news-detail/news-detail.component");
var NewsAdminComponent = (function () {
    function NewsAdminComponent() {
    }
    NewsAdminComponent.prototype.ngOnInit = function () {
    };
    return NewsAdminComponent;
}());
NewsAdminComponent = __decorate([
    core_1.Component({
        selector: 'news-admin',
        templateUrl: '/app/admin/news-admin/news-admin.template.html',
        directives: [router_1.ROUTER_DIRECTIVES]
    }),
    Routes([
        {
            path: '/',
            component: news_list_component_1.NewsListComponent,
        },
        {
            path: '/:id',
            component: news_detail_component_1.NewsDetailComponent
        }
    ]),
    __metadata("design:paramtypes", [])
], NewsAdminComponent);
exports.NewsAdminComponent = NewsAdminComponent;
//# sourceMappingURL=news-admin.component.js.map
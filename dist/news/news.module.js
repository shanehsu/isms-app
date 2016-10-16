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
var news_component_1 = require('./news.component');
var pipes_module_1 = require('./../pipes/pipes.module');
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var routes = [
    {
        path: 'news',
        component: news_component_1.NewsComponent,
    }
];
var newsRoutingModule = router_1.RouterModule.forRoot(routes);
var newsModule = (function () {
    function newsModule() {
    }
    newsModule = __decorate([
        core_1.NgModule({
            declarations: [
                news_component_1.NewsComponent
            ],
            imports: [
                common_1.CommonModule,
                pipes_module_1.pipesModule,
                newsRoutingModule
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], newsModule);
    return newsModule;
}());
exports.newsModule = newsModule;
//# sourceMappingURL=news.module.js.map
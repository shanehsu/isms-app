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
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var pipes_module_1 = require('./../../pipes/pipes.module');
var form_controls_module_1 = require('./../../controls/form-controls.module');
var news_list_component_1 = require('./news-list.component');
exports.NewsListComponent = news_list_component_1.NewsListComponent;
var news_detail_component_1 = require('./news-detail.component');
exports.NewsDetailComponent = news_detail_component_1.NewsDetailComponent;
var NewsAdminComponent = (function () {
    function NewsAdminComponent() {
    }
    NewsAdminComponent = __decorate([
        core_1.Component({
            template: "<router-outlet></router-outlet>"
        }), 
        __metadata('design:paramtypes', [])
    ], NewsAdminComponent);
    return NewsAdminComponent;
}());
exports.NewsAdminComponent = NewsAdminComponent;
var newsAdminModule = (function () {
    function newsAdminModule() {
    }
    newsAdminModule = __decorate([
        core_1.NgModule({
            declarations: [
                NewsAdminComponent,
                news_list_component_1.NewsListComponent,
                news_detail_component_1.NewsDetailComponent
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule,
                pipes_module_1.pipesModule,
                form_controls_module_1.formControlsModule
            ],
            exports: [
                NewsAdminComponent,
                news_list_component_1.NewsListComponent,
                news_detail_component_1.NewsDetailComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], newsAdminModule);
    return newsAdminModule;
}());
exports.newsAdminModule = newsAdminModule;
//# sourceMappingURL=news-admin.module.js.map
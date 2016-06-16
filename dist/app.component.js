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
var router_1 = require('@angular/router');
var navigation_component_1 = require('./isms-nav/navigation.component');
var admin_index_component_1 = require('./admin/isms-admin-index/admin-index.component');
var news_component_1 = require('./isms-news/news.component');
var form_index_component_1 = require('./isms-form/form-index.component');
var AppComponent = (function () {
    function AppComponent(router, location) {
        this.router = router;
        this.location = location;
    }
    AppComponent.prototype.ngOnInit = function () {
        if (this.location.path() == "") {
            this.router.navigate(['/news']);
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'isms-app',
            template: "\n    <isms-nav></isms-nav>\n    <br>\n    <router-outlet></router-outlet>\n    ",
            directives: [navigation_component_1.NavigationComponent, router_1.ROUTER_DIRECTIVES]
        }),
        router_1.Routes([
            {
                path: '/news',
                component: news_component_1.NewsComponent,
            },
            {
                path: '/form',
                component: form_index_component_1.FormIndexComponent
            },
            {
                path: '/admin',
                component: admin_index_component_1.AdminIndexComponent
            }
        ]), 
        __metadata('design:paramtypes', [router_1.Router, common_1.Location])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
System.register(['angular2/core', 'angular2/router', './isms-nav/navigation.component', './admin/isms-admin-index/admin-index.component', './isms-news/news.component', './isms-form/form-index.component'], function(exports_1, context_1) {
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
    var core_1, router_1, navigation_component_1, admin_index_component_1, news_component_1, form_index_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (navigation_component_1_1) {
                navigation_component_1 = navigation_component_1_1;
            },
            function (admin_index_component_1_1) {
                admin_index_component_1 = admin_index_component_1_1;
            },
            function (news_component_1_1) {
                news_component_1 = news_component_1_1;
            },
            function (form_index_component_1_1) {
                form_index_component_1 = form_index_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_router) {
                    this._router = _router;
                }
                AppComponent.prototype.ngOnInit = function () {
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'isms-app',
                        template: "\n    <isms-nav></isms-nav>\n    <br>\n    <router-outlet></router-outlet>\n    ",
                        directives: [navigation_component_1.NavigationComponent, router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/news',
                            name: 'News',
                            component: news_component_1.NewsComponent,
                            useAsDefault: true
                        },
                        {
                            path: '/form',
                            name: 'Form',
                            component: form_index_component_1.FormIndexComponent
                        },
                        {
                            path: '/admin/...',
                            name: 'Admin',
                            component: admin_index_component_1.AdminIndexComponent
                        }
                    ]), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map
System.register(['angular2/core', 'angular2/router', './../../services/auth.service', './../news-admin/news-admin.component', './../user-admin/user-admin.component', './../unit-admin/unit-admin.component', './../form-admin/form-admin.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, router_1, auth_service_1, news_admin_component_1, user_admin_component_1, unit_admin_component_1, form_admin_component_1;
    var AdminIndexComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (news_admin_component_1_1) {
                news_admin_component_1 = news_admin_component_1_1;
            },
            function (user_admin_component_1_1) {
                user_admin_component_1 = user_admin_component_1_1;
            },
            function (unit_admin_component_1_1) {
                unit_admin_component_1 = unit_admin_component_1_1;
            },
            function (form_admin_component_1_1) {
                form_admin_component_1 = form_admin_component_1_1;
            }],
        execute: function() {
            AdminIndexComponent = (function () {
                function AdminIndexComponent(_router, _authService, _location, _config) {
                    this._router = _router;
                    this._authService = _authService;
                    this._location = _location;
                    this._config = _config;
                }
                AdminIndexComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.privilege = 4;
                    this.adminItems = this._config.adminItems;
                    this._authService.privilege().then(function (p) { return _this.privilege = p; });
                };
                AdminIndexComponent.prototype.isActive = function (item) {
                    return this._location.path().startsWith('/admin' + item.route);
                };
                AdminIndexComponent.prototype.navigate = function (item) {
                    this._router.navigate([item.component]);
                };
                AdminIndexComponent = __decorate([
                    core_1.Component({
                        selector: 'isms-admin-index',
                        templateUrl: '/app/admin/isms-admin-index/admin-index.template.html',
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/news/...',
                            name: 'NewsAdmin',
                            component: news_admin_component_1.NewsAdminComponent,
                            useAsDefault: true
                        },
                        {
                            path: '/user/...',
                            name: 'UserAdmin',
                            component: user_admin_component_1.UserAdminComponent
                        },
                        {
                            path: '/unit/...',
                            name: 'UnitAdmin',
                            component: unit_admin_component_1.UnitAdminComponent
                        },
                        {
                            path: '/form/...',
                            name: 'FormAdmin',
                            component: form_admin_component_1.FormAdminComponent
                        }
                    ]),
                    __param(3, core_1.Inject('app.config')), 
                    __metadata('design:paramtypes', [router_1.Router, auth_service_1.AuthService, router_1.Location, Object])
                ], AdminIndexComponent);
                return AdminIndexComponent;
            })();
            exports_1("AdminIndexComponent", AdminIndexComponent);
        }
    }
});
//# sourceMappingURL=admin-index.component.js.map
System.register(['angular2/core', 'angular2/router', './user-list/user-list.component', './user-detail/user-detail.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, user_list_component_1, user_detail_component_1;
    var UserAdminComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (user_list_component_1_1) {
                user_list_component_1 = user_list_component_1_1;
            },
            function (user_detail_component_1_1) {
                user_detail_component_1 = user_detail_component_1_1;
            }],
        execute: function() {
            UserAdminComponent = (function () {
                function UserAdminComponent() {
                }
                UserAdminComponent.prototype.ngOnInit = function () {
                };
                UserAdminComponent = __decorate([
                    core_1.Component({
                        selector: 'user-admin',
                        templateUrl: '/app/admin/user-admin/user-admin.template.html',
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/',
                            name: 'UserList',
                            component: user_list_component_1.UserListComponent,
                            useAsDefault: true
                        },
                        {
                            path: '/:id',
                            name: 'UserDetail',
                            component: user_detail_component_1.UserDetailComponent,
                        }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], UserAdminComponent);
                return UserAdminComponent;
            })();
            exports_1("UserAdminComponent", UserAdminComponent);
        }
    }
});
//# sourceMappingURL=user-admin.component.js.map
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
var admin_component_1 = require('./admin.component');
var news_admin_module_1 = require('./news/news-admin.module');
var news_admin_module_2 = require('./news/news-admin.module');
var users_admin_module_1 = require('./users/users-admin.module');
var users_admin_module_2 = require('./users/users-admin.module');
var units_admin_module_1 = require('./units/units-admin.module');
var units_admin_module_2 = require('./units/units-admin.module');
var forms_admin_module_1 = require('./forms/forms-admin.module');
var forms_admin_module_2 = require('./forms/forms-admin.module');
var routes = [
    {
        path: 'admin',
        component: admin_component_1.AdminComponent,
        children: [
            { path: '', redirectTo: 'news', pathMatch: 'full' },
            { path: 'news',
                component: news_admin_module_2.NewsAdminComponent,
                children: [
                    { path: '', component: news_admin_module_2.NewsListComponent },
                    { path: ':id', component: news_admin_module_2.NewsDetailComponent }
                ]
            },
            { path: 'users',
                component: users_admin_module_2.UserAdminComponent,
                children: [
                    { path: '', component: users_admin_module_2.UsersListComponent },
                    { path: ':id', component: users_admin_module_2.UserDetailComponent }
                ]
            },
            { path: 'units',
                component: units_admin_module_2.UnitAdminComponent,
                children: [
                    { path: '', component: units_admin_module_2.UnitsListComponent },
                    { path: ':id', component: units_admin_module_2.UnitDetailComponent }
                ]
            },
            { path: 'forms',
                component: forms_admin_module_2.FormAdminComponent,
                children: [
                    { path: '', component: forms_admin_module_2.FormsListComponent },
                    { path: ':id', component: forms_admin_module_2.FormDetailComponent }
                ]
            }
        ]
    }
];
var adminRoutingModule = router_1.RouterModule.forChild(routes);
var adminModule = (function () {
    function adminModule() {
    }
    adminModule = __decorate([
        core_1.NgModule({
            declarations: [
                admin_component_1.AdminComponent
            ],
            imports: [
                common_1.CommonModule,
                router_1.RouterModule,
                adminRoutingModule,
                news_admin_module_1.newsAdminModule,
                users_admin_module_1.usersAdminModule,
                units_admin_module_1.unitsAdminModule,
                forms_admin_module_1.formsAdminModule
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], adminModule);
    return adminModule;
}());
exports.adminModule = adminModule;
//# sourceMappingURL=admin.module.js.map
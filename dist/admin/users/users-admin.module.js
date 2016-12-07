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
const core_1 = require('@angular/core');
const common_1 = require('@angular/common');
const forms_1 = require('@angular/forms');
const router_1 = require('@angular/router');
const pipes_module_1 = require('./../../pipes/pipes.module');
const users_list_component_1 = require('./users-list.component');
exports.UsersListComponent = users_list_component_1.UsersListComponent;
const user_detail_component_1 = require('./user-detail.component');
exports.UserDetailComponent = user_detail_component_1.UserDetailComponent;
let UserAdminComponent = class UserAdminComponent {
};
UserAdminComponent = __decorate([
    core_1.Component({
        template: `<router-outlet></router-outlet>`
    }), 
    __metadata('design:paramtypes', [])
], UserAdminComponent);
exports.UserAdminComponent = UserAdminComponent;
let usersAdminModule = class usersAdminModule {
};
usersAdminModule = __decorate([
    core_1.NgModule({
        declarations: [
            UserAdminComponent,
            users_list_component_1.UsersListComponent,
            user_detail_component_1.UserDetailComponent
        ],
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            router_1.RouterModule,
            pipes_module_1.pipesModule
        ],
        exports: [
            UserAdminComponent,
            users_list_component_1.UsersListComponent,
            user_detail_component_1.UserDetailComponent
        ]
    }), 
    __metadata('design:paramtypes', [])
], usersAdminModule);
exports.usersAdminModule = usersAdminModule;
//# sourceMappingURL=users-admin.module.js.map
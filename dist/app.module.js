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
const platform_browser_1 = require('@angular/platform-browser');
const forms_1 = require('@angular/forms');
const http_1 = require('@angular/http');
const app_component_1 = require('./app.component');
const auth_service_1 = require('./services/auth.service');
const form_service_1 = require('./services/form.service');
const news_service_1 = require('./services/news.service');
const record_service_1 = require('./services/record.service');
const me_service_1 = require('./services/me.service');
const unit_service_1 = require('./services/unit.service');
const user_service_1 = require('./services/user.service');
const pipes_module_1 = require('./pipes/pipes.module');
const form_controls_module_1 = require('./controls/form-controls.module');
const custom_controls_module_1 = require('./controls/custom-controls.module');
const directives_module_1 = require('./directives/directives.module');
const navigation_module_1 = require('./navigation/navigation.module');
const news_module_1 = require('./news/news.module');
const forms_module_1 = require('./forms/forms.module');
const records_module_1 = require('./records/records.module');
const admin_module_1 = require('./admin/admin.module');
const app_routes_1 = require('./app.routes');
const app_config_1 = require('./app.config');
const ng_semantic_1 = require("ng-semantic");
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            app_routes_1.appRoutingModule,
            navigation_module_1.navigationModule,
            news_module_1.newsModule,
            forms_module_1.formsModule,
            records_module_1.recordsModule,
            admin_module_1.adminModule,
            pipes_module_1.pipesModule,
            form_controls_module_1.formControlsModule,
            custom_controls_module_1.customControlsModule,
            directives_module_1.directivesModule,
            ng_semantic_1.NgSemanticModule
        ],
        bootstrap: [app_component_1.AppComponent],
        providers: [
            auth_service_1.AuthService,
            form_service_1.FormService,
            news_service_1.NewsService,
            record_service_1.RecordService,
            me_service_1.MeService,
            unit_service_1.UnitService,
            user_service_1.UserService,
            { provide: 'app.config', useValue: app_config_1.config },
            { provide: 'app.debug', useValue: false },
        ]
    }), 
    __metadata('design:paramtypes', [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
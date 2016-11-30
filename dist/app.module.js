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
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var auth_service_1 = require("./services/auth.service");
var form_service_1 = require("./services/form.service");
var news_service_1 = require("./services/news.service");
var record_service_1 = require("./services/record.service");
var token_service_1 = require("./services/token.service");
var unit_service_1 = require("./services/unit.service");
var user_service_1 = require("./services/user.service");
var pipes_module_1 = require("./pipes/pipes.module");
var form_controls_module_1 = require("./controls/form-controls.module");
var custom_controls_module_1 = require("./controls/custom-controls.module");
var navigation_module_1 = require("./navigation/navigation.module");
var news_module_1 = require("./news/news.module");
var forms_module_1 = require("./forms/forms.module");
var records_module_1 = require("./records/records.module");
var admin_module_1 = require("./admin/admin.module");
var app_routes_1 = require("./app.routes");
var app_config_1 = require("./app.config");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
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
            custom_controls_module_1.customControlsModule
        ],
        bootstrap: [app_component_1.AppComponent],
        providers: [
            auth_service_1.AuthService,
            form_service_1.FormService,
            news_service_1.NewsService,
            record_service_1.RecordService,
            token_service_1.TokenService,
            unit_service_1.UnitService,
            user_service_1.UserService,
            { provide: 'app.config', useValue: app_config_1.config },
            { provide: 'app.debug', useValue: false },
        ]
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;
/*

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    provideRouter,
    AuthService,
    NewsService,
    TokenService,
    provideForms(),
    provide('app.config', {useValue: config}),
    provide('app.debug', {useValue: false})
]);

*/
//# sourceMappingURL=app.module.js.map
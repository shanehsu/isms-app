"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var app_component_1 = require('./app.component');
var app_config_1 = require('./app.config');
var auth_service_1 = require('./services/auth.service');
var news_service_1 = require('./services/news.service');
var token_service_1 = require('./services/token.service');
require('rxjs/add/operator/map');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    http_1.HTTP_PROVIDERS,
    router_1.ROUTER_PROVIDERS,
    auth_service_1.AuthService,
    news_service_1.NewsService,
    token_service_1.TokenService,
    core_1.provide('app.config', { useValue: app_config_1.config }),
    core_1.provide('app.debug', { useValue: false })
]);
//# sourceMappingURL=boot.js.map
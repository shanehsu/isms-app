System.register(['angular2/platform/browser', 'angular2/http', 'angular2/core', 'angular2/router', './app.component', './app.config', './services/auth.service', './services/news.service', './services/token.service', 'rxjs/Rx'], function(exports_1) {
    "use strict";
    var browser_1, http_1, core_1, router_1, app_component_1, app_config_1, auth_service_1, news_service_1, token_service_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (app_config_1_1) {
                app_config_1 = app_config_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (news_service_1_1) {
                news_service_1 = news_service_1_1;
            },
            function (token_service_1_1) {
                token_service_1 = token_service_1_1;
            },
            function (_1) {}],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent, [
                http_1.HTTP_PROVIDERS,
                router_1.ROUTER_PROVIDERS,
                auth_service_1.AuthService,
                news_service_1.NewsService,
                token_service_1.TokenService,
                core_1.provide('app.config', { useValue: app_config_1.config })
            ]);
        }
    }
});
//# sourceMappingURL=boot.js.map
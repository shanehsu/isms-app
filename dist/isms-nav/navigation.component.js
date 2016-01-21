System.register(['angular2/core', 'angular2/router'], function(exports_1) {
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
    var core_1, router_1;
    var NavigationComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            NavigationComponent = (function () {
                function NavigationComponent(_router, _config) {
                    this._router = _router;
                    this._config = _config;
                }
                NavigationComponent.prototype.ngOnInit = function () {
                    this.navigationItems = this._config.navigationItems;
                };
                NavigationComponent.prototype.navigate = function (item) {
                    this._router.navigate([item.component]);
                };
                NavigationComponent.prototype.isActive = function (item) {
                    return this._router.lastNavigationAttempt.startsWith(item.route);
                };
                NavigationComponent = __decorate([
                    core_1.Component({
                        selector: 'isms-nav',
                        templateUrl: '/app/isms-nav/navigation.template.html'
                    }),
                    __param(1, core_1.Inject('app.config')), 
                    __metadata('design:paramtypes', [router_1.Router, Object])
                ], NavigationComponent);
                return NavigationComponent;
            })();
            exports_1("NavigationComponent", NavigationComponent);
        }
    }
});
//# sourceMappingURL=navigation.component.js.map
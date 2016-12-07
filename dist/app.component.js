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
const router_1 = require('@angular/router');
const auth_service_1 = require('./services/auth.service');
let AppComponent = class AppComponent {
    constructor(authService, router, activatedRoute) {
        this.authService = authService;
        this.router = router;
        this.activatedRoute = activatedRoute;
    }
    ngOnInit() {
        this.activatedRoute.queryParams.subscribe((query) => {
            if (query.sso && query.token) {
                let withoutSSO = {};
                Object.apply(withoutSSO, query);
                delete withoutSSO.sso;
                delete withoutSSO.token;
                this.authService.authenticate_sso(query.token).then(_ => {
                    this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: withoutSSO });
                }).catch(err => {
                    this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: withoutSSO });
                });
            }
        });
    }
};
AppComponent = __decorate([
    core_1.Component({
        selector: 'isms-app',
        template: `
    <div class="ui container">
      <div class="ui fluid container" style="margin-top: 1em; margin-bottom: 2em;">
        <isms-nav></isms-nav>
      </div>
      <div class="ui container">
        <router-outlet></router-outlet>
      </div>
    </div>
    `
    }), 
    __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router, router_1.ActivatedRoute])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
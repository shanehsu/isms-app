System.register(['angular2/core', './../../../services/user.service', './../../../services/unit.service', './../../../pipes/unit-name.pipe', 'angular2/router'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, user_service_1, unit_service_1, unit_name_pipe_1, router_1;
    var UserDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (unit_service_1_1) {
                unit_service_1 = unit_service_1_1;
            },
            function (unit_name_pipe_1_1) {
                unit_name_pipe_1 = unit_name_pipe_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            UserDetailComponent = (function () {
                function UserDetailComponent(_router, _routeParams, _userService) {
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this._userService = _userService;
                }
                UserDetailComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._user = this._userService.emptyUser();
                    this._id = this._routeParams.get('id');
                    this._userService.get(this._id).then(function (user) { return _this._user = user[0]; }).catch(console.error);
                };
                UserDetailComponent.prototype.submit = function () {
                    var _this = this;
                    this._userService.update(this._user)
                        .then(function () { return _this._router.navigate(['UserList']); })
                        .catch(console.error);
                };
                UserDetailComponent.prototype.cancel = function () {
                    this._router.navigate(['UserList']);
                };
                UserDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'user-detail',
                        templateUrl: '/app/admin/user-admin/user-detail/user-detail.template.html',
                        pipes: [unit_name_pipe_1.UnitNamePipe],
                        providers: [user_service_1.UserService, unit_service_1.UnitService]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, user_service_1.UserService])
                ], UserDetailComponent);
                return UserDetailComponent;
            })();
            exports_1("UserDetailComponent", UserDetailComponent);
        }
    }
});
//# sourceMappingURL=user-detail.component.js.map
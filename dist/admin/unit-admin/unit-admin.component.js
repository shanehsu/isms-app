System.register(['angular2/core', 'angular2/router', './unit-list/unit-list.component', './unit-detail/unit-detail.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, unit_list_component_1, unit_detail_component_1;
    var UnitAdminComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (unit_list_component_1_1) {
                unit_list_component_1 = unit_list_component_1_1;
            },
            function (unit_detail_component_1_1) {
                unit_detail_component_1 = unit_detail_component_1_1;
            }],
        execute: function() {
            UnitAdminComponent = (function () {
                function UnitAdminComponent() {
                }
                UnitAdminComponent.prototype.ngOnInit = function () {
                };
                UnitAdminComponent = __decorate([
                    core_1.Component({
                        selector: 'unit-admin',
                        templateUrl: '/app/admin/unit-admin/unit-admin.template.html',
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/',
                            name: 'UnitList',
                            component: unit_list_component_1.UnitListComponent,
                            useAsDefault: true
                        },
                        {
                            path: '/:id',
                            name: 'UnitDetail',
                            component: unit_detail_component_1.UnitDetailComponent,
                        }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], UnitAdminComponent);
                return UnitAdminComponent;
            }());
            exports_1("UnitAdminComponent", UnitAdminComponent);
        }
    }
});
//# sourceMappingURL=unit-admin.component.js.map
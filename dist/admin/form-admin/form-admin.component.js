System.register(['angular2/core', 'angular2/router', './form-list/form-list.component', './form-detail/form-detail.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, form_list_component_1, form_detail_component_1;
    var FormAdminComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (form_list_component_1_1) {
                form_list_component_1 = form_list_component_1_1;
            },
            function (form_detail_component_1_1) {
                form_detail_component_1 = form_detail_component_1_1;
            }],
        execute: function() {
            FormAdminComponent = (function () {
                function FormAdminComponent() {
                }
                FormAdminComponent = __decorate([
                    core_1.Component({
                        selector: 'form-admin',
                        templateUrl: '/app/admin/form-admin/form-admin.template.html',
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/',
                            name: 'FormList',
                            component: form_list_component_1.FormListComponent,
                            useAsDefault: true
                        },
                        {
                            path: '/:id',
                            name: 'FormDetail',
                            component: form_detail_component_1.FormDetailComponent
                        }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], FormAdminComponent);
                return FormAdminComponent;
            })();
            exports_1("FormAdminComponent", FormAdminComponent);
        }
    }
});
//# sourceMappingURL=form-admin.component.js.map
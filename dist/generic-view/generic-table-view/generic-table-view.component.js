System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var GenericTableView;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            GenericTableView = (function () {
                function GenericTableView() {
                }
                GenericTableView.prototype.ngOnInit = function () {
                    var totalWidth = this.columnWidth.reduce(function (accu, current) { return accu + current; }, 0);
                    this.columnWidth.map(function (value) { return totalWidth * 100 / value; });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], GenericTableView.prototype, "columnWidth", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], GenericTableView.prototype, "headings", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], GenericTableView.prototype, "columnKey", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], GenericTableView.prototype, "data", void 0);
                GenericTableView = __decorate([
                    core_1.Component({
                        selector: 'generic-table-view',
                        templateUrl: '/app/generic-view/generic-table-view/generic-table-view.template.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], GenericTableView);
                return GenericTableView;
            })();
            exports_1("GenericTableView", GenericTableView);
        }
    }
});
//# sourceMappingURL=generic-table-view.component.js.map
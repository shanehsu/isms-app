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
var router_1 = require("@angular/router");
var record_service_1 = require("./../services/record.service");
var RecordComponent = (function () {
    function RecordComponent(route, recordService) {
        this.route = route;
        this.recordService = recordService;
    }
    RecordComponent.prototype.ngOnInit = function () {
        this.id = this.route.snapshot.params['id'];
        this.schema = undefined;
        this.record = undefined;
        // 載入資料
    };
    return RecordComponent;
}());
RecordComponent = __decorate([
    core_1.Component({
        template: "\n  <div><pre>{{id}}</pre></div>\n  <div><pre>{{schema | json}}</pre></div>\n  <div><pre>{{record | json}}</pre></div>\n  "
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, record_service_1.RecordService])
], RecordComponent);
exports.RecordComponent = RecordComponent;
//# sourceMappingURL=records.component.js.map
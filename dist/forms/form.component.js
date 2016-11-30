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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var form_service_1 = require("./../services/form.service");
var record_service_1 = require("./../services/record.service");
var router_1 = require("@angular/router");
var FormComponent = (function () {
    function FormComponent(formService, recordService, route, debug) {
        this.formService = formService;
        this.recordService = recordService;
        this.route = route;
        this.debug = debug;
    }
    FormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.data = [];
        this.id = this.route.snapshot.params['id'];
        this.fields = [];
        this.recordService.schema(this.id).then(function (fields) {
            var parsedFields = fields.map(function (field) {
                field.metadata = JSON.parse(field.metadata);
                return field;
            });
            _this.data = _this.recordService.emptyRecordForFields(parsedFields);
            _this.fields = parsedFields;
        }).catch(console.error);
    };
    FormComponent.prototype.submit = function () {
        this.recordService.upload(this.id, this.data).then(function (recordID) {
            console.dir("\u5DF2\u7D93\u5EFA\u7ACB\u7D00\u9304\uFF1A" + recordID);
        }).catch(function (err) {
            console.error('無法建立表單紀錄');
            console.error(err);
        });
    };
    return FormComponent;
}());
FormComponent = __decorate([
    core_1.Component({
        template: "<div class=\"container\">\n    <div *ngIf=\"fields\">\n      <form class=\"ui form\">\n        <form-fields [fields]=\"fields\" [(ngModel)]=\"data\" name=\"fields\"></form-fields>\n        <div style=\"margin-top: 1em; text-align: right;\">\n          <button type=\"button\" (click)=\"submit()\" class=\"ui yellow button\">\u9001\u51FA</button>\n        </div> \n      </form>\n      \n      <div class=\"ui raised segment\" *ngIf=\"true || debug\">\n        <h2 class=\"ui header\">\u9664\u932F\u8CC7\u8A0A</h2>\n        <h3 class=\"ui header\">\u6B04\u4F4D JSON</h3>\n        <pre>{{fields | json}}</pre>\n      </div>\n    </div>\n    <div class=\"ui raised segment\" *ngIf=\"!_nested && debug\">\n      <h2 class=\"card-title\">\u9664\u932F\u8CC7\u8A0A</h2>\n      <h3 class=\"card-subtitle text-muted\">\u8868\u55AE JSON</h3>\n      <pre>{{data | json}}</pre>\n    </div>\n  </div>"
    }),
    __param(3, core_1.Inject("app.debug")),
    __metadata("design:paramtypes", [form_service_1.FormService, record_service_1.RecordService, router_1.ActivatedRoute, Object])
], FormComponent);
exports.FormComponent = FormComponent;
//# sourceMappingURL=form.component.js.map
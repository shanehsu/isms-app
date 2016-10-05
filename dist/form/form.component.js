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
var form_fields_1 = require("./form-fields");
var FormComponent = (function () {
    function FormComponent(formService, recordService, routeSegment, debug) {
        this.formService = formService;
        this.recordService = recordService;
        this.routeSegment = routeSegment;
        this.debug = debug;
    }
    FormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._data = [];
        this.id = this.routeSegment.getParam('id');
        this._fields = [];
        this.recordService.schema(this.id).then(function (fields) {
            var parsedFields = fields.map(function (field) {
                field.metadata = JSON.parse(field.metadata);
                return field;
            });
            _this._data = _this.recordService.emptyRecordForFields(parsedFields);
            _this._fields = parsedFields;
        }).catch(console.error);
    };
    FormComponent.prototype.submit = function () {
        this.recordService.upload(this.id, this._data).then(function (recordID) {
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
        selector: 'isms-form',
        template: "<div class=\"container\">\n    <div *ngIf=\"_fields\">\n      <form class=\"ui form\">\n        <isms-form-fields [fields]=\"_fields\" [(ngModel)]=\"_data\"></isms-form-fields>\n        <div style=\"margin-top: 1em; text-align: right;\">\n          <button type=\"button\" (click)=\"submit()\" class=\"ui yellow button\">\u9001\u51FA</button>\n        </div> \n      </form>\n      \n      <div class=\"ui raised segment\" *ngIf=\"true || debug\">\n        <h2 class=\"ui header\">\u9664\u932F\u8CC7\u8A0A</h2>\n        <h3 class=\"ui header\">\u6B04\u4F4D JSON</h3>\n        <pre>{{_fields | json}}</pre>\n      </div>\n    </div>\n    <div class=\"ui raised segment\" *ngIf=\"!_nested && debug\">\n      <h2 class=\"card-title\">\u9664\u932F\u8CC7\u8A0A</h2>\n      <h3 class=\"card-subtitle text-muted\">\u8868\u55AE JSON</h3>\n      <pre>{{_data | json}}</pre>\n    </div>\n  </div>",
        providers: [form_service_1.FormService, record_service_1.RecordService],
        directives: [form_fields_1.FormFields],
        pipes: []
    }),
    __param(3, core_1.Inject("app.debug")),
    __metadata("design:paramtypes", [form_service_1.FormService, record_service_1.RecordService, typeof (_a = typeof router_1.RouteSegment !== "undefined" && router_1.RouteSegment) === "function" && _a || Object, Object])
], FormComponent);
exports.FormComponent = FormComponent;
var _a;
//# sourceMappingURL=form.component.js.map
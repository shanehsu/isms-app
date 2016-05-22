System.register(['angular2/core', './../services/form.service', './../services/record.service', './form-fields'], function(exports_1, context_1) {
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
    var core_1, form_service_1, record_service_1, form_fields_1;
    var FormIndexComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (form_service_1_1) {
                form_service_1 = form_service_1_1;
            },
            function (record_service_1_1) {
                record_service_1 = record_service_1_1;
            },
            function (form_fields_1_1) {
                form_fields_1 = form_fields_1_1;
            }],
        execute: function() {
            FormIndexComponent = (function () {
                function FormIndexComponent(_formService, _recordService) {
                    this._formService = _formService;
                    this._recordService = _recordService;
                }
                FormIndexComponent.prototype.refresh = function () {
                    var _this = this;
                    this._formService.forms()
                        .then(function (forms) { return _this._forms = forms; })
                        .catch(console.error);
                };
                FormIndexComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.refresh();
                    this._recordService.schema("573d508d31446ba0c7dd0bdc").then(function (fields) {
                        var parsedFields = fields.map(function (field) {
                            field.metadata = JSON.parse(field.metadata);
                            return field;
                        });
                        _this._data = _this._recordService.emptyRecordForFields(parsedFields);
                        _this._fields = parsedFields;
                    }).catch(console.error);
                };
                FormIndexComponent.prototype.fill = function (id) {
                };
                FormIndexComponent = __decorate([
                    core_1.Component({
                        selector: 'isms-form',
                        // templateUrl: '/app/isms-form/form-index.template.html',
                        template: "<div class=\"container\">\n    <div *ngIf=\"!_fields\">\n      <progress style=\"margin: 0 auto; width: 40%; min-width: 16em; max-width: 30em;\" class=\"progress progress-striped progress-success progress-animated\" value=\"100\" max=\"100\"></progress>\n    </div>\n    \n    <div *ngIf=\"_fields\">\n      <!-- \u8868\u55AE\u6B04\u4F4D\u8CC7\u8A0A\u8F09\u5165\u5B8C\u6210\uFF01 -->\n      <isms-form-fields [fields]=\"_fields\" [(ngModel)]=\"_data\"></isms-form-fields>\n      \n      \n      <!-- \u9664\u932F\u8CC7\u8A0A -->\n      <div class=\"card\">\n        <div class=\"card-block\">\n          <h4 class=\"card-title\">\u9664\u932F\u8CC7\u8A0A</h4>\n          <h6 class=\"card-subtitle text-muted\">\u6B04\u4F4D JSON</h6>\n        </div>\n        <div class=\"card-block\">\n          <pre class=\"card-text\">{{_fields | json}}</pre>\n        </div>\n      </div>\n    </div>\n    \n    \n  </div>",
                        providers: [form_service_1.FormService, record_service_1.RecordService],
                        directives: [core_1.forwardRef(function () { return form_fields_1.FormFields; }), core_1.forwardRef(function () { return form_fields_1.FormFieldsValueAccessor; })],
                        pipes: []
                    }), 
                    __metadata('design:paramtypes', [form_service_1.FormService, record_service_1.RecordService])
                ], FormIndexComponent);
                return FormIndexComponent;
            }());
            exports_1("FormIndexComponent", FormIndexComponent);
        }
    }
});
//# sourceMappingURL=form-index.component.js.map
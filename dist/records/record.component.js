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
function merge(schema, data) {
    for (var _i = 0, schema_1 = schema; _i < schema_1.length; _i++) {
        var field = schema_1[_i];
        for (var key in field) {
            if (key == 'metadata') {
                field.metadata = JSON.parse(field.metadata);
            }
        }
    }
    // 開始工作囉！
    if (schema.length != data.length) {
        console.error("\u5408\u4F75\u6B04\u4F4D\u8CC7\u6599\u8207\u6B04\u4F4D\u5F62\u5F0F\u7684\u6642\u5019\u767C\u751F\u932F\u8AA4\uFF0C\u8CC7\u6599\u6709 " + data.length + " \u500B\u6B04\u4F4D\uFF0C\u4F46\u662F\u5F62\u5F0F\u6709 " + data.length + " \u500B\u6B04\u4F4D\u3002");
        return [];
    }
    else {
        var merge_algorithm_1 = function (schema, data) {
            var getData = function (field, data) {
                switch (field.type) {
                    case 'shortText':
                    case 'longText':
                        return data;
                    case 'time':
                        var time = data;
                        return time.hour + " \u6642 " + time.minute + " \u5206";
                    case 'date':
                        var date = data;
                        return Intl.DateTimeFormat().format(new Date(date));
                    case 'options':
                        var optionData_1 = data;
                        var optionFieldDisplayData_1 = {
                            selectedValues: [],
                            nestedValues: []
                        };
                        var fieldMetadata_1 = field.metadata;
                        optionData_1.selected.forEach(function (value, index) {
                            if (value) {
                                optionFieldDisplayData_1.selectedValues.push(fieldMetadata_1.options[index].value);
                                var nestedFieldValues = optionData_1.values[index];
                                var metadatas = nestedFieldValues.map(function (nestedValue, nestedFieldIndex) {
                                    return merge_algorithm_1(fieldMetadata_1.options[index].fields[nestedFieldIndex], nestedValue);
                                });
                                optionFieldDisplayData_1.nestedValues.push(metadatas);
                            }
                        });
                        return optionFieldDisplayData_1;
                    case 'table':
                        var tableFieldData = data;
                        var tableFieldDisplayData_1 = {
                            titles: [],
                            values: []
                        };
                        var tableFieldMetadata_1 = field.metadata;
                        tableFieldDisplayData_1.titles = tableFieldMetadata_1.fields.map(function (field) { return field.name; });
                        tableFieldData.forEach(function (rowData, i) {
                            var row = [];
                            rowData.forEach(function (cellData, j) {
                                row.push(getData(tableFieldMetadata_1.fields[j], cellData));
                            });
                            tableFieldDisplayData_1.values.push(row);
                        });
                        return tableFieldDisplayData_1;
                }
            };
            return {
                title: schema.name,
                value: getData(schema, data)
            };
        };
        var metadata = [];
        for (var i = 0; i < schema.length; i++) {
            var tSchema = schema[0];
            var tData = data[0];
            metadata.push(merge_algorithm_1(tSchema, tData));
        }
        return metadata;
    }
}
var RecordComponent = (function () {
    function RecordComponent(route, recordService) {
        this.route = route;
        this.recordService = recordService;
        this.isSigning = false;
    }
    RecordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.id = this.route.snapshot.params['id'];
        this.schema = undefined;
        this.record = undefined;
        this.data = undefined;
        this.merged = undefined;
        // 載入資料
        this.recordService.record(this.id).then(function (record) {
            _this.recordService.schemaForRevision(record.form.id, record.revision.id).then(function (schema) {
                _this.schema = schema;
                _this.record = record;
                _this.data = record.data;
                _this.merged = merge(_this.schema, _this.data);
            });
        });
    };
    RecordComponent.prototype.canSign = function (signature) {
        if (signature.personnel.id == localStorage.getItem('userid') && !signature.signed) {
            return true;
        }
        return false;
    };
    RecordComponent.prototype.sign = function () {
        var _this = this;
        this.isSigning = true;
        this.recordService.sign(this.id).then(function () {
            _this.isSigning = false;
            _this.ngOnInit();
        });
    };
    return RecordComponent;
}());
RecordComponent = __decorate([
    core_1.Component({
        template: "\n  <h3 class=\"ui header\">ID</h3>\n  <div><pre>{{id | json}}</pre></div>\n  \n  <table id=\"record_display\" class=\"ui table\">\n    <tbody>\n      <tr *ngFor=\"let field of merged\">\n        <th>{{field.title}}</th>\n        <td>\n          <p *ngIf=\"field.value && !field.value.titles && !field.value.selectedValues\">{{field.value}}</p>\n          <p *ngIf=\"field.value.titles || field.value.titles\">\n            <record-data-display [(ngModel)]=\"field.value\"></record-data-display>\n          </p>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n  <h3 class=\"ui header\">\u7C3D\u6838\u72C0\u6CC1</h3>\n  <table class=\"ui table\">\n    <tbody>\n      <tr *ngIf=\"record && record.signatures\">\n        <td *ngFor=\"let signature of record.signatures\">\n          <div class=\"ui list\">\n            <div class=\"item\">\n              <i class=\"user icon\"></i>\n              <div class=\"content\">{{signature.personnel.name}}</div>\n            </div>\n            <div class=\"item\">\n              <i class=\"users icon\"></i>\n              <div class=\"content\">{{signature.unit}} \u7684 {{signature.role}}</div>\n            </div>\n            <div *ngIf=\"signature.signed\" class=\"item\">\n              <i class=\"calendar icon\"></i>\n              <div class=\"content\">{{signature.timestamp | date}}</div>\n            </div>\n            <button *ngIf=\"canSign(signature)\" type=\"button\" class=\"ui button\" (click)=\"sign()\" [class.loading]=\"isSigning\">\u7C3D\u7AE0</button>\n          </div>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n  \n  <h3 class=\"ui header\">Merged</h3>\n  <div><pre>{{merged | json}}</pre></div>\n  <h3 class=\"ui header\">Schema</h3>\n  <div><pre>{{schema | json}}</pre></div>\n  <h3 class=\"ui header\">Record</h3>\n  <div><pre>{{record | json}}</pre></div>\n  <h3 class=\"ui header\">Record Data</h3>\n  <div><pre>{{data | json}}</pre></div>\n  ",
        styles: [
            '#record_display th:first-child { width: 12em; }',
            '#record_display > tbody > tr { vertical-align: initial; }',
            '#record_display > tbody > tr > th { color: initial; }'
        ]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, record_service_1.RecordService])
], RecordComponent);
exports.RecordComponent = RecordComponent;
//# sourceMappingURL=record.component.js.map
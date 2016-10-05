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
// Angular 2
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var forms_1 = require("@angular/forms");
var record_service_1 = require("./../../services/record.service");
// THIS WILL NOT EMIT VALUE BY DEFAULT, NEED TO BIND TO (change) EVENT!
var TableFormControl = (function () {
    function TableFormControl(cd, recordService) {
        this.recordService = recordService;
        this._onChanged = function (_) { };
        this._onTouched = function () { };
        this.cd = cd;
        cd.valueAccessor = this;
    }
    // 與 Value Accessor 有關的
    // 從 Value Accessor 接收資料
    TableFormControl.prototype.writeValue = function (value) {
        this._dataModel = value;
    };
    TableFormControl.prototype.registerOnChange = function (fn) {
        this._onChanged = fn;
    };
    TableFormControl.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    TableFormControl.prototype.new = function () {
        this._dataModel.push(this.recordService.emptyRecordForFields(this._metadata.fields));
    };
    return TableFormControl;
}());
__decorate([
    core_1.Input('metadata'),
    __metadata("design:type", Object)
], TableFormControl.prototype, "_metadata", void 0);
TableFormControl = __decorate([
    core_1.Component({
        selector: 'form-control[type=table]',
        template: "\n  <table class=\"ui celled striped table\">\n    <thead>\n      <tr>\n        <th style=\"width: 3em; text-align: right;\">#</th>\n        <th *ngFor=\"let item of _metadata.fields\">{{item.name}}</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr *ngFor=\"let record of _dataModel; let recordIndex = index\">\n        <td style=\"text-align: right;\">{{recordIndex + 1}}</td>\n        <td *ngFor=\"let item of _metadata.fields; let fieldIndex = index\">\n          <template [ngIf]=\"item.type == 'shortText'\">\n            <div class=\"field\">\n              <form-control type=\"text\" row=\"single\" [(ngModel)]=\"_dataModel[recordIndex][fieldIndex]\"></form-control>\n            </div>\n          </template>\n          \n          <template [ngIf]=\"item.type == 'longText'\">\n            <div class=\"field\">\n              <form-control type=\"text\" row=\"multi\" [(ngModel)]=\"_dataModel[recordIndex][fieldIndex]\"></form-control>\n            </div>\n          </template>\n          \n          <template [ngIf]=\"item.type == 'date'\">\n            <div class=\"field\">\n              <form-control type=\"date\" [(ngModel)]=\"_dataModel[recordIndex][fieldIndex]\"></form-control>\n            </div>\n          </template>\n          \n          <template [ngIf]=\"item.type == 'time'\">\n            <div class=\"field\">\n              <form-control type=\"time\" [(ngModel)]=\"_dataModel[recordIndex][fieldIndex]\"></form-control>\n            </div>\n          </template>\n          \n          <template [ngIf]=\"item.type == 'options'\">\n            <template [ngIf]=\"item.metadata.presentation == 'radio'\">\n              <div class=\"field\">\n                <form-control type=\"options\" presentation=\"single\" [metadata]=\"item.metadata\" [(ngModel)]=\"_dataModel[recordIndex][fieldIndex]\"></form-control>\n              </div>\n            </template>\n            <template [ngIf]=\"item.metadata.presentation == 'checkbox'\">\n              <div class=\"field\">\n                <form-control type=\"options\" presentation=\"multi\" [metadata]=\"item.metadata\" [(ngModel)]=\"_dataModel[recordIndex][fieldIndex]\"></form-control>\n              </div>\n            </template>\n            <template [ngIf]=\"item.metadata.presentation == 'select'\">\n              <div class=\"field\">\n                <form-control type=\"options\" presentation=\"dropdown\" [metadata]=\"item.metadata\" [(ngModel)]=\"_dataModel[recordIndex][fieldIndex]\"></form-control>\n              </div>\n            </template>\n          </template>\n          \n          <template [ngIf]=\"item.type == 'table'\">\n            <div class=\"field\">\n              <form-control type=\"table\" [metadata]=\"item.metadata\" [(ngModel)]=\"_dataModel[recordIndex][fieldIndex]\"></form-control>\n            </div>\n          </template>\n        </td>\n      </tr>\n    </tbody>\n    <tfoot class=\"full-width\">\n      <tr>\n        <th [attr.colspan]=\"_metadata.fields.length + 1\">\n          <button type=\"button\" class=\"ui right floated blue labeled icon button\" (click)=\"new()\">\n            <i class=\"plus icon\"></i>\n            \u65B0\u589E\u4E00\u7B46\u8CC7\u6599\n          </button>\n        </th>\n      </tr>\n    </tfoot>\n  </table>"
    }),
    __param(0, core_2.Self()),
    __metadata("design:paramtypes", [forms_1.NgModel, record_service_1.RecordService])
], TableFormControl);
exports.TableFormControl = TableFormControl;
//# sourceMappingURL=table-form-control.js.map
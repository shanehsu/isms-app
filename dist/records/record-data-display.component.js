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
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var RecordDataDisplay = (function () {
    function RecordDataDisplay(model) {
        this.model = model;
        model.valueAccessor = this;
        this.value = undefined;
    }
    RecordDataDisplay.prototype.writeValue = function (value) {
        this.value = value;
    };
    // ControlValueAccessor - 註冊函數
    RecordDataDisplay.prototype.registerOnChange = function (fn) {
        this.change = fn;
    };
    RecordDataDisplay.prototype.registerOnTouched = function (fn) {
        this.touched = fn;
    };
    RecordDataDisplay = __decorate([
        core_1.Component({
            selector: 'record-data-display',
            template: "\n  <div *ngIf=\"value && value.selectedValues\">\n    <div *ngFor=\"let selectedValue of value.selectedValues; let i = index;\">\n      <p>{{selectedValue}}</p>\n      <div class=\"sub-fields\">\n        <div *ngFor=\"let nestedValue of value.nestedValues[i]; let j = index;\">\n          {{nestedValue.title}}\n          <record-data-display [(ngModel)]=\"value.nestedValues[i][j].value\"></record-data-display>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div *ngIf=\"value && value.titles\">\n    <table class=\"ui compact basic table\">\n      <thead>\n        <tr>\n          <td *ngFor=\"let title of value.titles\">{{title}}</td>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor=\"let _ of value.values; let i = index;\">\n          <td *ngFor=\"let _ of value.values[i]; let j = index;\">\n            <record-data-display [(ngModel)]=\"value.values[i][j]\"></record-data-display>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n  <p *ngIf=\"value && !value.titles && !value.selectedValues\">{{value}}</p>\n  ",
            styles: [
                'div.sub-fields { padding-left: 1em; }'
            ]
        }),
        __param(0, core_1.Self()), 
        __metadata('design:paramtypes', [forms_1.NgModel])
    ], RecordDataDisplay);
    return RecordDataDisplay;
}());
exports.RecordDataDisplay = RecordDataDisplay;
//# sourceMappingURL=record-data-display.component.js.map
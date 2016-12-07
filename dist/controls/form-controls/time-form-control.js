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
const core_1 = require('@angular/core');
const core_2 = require('@angular/core');
const forms_1 = require('@angular/forms');
let TimeFormControl = class TimeFormControl {
    constructor(cd) {
        this._onChanged = (_) => { };
        this._onTouched = () => { };
        this.cd = cd;
        cd.valueAccessor = this;
        this._editing = false;
    }
    // 與 Value Accessor 有關的
    // 從 Value Accessor 接收資料
    writeValue(value) {
        if (!value) {
            this._dataModel = {
                hour: 0,
                minute: 0
            };
        }
        else {
            this._dataModel = value;
        }
    }
    edit() {
        // 進入編輯模式
        this._editing = true;
    }
    doneEdit() {
        this._editing = false;
    }
    validate(hour, minute) {
        // 檢查是否有任何一個是非數字
        if (!(hour.valueAsNumber >= 0 && hour.valueAsNumber <= 23)) {
            hour.value = "0";
        }
        if (!(minute.valueAsNumber >= 0 && minute.valueAsNumber <= 59)) {
            minute.value = "0";
        }
        this._onChanged(this._dataModel);
    }
    registerOnChange(fn) {
        this._onChanged = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
};
TimeFormControl = __decorate([
    core_1.Component({
        selector: 'form-control[type=time]',
        template: `<a *ngIf="!_editing" class="link" (click)="edit()">{{_dataModel.hour + ' 時 ' + _dataModel.minute + ' 分'}}</a>
  <div class="inline fields" *ngIf="_editing">
    <input type="number" style="width: 5em; text-align: center;" [(ngModel)]="_dataModel.hour" min="0" max="23" (blur)="_onTouched()" (change)="validate(hour, minute)" #hour>
    <label style="margin: 0 0.5em 0 0.5em;">時</label>
    <input type="number" style="width: 5em; text-align: center;" [(ngModel)]="_dataModel.minute" min="0" max="59" (blur)="_onTouched()" (change)="validate(hour, minute)" #minute>
    <label style="margin: 0 0.5em 0 0.5em;">分</label>
    <a class="link" (click)="doneEdit()">完成</a>
  </div>`
    }),
    __param(0, core_2.Self()), 
    __metadata('design:paramtypes', [forms_1.NgModel])
], TimeFormControl);
exports.TimeFormControl = TimeFormControl;
//# sourceMappingURL=time-form-control.js.map
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
const util_1 = require('./../../util');
let MultiOptionsFormControl = class MultiOptionsFormControl {
    constructor(cd) {
        this._onChanged = (_) => { };
        this._onTouched = () => { };
        this.cd = cd;
        this._uid = util_1.RandomString(10);
        cd.valueAccessor = this;
    }
    ngAfterViewInit() {
        $('div#' + this._uid + ' .ui.checkbox').checkbox();
    }
    // 與 Value Accessor 有關的
    // 從 Value Accessor 接收資料
    writeValue(value) {
        if (!value) {
            this._dataModel = this._metadata && this._metadata.options ? this._metadata.options.map(() => { }) : {};
        }
        else {
            this._dataModel = value;
        }
    }
    select(index) {
        this._dataModel.selected[index] = !this._dataModel.selected[index];
        this._onChanged(this._dataModel);
    }
    registerOnChange(fn) {
        this._onChanged = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
};
__decorate([
    core_1.Input('metadata'), 
    __metadata('design:type', Object)
], MultiOptionsFormControl.prototype, "_metadata", void 0);
MultiOptionsFormControl = __decorate([
    core_1.Component({
        selector: 'form-control[type=options][presentation=multi]',
        template: `
  <div [id]="_uid" class="grouped fields">
    <template ngFor let-item [ngForOf]="_metadata.options" let-i="index">
      <div class="field">
        <div class="ui checkbox">
          <input [name]="_uid" type="checkbox" (change)="select(i)" [checked]="_dataModel.selected && _dataModel.selected[i]">
          <label>{{item.value}}</label>
        </div>
      </div>
      <div style="margin-left: 4em;" *ngIf="_dataModel.selected && _dataModel.selected[i]">
        <form-fields [nested]="true" [fields]="_metadata.options[i].fields" [(ngModel)]="_dataModel.values[i]"></form-fields>
      </div>
    </template>
  </div>`
    }),
    __param(0, core_2.Self()), 
    __metadata('design:paramtypes', [forms_1.NgModel])
], MultiOptionsFormControl);
exports.MultiOptionsFormControl = MultiOptionsFormControl;
//# sourceMappingURL=multi-options-form-control.js.map
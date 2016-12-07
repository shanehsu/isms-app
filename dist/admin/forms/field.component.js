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
const forms_1 = require('@angular/forms');
// 服務
const form_service_1 = require('./../../services/form.service');
const util_1 = require('./../../util');
let FieldComponent = class FieldComponent {
    // 建構子：服務
    constructor(model, _formService, fieldTypes) {
        this.model = model;
        this._formService = _formService;
        this.fieldTypes = fieldTypes;
        // 事件：更新或是刪除一個欄位
        this.reload = new core_1.EventEmitter();
        this.update = new core_1.EventEmitter();
        this.delete = new core_1.EventEmitter();
        model.valueAccessor = this;
    }
    // 生命週期
    ngOnInit() {
        this.field = {};
        this.isUpdating = false;
        this.isDeleting = false;
        this.isCollapsed = false;
        this._radioUID = util_1.RandomString(10);
        if (this.shouldShowUpdateButton == undefined) {
            this.shouldShowUpdateButton = true;
        }
    }
    ngAfterViewInit() {
        $('div#' + this._radioUID + ' .ui.radio.checkbox').checkbox();
    }
    writeValue(value) {
        this.field = value;
    }
    // 按鈕動作：更新與刪除
    reloadField() {
        this.isReloading = true;
        this.reload.emit(() => { this.isReloading = false; });
    }
    updateField() {
        this.isUpdating = true;
        this.update.emit(() => { this.isUpdating = false; });
    }
    deleteField() {
        this.isDeleting = true;
        this.delete.emit(null);
    }
    // 按鈕動作：展開、收合
    toggleCollapse() {
        this.isCollapsed = !this.isCollapsed;
    }
    // ControlValueAccessor - 註冊函數
    registerOnChange(fn) {
        this.change = fn;
    }
    registerOnTouched(fn) {
        this.touched = fn;
    }
    emitValue() {
        this.change(this.field);
    }
};
__decorate([
    core_1.Input('update-button'), 
    __metadata('design:type', Boolean)
], FieldComponent.prototype, "shouldShowUpdateButton", void 0);
__decorate([
    core_1.Output('reload'), 
    __metadata('design:type', Object)
], FieldComponent.prototype, "reload", void 0);
__decorate([
    core_1.Output('update'), 
    __metadata('design:type', Object)
], FieldComponent.prototype, "update", void 0);
__decorate([
    core_1.Output('delete'), 
    __metadata('design:type', Object)
], FieldComponent.prototype, "delete", void 0);
FieldComponent = __decorate([
    core_1.Component({
        selector: 'field',
        template: `
  <a class="link" style="float: right; position: relative; z-index: 1;" (click)="toggleCollapse()">展開／收合此欄位</a>
  <div [style.display]="isCollapsed ? 'initial' : 'none'">
    <p>名稱：{{field.name}}</p>
    <p>類型：{{field.type | fieldType}}</p>
  </div>
  <form class="ui form" (ngSubmit)="updateField()" #fieldForm="ngForm" [style.display]="isCollapsed ? 'none' : 'initial'">
    <div class="field" style="clear: none;">
      <label>ID</label>
      <p>{{field._id}}</p>
    </div>
    <div class="field">
      <label>名稱</label>
      <input type="text" [(ngModel)]="field.name" name="name" (change)="emitValue()" required>
    </div>
    <div class="field">
      <label>類型</label>
      <div class="inline fields" [id]="_radioUID">
        <div class="field" *ngFor="let fieldType of fieldTypes">
          <div class="ui radio checkbox">
            <input type="radio" name="typeRadio" [value]="fieldType.value" [checked]="field.type == fieldType.value" (change)="field.type = fieldType.value; emitValue();">
            <label>{{fieldType.label}}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="field">
      <label>提醒文字</label>
      <input type="text" [(ngModel)]="field.hint" name="hint" (change)="emitValue()">
    </div>
    
    <field-metadata *ngIf="field.type != 'table' && field.type != 'options'" type="empty" [(ngModel)]="field.metadata" name="metadata"></field-metadata>
    <field-metadata *ngIf="field.type == 'options'" type="options" [(ngModel)]="field.metadata" name="metadata"></field-metadata>
    <field-metadata *ngIf="field.type == 'table'" type="table" [(ngModel)]="field.metadata" name="metadata"></field-metadata>
    
    <div style="text-align: right;">
      <button type="button" class="ui yellow basic button" *ngIf="shouldShowUpdateButton" (click)="reloadField()" [class.loading]="isReloading">重新載入</button>
      <button type="button" class="ui red basic button" (click)="deleteField()" [class.loading]="isDeleting">刪除</button>
      <button type="submit" class="ui basic button" *ngIf="shouldShowUpdateButton" [class.green]="fieldForm.form.valid" [class.red]="!fieldForm.form.valid"
        [disabled]="!fieldForm.form.valid" [class.loading]="isUpdating">更新</button>
    </div>
  </form>
  `
    }),
    __param(0, core_1.Self()),
    __param(2, core_1.Inject('fieldTypes')), 
    __metadata('design:paramtypes', [forms_1.NgModel, form_service_1.FormService, Array])
], FieldComponent);
exports.FieldComponent = FieldComponent;
//# sourceMappingURL=field.component.js.map
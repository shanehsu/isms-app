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
// 子元件
const field_component_1 = require('./field.component');
// 輔助函數
const util_1 = require('./../../util');
let OptionsPresentationTypes = [
    {
        label: '單選',
        value: 'radio'
    },
    {
        label: '多選',
        value: 'checkbox'
    },
    {
        label: '下拉式',
        value: 'select'
    }
];
function cloneTableFieldMetadata(metadata) {
    return jQuery.extend(true, {}, metadata);
}
function cloneOptionFieldMetadata(metadata) {
    return jQuery.extend(true, {}, metadata);
}
let EmptyFieldMetadataComponent = class EmptyFieldMetadataComponent {
    // 建構子
    constructor(model) {
        this.model = model;
        model.valueAccessor = this;
    }
    writeValue(value) {
        // Discard any value written as it is not important anyway
        if (value) {
            // If something is written, we need to emit {} as there is no associated metadata
            if (this.change)
                this.change({});
        }
    }
    registerOnChange(fn) {
        this.change = fn;
    }
    registerOnTouched(fn) { }
};
EmptyFieldMetadataComponent = __decorate([
    core_1.Component({
        selector: 'field-metadata[type=empty]',
        template: ``
    }),
    __param(0, core_1.Self()), 
    __metadata('design:paramtypes', [forms_1.NgModel])
], EmptyFieldMetadataComponent);
exports.EmptyFieldMetadataComponent = EmptyFieldMetadataComponent;
let OptionFieldMetadataComponent = class OptionFieldMetadataComponent {
    // 建構子
    constructor(model, elementRef) {
        this.model = model;
        this.elementRef = elementRef;
        this.presentationTypes = OptionsPresentationTypes;
        this.areOptionsCollapsed = false;
        this.newOptionName = "";
        model.valueAccessor = this;
        this.metadata = {
            presentation: 'radio',
            options: []
        };
    }
    ngAfterViewInit() {
        $(this.elementRef.nativeElement).find('.ui.radio.checkbox').checkbox();
    }
    // ControlValueAccessor - 註冊函數
    registerOnChange(fn) {
        this.change = fn;
    }
    registerOnTouched(fn) {
        this.touched = fn;
    }
    // ControlValueAccessor - 接收資料
    writeValue(value) {
        if (value && value.options && value.presentation) {
            this.metadata = value;
            this.cachedMetadata = cloneOptionFieldMetadata(this.metadata);
        }
        else {
            this.metadata = {
                presentation: 'radio',
                options: []
            };
            if (this.change)
                this.emitValue();
        }
    }
    // 利用回呼函式送出資料
    emitValue() {
        this.change(this.metadata);
    }
    // 選項
    pushOption() {
        this.metadata.options.push({
            id: util_1.RandomString(10),
            value: this.newOptionName,
            fields: []
        });
        this.emitValue();
        this.newOptionName = "";
    }
    pullOption(option) {
        this.metadata.options.splice(this.metadata.options.indexOf(option), 1);
        this.emitValue();
    }
    // 子欄位處理
    createField(option) {
        option.fields.push({
            _id: util_1.RandomString(10),
            name: '欄位名稱',
            type: 'shortText',
            hint: '',
            metadata: undefined
        });
    }
    deleteField(option, field) {
        option.fields.splice(option.fields.indexOf(field), 1);
    }
};
OptionFieldMetadataComponent = __decorate([
    core_1.Component({
        selector: 'field-metadata[type=options]',
        template: `
  <div class="field">
    <label>表示方式</label>
    <div class="inline fields">
      <div class="field" *ngFor="let _ of presentationTypes; let i = index;">
        <div class="ui radio checkbox">
          <input type="radio" name="presentationType" [checked]="metadata.presentation == presentationTypes[i].value" (change)="metadata.presentation = presentationTypes[i].value; emitValue();">
          <label>{{presentationTypes[i].label}}</label>
        </div>
      </div>
    </div>
  </div>
  <div class="field">
    <label>選項</label>
  </div>
  <div style="overflow: auto;">
    <div style="float: right;">
      <a class="link" (click)="areOptionsCollapsed = !areOptionsCollapsed">展開／收合選項</a>
    </div>
  </div>
  <div class="ui segments" style="margin-bottom: 1em;">
    <template ngFor [ngForOf]="metadata.options" let-i="index" let-odd="odd">
      <!-- 選項 -->
      <!-- 展開狀態 -->
      <div class="ui segment" [class.secondary]="odd" *ngIf="!areOptionsCollapsed">
        <div class="field">
          <label>ID</label>
          <p>{{metadata.options[i].id}}</p>
        </div>
        <text-input editable [label]="'選項'" [(ngModel)]="metadata.options[i].value"></text-input>
        
        <!-- 子欄位 -->
        <div style="overflow: auto;" class="field">
          <label>子欄位</label>
        </div>
        <div class="ui segments">
          <div class="ui segment" *ngFor="let _ of metadata.options[i].fields; let j = index; let odd = odd;" [class.secondary]="odd">
            <field [(ngModel)]="metadata.options[i].fields[j]" [update-button]="false" (delete)="deleteField(metadata.options[i], metadata.options[i].fields[j])" [ngModelOptions]="{standalone: true}"></field>
          </div>
          <div class="ui segment" style="text-align: center;" [class.secondary]="metadata.options[i].fields.length % 2 == 1">
            <button type="button" class="ui green button" (click)="createField(metadata.options[i])">增加欄位</button>
          </div>
        </div>
        
        <div style="text-align: right;">
          <button type="button" class="ui red button"(click)="pullOption(metadata.options[i])">刪除選項</button>
        </div>
      </div>
      
      <!-- 收合狀態 -->
      <div class="ui segment" [class.secondary]="odd" *ngIf="areOptionsCollapsed">
        {{metadata.options[i].value}}
      </div>
    </template>
    
    <!-- 新增選項 -->
    <div class="ui segment" style="overflow: auto;" [class.secondary]="metadata.options.length % 2 == 1">
      <div class="inline fields" style="float: right; margin-bottom: 0;">
        <label>新選項</label>
        <div class="field">
          <input type="text" [(ngModel)]="newOptionName" />
        </div>
        <button type="button" class="ui button" (click)="pushOption()">新增</button>
      </div>
    </div>
  </div>`
    }),
    __param(0, core_1.Self()), 
    __metadata('design:paramtypes', [forms_1.NgModel, core_1.ElementRef])
], OptionFieldMetadataComponent);
exports.OptionFieldMetadataComponent = OptionFieldMetadataComponent;
let TableFieldMetadataComponent = class TableFieldMetadataComponent {
    // 建構子
    constructor(model) {
        this.model = model;
        model.valueAccessor = this;
        this.metadata = {
            fields: []
        };
    }
    // 初始化
    ngOnInit() {
        this.isUpdating = false;
        this.modalID = util_1.RandomString(10);
        this.isCollapsed = false;
        this.areFieldsCollapsed = false;
    }
    ngAfterViewInit() {
    }
    // 按鈕
    toggleCollapse() {
        this.isCollapsed = !this.isCollapsed;
    }
    toggleFieldsCollapse() {
        let expectedState = !this.areFieldsCollapsed;
        this.fieldFormComponents.forEach(fieldFormComponent => {
            fieldFormComponent.isCollapsed = expectedState;
        });
        this.areFieldsCollapsed = expectedState;
    }
    reset() {
        this.metadata = this.cachedMetadata;
        this.change(this.metadata);
    }
    createField() {
        this.metadata.fields.push({
            _id: util_1.RandomString(10),
            name: '欄位名稱',
            type: 'shortText',
            hint: '',
            metadata: undefined
        });
        this.emitValue();
    }
    deleteField(field) {
        this.metadata.fields.splice(this.metadata.fields.indexOf(field), 1);
        this.emitValue();
    }
    // ControlValueAccessor 寫入值
    writeValue(value) {
        // 判斷是否是正確的 metadata
        if (value && value.fields) {
            this.metadata = value;
            this.cachedMetadata = cloneTableFieldMetadata(this.metadata);
        }
        else {
            this.metadata = {
                fields: []
            };
            if (this.change)
                this.emitValue();
        }
    }
    // ControlValueAccessor - 註冊函數
    registerOnChange(fn) {
        this.change = fn;
    }
    registerOnTouched(fn) {
        this.touched = fn;
    }
    emitValue() {
        this.change(this.metadata);
    }
};
__decorate([
    core_1.ViewChildren(core_1.forwardRef(() => field_component_1.FieldComponent)), 
    __metadata('design:type', core_1.QueryList)
], TableFieldMetadataComponent.prototype, "fieldFormComponents", void 0);
TableFieldMetadataComponent = __decorate([
    core_1.Component({
        selector: 'field-metadata[type=table]',
        template: `
  <div class="field">
    <label>欄位</label>
  </div>
  <div style="overflow: auto;">
    <div style="float: right;">
      <a class="link" (click)="toggleFieldsCollapse()">展開／收合表格欄位</a>
      <!-- <a class="link" (click)="toggleCollapse()">顯示／隱藏設定</a> -->
    </div>
  </div>
  <div class="ui segments" style="margin-bottom: 1em;" [style.display]="isCollapsed ? 'none' : undefined">
    <div class="ui segment" *ngFor="let _ of metadata.fields; let i = index; let coloring = odd;" [class.secondary]="coloring">
      <field [(ngModel)]="metadata.fields[i]" [update-button]="false" (delete)="deleteField(metadata.fields[i])" [ngModelOptions]="{standalone: true}"></field>
    </div>
    <div class="ui segment">
      <button type="button" class="ui teal button" (click)="createField()">增加表格欄位</button>
      <button type="button" class="ui red button" (click)="reset()">重置</button>
    </div>
  </div>`
    }),
    __param(0, core_1.Self()), 
    __metadata('design:paramtypes', [forms_1.NgModel])
], TableFieldMetadataComponent);
exports.TableFieldMetadataComponent = TableFieldMetadataComponent;
//# sourceMappingURL=field-metadata.component.js.map
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
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
// 子元件
var field_component_1 = require('./field.component');
// 輔助函數
var util_1 = require('./../../util');
var OptionsPresentationTypes = [
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
var EmptyFieldMetadataComponent = (function () {
    // 建構子
    function EmptyFieldMetadataComponent(model) {
        this.model = model;
        model.valueAccessor = this;
    }
    EmptyFieldMetadataComponent.prototype.writeValue = function (value) {
        // Discard any value written as it is not important anyway
        if (value) {
            // If something is written, we need to emit {} as there is no associated metadata
            if (this.change)
                this.change({});
        }
    };
    EmptyFieldMetadataComponent.prototype.registerOnChange = function (fn) {
        this.change = fn;
    };
    EmptyFieldMetadataComponent.prototype.registerOnTouched = function (fn) { };
    EmptyFieldMetadataComponent = __decorate([
        core_1.Component({
            selector: 'field-metadata[type=empty]',
            template: ""
        }),
        __param(0, core_1.Self()), 
        __metadata('design:paramtypes', [forms_1.NgModel])
    ], EmptyFieldMetadataComponent);
    return EmptyFieldMetadataComponent;
}());
exports.EmptyFieldMetadataComponent = EmptyFieldMetadataComponent;
var OptionFieldMetadataComponent = (function () {
    // 建構子
    function OptionFieldMetadataComponent(model, elementRef) {
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
    OptionFieldMetadataComponent.prototype.ngAfterViewInit = function () {
        $(this.elementRef.nativeElement).find('.ui.radio.checkbox').checkbox();
    };
    // ControlValueAccessor - 註冊函數
    OptionFieldMetadataComponent.prototype.registerOnChange = function (fn) {
        this.change = fn;
    };
    OptionFieldMetadataComponent.prototype.registerOnTouched = function (fn) {
        this.touched = fn;
    };
    // ControlValueAccessor - 接收資料
    OptionFieldMetadataComponent.prototype.writeValue = function (value) {
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
    };
    // 利用回呼函式送出資料
    OptionFieldMetadataComponent.prototype.emitValue = function () {
        this.change(this.metadata);
    };
    // 選項
    OptionFieldMetadataComponent.prototype.pushOption = function () {
        this.metadata.options.push({
            id: util_1.RandomString(10),
            value: this.newOptionName,
            fields: []
        });
        this.emitValue();
        this.newOptionName = "";
    };
    OptionFieldMetadataComponent.prototype.pullOption = function (option) {
        this.metadata.options.splice(this.metadata.options.indexOf(option), 1);
        this.emitValue();
    };
    // 子欄位處理
    OptionFieldMetadataComponent.prototype.createField = function (option) {
        option.fields.push({
            _id: util_1.RandomString(10),
            name: '欄位名稱',
            type: 'shortText',
            hint: '',
            metadata: undefined
        });
    };
    OptionFieldMetadataComponent.prototype.deleteField = function (option, field) {
        option.fields.splice(option.fields.indexOf(field), 1);
    };
    OptionFieldMetadataComponent = __decorate([
        core_1.Component({
            selector: 'field-metadata[type=options]',
            template: "\n  <div class=\"field\">\n    <label>\u8868\u793A\u65B9\u5F0F</label>\n    <div class=\"inline fields\">\n      <div class=\"field\" *ngFor=\"let _ of presentationTypes; let i = index;\">\n        <div class=\"ui radio checkbox\">\n          <input type=\"radio\" name=\"presentationType\" [checked]=\"metadata.presentation == presentationTypes[i].value\" (change)=\"metadata.presentation = presentationTypes[i].value; emitValue();\">\n          <label>{{presentationTypes[i].label}}</label>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"field\">\n    <label>\u9078\u9805</label>\n  </div>\n  <div style=\"overflow: auto;\">\n    <div style=\"float: right;\">\n      <a class=\"link\" (click)=\"areOptionsCollapsed = !areOptionsCollapsed\">\u5C55\u958B\uFF0F\u6536\u5408\u9078\u9805</a>\n    </div>\n  </div>\n  <div class=\"ui segments\" style=\"margin-bottom: 1em;\">\n    <template ngFor [ngForOf]=\"metadata.options\" let-i=\"index\" let-odd=\"odd\">\n      <!-- \u9078\u9805 -->\n      <!-- \u5C55\u958B\u72C0\u614B -->\n      <div class=\"ui segment\" [class.secondary]=\"odd\" *ngIf=\"!areOptionsCollapsed\">\n        <div class=\"field\">\n          <label>ID</label>\n          <p>{{metadata.options[i].id}}</p>\n        </div>\n        <text-input editable [label]=\"'\u9078\u9805'\" [(ngModel)]=\"metadata.options[i].value\"></text-input>\n        \n        <!-- \u5B50\u6B04\u4F4D -->\n        <div style=\"overflow: auto;\" class=\"field\">\n          <label>\u5B50\u6B04\u4F4D</label>\n        </div>\n        <div class=\"ui segments\">\n          <div class=\"ui segment\" *ngFor=\"let _ of metadata.options[i].fields; let j = index; let odd = odd;\" [class.secondary]=\"odd\">\n            <field [(ngModel)]=\"metadata.options[i].fields[j]\" [update-button]=\"false\" (delete)=\"deleteField(metadata.options[i], metadata.options[i].fields[j])\" [ngModelOptions]=\"{standalone: true}\"></field>\n          </div>\n          <div class=\"ui segment\" style=\"text-align: center;\" [class.secondary]=\"metadata.options[i].fields.length % 2 == 1\">\n            <button type=\"button\" class=\"ui green button\" (click)=\"createField(metadata.options[i])\">\u589E\u52A0\u6B04\u4F4D</button>\n          </div>\n        </div>\n        \n        <div style=\"text-align: right;\">\n          <button type=\"button\" class=\"ui red button\"(click)=\"pullOption(metadata.options[i])\">\u522A\u9664\u9078\u9805</button>\n        </div>\n      </div>\n      \n      <!-- \u6536\u5408\u72C0\u614B -->\n      <div class=\"ui segment\" [class.secondary]=\"odd\" *ngIf=\"areOptionsCollapsed\">\n        {{metadata.options[i].value}}\n      </div>\n    </template>\n    \n    <!-- \u65B0\u589E\u9078\u9805 -->\n    <div class=\"ui segment\" style=\"overflow: auto;\" [class.secondary]=\"metadata.options.length % 2 == 1\">\n      <div class=\"inline fields\" style=\"float: right; margin-bottom: 0;\">\n        <label>\u65B0\u9078\u9805</label>\n        <div class=\"field\">\n          <input type=\"text\" [(ngModel)]=\"newOptionName\" />\n        </div>\n        <button type=\"button\" class=\"ui button\" (click)=\"pushOption()\">\u65B0\u589E</button>\n      </div>\n    </div>\n  </div>"
        }),
        __param(0, core_1.Self()), 
        __metadata('design:paramtypes', [forms_1.NgModel, core_1.ElementRef])
    ], OptionFieldMetadataComponent);
    return OptionFieldMetadataComponent;
}());
exports.OptionFieldMetadataComponent = OptionFieldMetadataComponent;
var TableFieldMetadataComponent = (function () {
    // 建構子
    function TableFieldMetadataComponent(model) {
        this.model = model;
        model.valueAccessor = this;
        this.metadata = {
            fields: []
        };
    }
    // 初始化
    TableFieldMetadataComponent.prototype.ngOnInit = function () {
        this.isUpdating = false;
        this.modalID = util_1.RandomString(10);
        this.isCollapsed = false;
        this.areFieldsCollapsed = false;
    };
    TableFieldMetadataComponent.prototype.ngAfterViewInit = function () {
    };
    // 按鈕
    TableFieldMetadataComponent.prototype.toggleCollapse = function () {
        this.isCollapsed = !this.isCollapsed;
    };
    TableFieldMetadataComponent.prototype.toggleFieldsCollapse = function () {
        var expectedState = !this.areFieldsCollapsed;
        this.fieldFormComponents.forEach(function (fieldFormComponent) {
            fieldFormComponent.isCollapsed = expectedState;
        });
        this.areFieldsCollapsed = expectedState;
    };
    TableFieldMetadataComponent.prototype.reset = function () {
        this.metadata = this.cachedMetadata;
        this.change(this.metadata);
    };
    TableFieldMetadataComponent.prototype.createField = function () {
        this.metadata.fields.push({
            _id: util_1.RandomString(10),
            name: '欄位名稱',
            type: 'shortText',
            hint: '',
            metadata: undefined
        });
        this.emitValue();
    };
    TableFieldMetadataComponent.prototype.deleteField = function (field) {
        this.metadata.fields.splice(this.metadata.fields.indexOf(field), 1);
        this.emitValue();
    };
    // ControlValueAccessor 寫入值
    TableFieldMetadataComponent.prototype.writeValue = function (value) {
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
    };
    // ControlValueAccessor - 註冊函數
    TableFieldMetadataComponent.prototype.registerOnChange = function (fn) {
        this.change = fn;
    };
    TableFieldMetadataComponent.prototype.registerOnTouched = function (fn) {
        this.touched = fn;
    };
    TableFieldMetadataComponent.prototype.emitValue = function () {
        this.change(this.metadata);
    };
    __decorate([
        core_1.ViewChildren(core_1.forwardRef(function () { return field_component_1.FieldComponent; })), 
        __metadata('design:type', core_1.QueryList)
    ], TableFieldMetadataComponent.prototype, "fieldFormComponents", void 0);
    TableFieldMetadataComponent = __decorate([
        core_1.Component({
            selector: 'field-metadata[type=table]',
            template: "\n  <div class=\"field\">\n    <label>\u6B04\u4F4D</label>\n  </div>\n  <div style=\"overflow: auto;\">\n    <div style=\"float: right;\">\n      <a class=\"link\" (click)=\"toggleFieldsCollapse()\">\u5C55\u958B\uFF0F\u6536\u5408\u8868\u683C\u6B04\u4F4D</a>\n      <!-- <a class=\"link\" (click)=\"toggleCollapse()\">\u986F\u793A\uFF0F\u96B1\u85CF\u8A2D\u5B9A</a> -->\n    </div>\n  </div>\n  <div class=\"ui segments\" style=\"margin-bottom: 1em;\" [style.display]=\"isCollapsed ? 'none' : undefined\">\n    <div class=\"ui segment\" *ngFor=\"let _ of metadata.fields; let i = index; let coloring = odd;\" [class.secondary]=\"coloring\">\n      <field [(ngModel)]=\"metadata.fields[i]\" [update-button]=\"false\" (delete)=\"deleteField(metadata.fields[i])\" [ngModelOptions]=\"{standalone: true}\"></field>\n    </div>\n    <div class=\"ui segment\">\n      <button type=\"button\" class=\"ui teal button\" (click)=\"createField()\">\u589E\u52A0\u8868\u683C\u6B04\u4F4D</button>\n      <button type=\"button\" class=\"ui red button\" (click)=\"reset()\">\u91CD\u7F6E</button>\n    </div>\n  </div>"
        }),
        __param(0, core_1.Self()), 
        __metadata('design:paramtypes', [forms_1.NgModel])
    ], TableFieldMetadataComponent);
    return TableFieldMetadataComponent;
}());
exports.TableFieldMetadataComponent = TableFieldMetadataComponent;
//# sourceMappingURL=field-metadata.component.js.map
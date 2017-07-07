// Angular 2
import { Self, Input, Output, Component, EventEmitter, OnInit, AfterViewInit, forwardRef, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core'
import { ControlValueAccessor, NgModel } from '@angular/forms'

// 服務
import { FormService } from './../../services/form.service'

// 基本型態
import { Field } from './../../types/types'

// 子元件
import { FieldComponent } from './field.component'

// 輔助函數
import { RandomString } from './../../util'

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
]

interface OptionFieldMetadata {
  presentation: string,
  options: {
    id: string,
    value: string,
    fields: Field[]
  }[]
}
interface TableFieldMetadata {
  fields: Field[]
}
function cloneTableFieldMetadata(metadata: TableFieldMetadata): TableFieldMetadata {
  return jQuery.extend(true, {}, metadata)
}
function cloneOptionFieldMetadata(metadata: OptionFieldMetadata): OptionFieldMetadata {
  return jQuery.extend(true, {}, metadata)
}

@Component({
  selector: 'field-metadata[type=empty]',
  template: ``
})
export class EmptyFieldMetadataComponent implements ControlValueAccessor {
  private change: (_: any) => void

  // 建構子
  constructor( @Self() private model: NgModel) {
    model.valueAccessor = this
  }

  writeValue(value: any) {
    // Discard any value written as it is not important anyway
    if (value) {
      // If something is written, we need to emit {} as there is no associated metadata
      if (this.change) this.change({})
    }
  }

  registerOnChange(fn: (_: any) => void): void {
    this.change = fn
  }
  registerOnTouched(fn: () => void): void { }
}

@Component({
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
    <ng-template ngFor [ngForOf]="metadata.options" let-i="index" let-odd="odd">
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
    </ng-template>
    
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
})

export class OptionFieldMetadataComponent implements ControlValueAccessor, AfterViewInit {
  private presentationTypes = OptionsPresentationTypes

  private metadata: OptionFieldMetadata
  private cachedMetadata: OptionFieldMetadata

  private areOptionsCollapsed: boolean = false
  private newOptionName: string = ""

  // Angular 給我們的 Callback 函數
  private change: (_: any) => void
  private touched: () => void

  // 建構子
  constructor( @Self() private model: NgModel, private elementRef: ElementRef) {
    model.valueAccessor = this
    this.metadata = {
      presentation: 'radio',
      options: []
    }
  }

  ngAfterViewInit(): void {
    ($(this.elementRef.nativeElement).find('.ui.radio.checkbox') as any).checkbox()
  }

  // ControlValueAccessor - 註冊函數
  registerOnChange(fn: (_: any) => void): void {
    this.change = fn
  }
  registerOnTouched(fn: () => void): void {
    this.touched = fn
  }

  // ControlValueAccessor - 接收資料
  writeValue(value: any): void {
    if (value && value.options && value.presentation) {
      this.metadata = value
      this.cachedMetadata = cloneOptionFieldMetadata(this.metadata)
    } else {
      this.metadata = {
        presentation: 'radio',
        options: []
      }

      if (this.change) this.emitValue()
    }
  }

  // 利用回呼函式送出資料
  emitValue(): void {
    this.change(this.metadata)
  }

  // 選項
  pushOption(): void {
    this.metadata.options.push({
      id: RandomString(10),
      value: this.newOptionName,
      fields: []
    })

    this.emitValue()

    this.newOptionName = ""
  }
  pullOption(option: { id: string, value: string, fields: Field[] }): void {
    this.metadata.options.splice(this.metadata.options.indexOf(option), 1)

    this.emitValue()
  }

  // 子欄位處理
  createField(option: { id: string, value: string, fields: Field[] }): void {
    option.fields.push(new Field({
      _id: RandomString(10),
      name: '欄位名稱',
      type: 'shortText',
      hint: '',
      metadata: null
    }))
  }

  deleteField(option: { id: string, value: string, fields: Field[] }, field: Field): void {
    option.fields.splice(option.fields.indexOf(field), 1)
  }
}

@Component({
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
})

export class TableFieldMetadataComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  @ViewChildren(forwardRef(() => FieldComponent)) fieldFormComponents: QueryList<FieldComponent>

  private modalID: string
  private cachedMetadata: TableFieldMetadata
  private metadata: TableFieldMetadata
  private isCollapsed: boolean
  private areFieldsCollapsed: boolean

  // Angular 給我們的 Callback 函數
  private change: (_: any) => void
  private touched: () => void

  private isUpdating: boolean

  // 建構子
  constructor( @Self() private model: NgModel) {
    model.valueAccessor = this
    this.metadata = {
      fields: []
    }
  }

  // 初始化
  ngOnInit(): void {
    this.isUpdating = false
    this.modalID = RandomString(10)
    this.isCollapsed = false
    this.areFieldsCollapsed = false
  }
  ngAfterViewInit(): void {

  }

  // 按鈕
  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed
  }
  toggleFieldsCollapse(): void {
    let expectedState = !this.areFieldsCollapsed

    this.fieldFormComponents.forEach(fieldFormComponent => {
      fieldFormComponent.isCollapsed = expectedState
    })

    this.areFieldsCollapsed = expectedState
  }

  reset(): void {
    this.metadata = this.cachedMetadata
    this.change(this.metadata)
  }

  createField(): void {
    this.metadata.fields.push(new Field({
      _id: RandomString(10),
      name: '欄位名稱',
      type: 'shortText',
      hint: '',
      metadata: undefined
    }))

    this.emitValue()
  }
  deleteField(field: Field): void {
    this.metadata.fields.splice(this.metadata.fields.indexOf(field), 1)
    this.emitValue()
  }

  // ControlValueAccessor 寫入值
  writeValue(value: any): void {
    // 判斷是否是正確的 metadata
    if (value && value.fields) {
      this.metadata = value
      this.cachedMetadata = cloneTableFieldMetadata(this.metadata)
    } else {
      this.metadata = {
        fields: []
      }
      if (this.change) this.emitValue()
    }
  }

  // ControlValueAccessor - 註冊函數
  registerOnChange(fn: (_: any) => void): void {
    this.change = fn
  }
  registerOnTouched(fn: () => void): void {
    this.touched = fn
  }

  emitValue(): void {
    this.change(this.metadata)
  }
}

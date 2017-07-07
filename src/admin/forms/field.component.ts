// Angular 2
import { Self, Input, Output, Component, EventEmitter, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core'
import { ControlValueAccessor, NgModel } from '@angular/forms'

// 服務
import { FormService } from './../../services/form.service'

// 基本型態
import { Field } from './../../types/types'

// 子元件
import { EmptyFieldMetadataComponent, TableFieldMetadataComponent, OptionFieldMetadataComponent } from './field-metadata.component'

import { RandomString } from './../../util'
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'field',
  template: `
  <a class="link" style="float: right; position: relative; z-index: 1;" (click)="toggleCollapse()">展開／收合此欄位</a>
  <div [style.display]="isCollapsed ? 'initial' : 'none'">
    <p>名稱：{{field.name}}</p>
    <p>類型：{{field.type | fieldType}}</p>
    <p>唯一識別碼：{{field.id}}</p>
  </div>
  <form class="ui form" (ngSubmit)="updateField()" #fieldForm="ngForm" [style.display]="isCollapsed ? 'none' : 'initial'">
    <div class="field">
      <label>唯一識別碼</label>
      <p>{{field.id}}</p>
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
})

export class FieldComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  @Input('update-button') shouldShowUpdateButton: boolean

  // 事件：更新或是刪除一個欄位
  @Output('reload') reload = new EventEmitter<() => void>()
  @Output('update') update = new EventEmitter<() => void>()
  @Output('delete') delete = new EventEmitter<null>()

  // 將會由 ngModel 所管理的資料
  private field: Field

  // Angular 給我們的 Callback 函數
  private change: (_: any) => void
  private touched: () => void

  // 「欄位類型」單選 input 的 HTML ID
  private _radioUID: string

  // 狀態
  private isReloading: boolean
  private isUpdating: boolean
  private isDeleting: boolean
  public isCollapsed: boolean

  // 建構子：服務
  constructor( @Self() private model: NgModel, private _formService: FormService, @Inject('fieldTypes') private fieldTypes: { label: string, value: string }[]) {
    model.valueAccessor = this
  }

  // 生命週期
  ngOnInit(): void {
    this.field = <Field>{}
    this.isUpdating = false
    this.isDeleting = false
    this.isCollapsed = false
    this._radioUID = RandomString(10)
    if (this.shouldShowUpdateButton == undefined) {
      this.shouldShowUpdateButton = true
    }
  }
  ngAfterViewInit() {
    ($('div#' + this._radioUID + ' .ui.radio.checkbox') as any).checkbox();
  }
  writeValue(value: any): void {
    this.field = value
  }

  // 按鈕動作：更新與刪除
  reloadField(): void {
    this.isReloading = true
    this.reload.emit(() => { this.isReloading = false; })
  }
  updateField(): void {
    this.isUpdating = true
    this.update.emit(() => { this.isUpdating = false; })
  }
  deleteField(): void {
    this.isDeleting = true
    this.delete.emit(null)
  }

  // 按鈕動作：展開、收合
  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed
  }

  // ControlValueAccessor - 註冊函數
  registerOnChange(fn: (_: any) => void): void {
    this.change = fn
  }
  registerOnTouched(fn: () => void): void {
    this.touched = fn
  }

  表單改動
  emitValue(): void {
    this.change(this.field)
  }
}

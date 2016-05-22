// Angular 2
import {Input, Output, Component, EventEmitter, OnInit} from 'angular2/core'

import {Directive, Provider, forwardRef} from 'angular2/core'
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from 'angular2/common'
import {CONST_EXPR} from 'angular2/src/facade/lang'

import {ChineseDatePipe} from './../../pipes/pipes'

@Component({
  selector: 'form-control[type=date]',
  pipes: [ChineseDatePipe],
  template: `<p *ngIf="!_editing" class="form-control-static" style="color: #0275d8;" (click)="edit()">{{_dataModel | chineseDate}}</p>
  <div class="form-inline" *ngIf="_editing">
    <input type="number" class="form-control" style="width: 6em; text-align: center;" [(ngModel)]="_year" min="1900" max="2999" (blur)="_touched.emit()" (change)="validate(year, month, day)" #year>
    <label>年</label>
    <input type="number" class="form-control" style="width: 4em; text-align: center;" [(ngModel)]="_month" min="1" max="12" (blur)="_touched.emit()" (change)="validate(year, month, day)" #month>
    <label>月</label>
    <input type="number" class="form-control" style="width: 4em; text-align: center;" [(ngModel)]="_day" min="1" [max]="days(year.value, month.value)" (blur)="_touched.emit()" (change)="validate(year, month, day)" #day>
    <label>日</label>
    <p class="form-control-static" style="color: #0275d8;" (click)="doneEdit()">完成</p>
  </div>`
})

export class DateFormControl {
  // 推送資料
  @Output('control-changed') _changed = new EventEmitter<Date>()
  // 當焦點離開
  @Output('control-touched') _touched = new EventEmitter<void>()
  
  private _year: number
  private _month: number
  private _day: number
  
  private _dataModel: Date
  private _editing: Boolean
  
  constructor() {
    this._editing = false
    console.dir("我是 DateFormControl，我的 constructor 被呼叫了呦！")
  }
  
  // 與 Value Accessor 有關的
  
  // 從 Value Accessor 接收資料
  setValue(value: Date): void {
    if (value) {
      this._year = value.getFullYear()
      this._month = value.getMonth() + 1
      this._day = value.getDate()
    }
    this._dataModel = value
  }
  
  // 與 View 有關
  
  edit(): void {
    // 進入編輯模式
    this._editing = true
  }
  
  doneEdit(): void {
    this._editing = false
  }
  
  days(year: number, month: number): number {
    return new Date(year, month, 0).getDate();
  }
  
  validate(yearInput: HTMLInputElement, monthInput: HTMLInputElement, dayInput: HTMLInputElement): void {
    // 檢查是否有任何一個是非數字
    if (!(yearInput.valueAsNumber >= 1900 && yearInput.valueAsNumber <= 2999)) {
      yearInput.value = new Date().getFullYear().toString()
    }
    
    if (!(monthInput.valueAsNumber >= 1 && monthInput.valueAsNumber <= 12)) {
      monthInput.value = "1"
    }
    
    if (!(dayInput.valueAsNumber >= 1 && dayInput.valueAsNumber <= this.days(yearInput.valueAsNumber, monthInput.valueAsNumber))) {
      dayInput.value = this.days(yearInput.valueAsNumber, monthInput.valueAsNumber).toString()
    }
    
    this._dataModel = new Date(yearInput.valueAsNumber, monthInput.valueAsNumber - 1, dayInput.valueAsNumber)
    this._changed.emit(this._dataModel)
  }
}

const CUSTOM_VALUE_ACCESSOR = CONST_EXPR(new Provider(
  NG_VALUE_ACCESSOR, {useExisting: forwardRef(() => DateFormControlValueAccessor), multi: true}
))

@Directive({
  selector: 'form-control[type=date]',
  host: {
    '(control-changed)': '_onChanged($event)',
    '(control-touched)': '_onTouched()'
  },
  providers: [CUSTOM_VALUE_ACCESSOR]
})

export class DateFormControlValueAccessor implements ControlValueAccessor {
  private _onChanged = (_) => {}
  private _onTouched = () => {}

  constructor(private _host: DateFormControl) {
    console.dir("我是 DateFormControlValueAccessor，我的 constructor 被呼叫了呦！")
  }

  writeValue(value: any): void {
    this._host.setValue(value)
  }
  
  registerOnChange(fn: (_: any) => void): void {
    this._onChanged = fn
  }
  
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn
  }
}

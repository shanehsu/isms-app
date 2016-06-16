// Angular 2
import {Input, Output, Component, EventEmitter, OnInit} from '@angular/core'

import {Directive, Provider, forwardRef, Self} from '@angular/core'
import {NG_VALUE_ACCESSOR, ControlValueAccessor, NgModel} from '@angular/common'

import {ChineseDatePipe} from './../../pipes/pipes'

@Component({
  selector: 'form-control[type=date]',
  pipes: [ChineseDatePipe],
  template: `<p *ngIf="!_editing" class="form-control-static" style="color: #0275d8;" (click)="edit()">{{_dataModel | chineseDate}}</p>
  <div class="form-inline" *ngIf="_editing">
    <input type="number" class="form-control" style="width: 6em; text-align: center;" [(ngModel)]="_year" min="1900" max="2999" (blur)="_onTouched()" (change)="validate(year, month, day)" #year>
    <label>年</label>
    <input type="number" class="form-control" style="width: 4em; text-align: center;" [(ngModel)]="_month" min="1" max="12" (blur)="_onTouched()" (change)="validate(year, month, day)" #month>
    <label>月</label>
    <input type="number" class="form-control" style="width: 4em; text-align: center;" [(ngModel)]="_day" min="1" [max]="days(year.value, month.value)" (blur)="_onTouched()" (change)="validate(year, month, day)" #day>
    <label>日</label>
    <p class="form-control-static" style="color: #0275d8;" (click)="doneEdit()">完成</p>
  </div>`
})

export class DateFormControl implements ControlValueAccessor {
  // CVA
  private _onChanged = (_) => {}
  private _onTouched = () => {}
  
  private _year: number
  private _month: number
  private _day: number
  
  private _dataModel: Date
  private _editing: Boolean
  
  private cd: NgModel
  constructor(@Self() cd:NgModel) {
    this.cd = cd
    cd.valueAccessor = this
    
    this._editing = false
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
    this._onChanged(this._dataModel)
  }
  
  // Control Value Accessor
  writeValue(value: any): void {
    if (value) {
      this._year = value.getFullYear()
      this._month = value.getMonth() + 1
      this._day = value.getDate()
    }
    this._dataModel = value
  }
  
  registerOnChange(fn: (_: any) => void): void {
    this._onChanged = fn
  }
  
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn
  }
}

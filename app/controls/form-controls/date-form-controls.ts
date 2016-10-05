// Angular 2
import {Input, Output, Component, EventEmitter, OnInit} from '@angular/core'

import {Directive, Provider, forwardRef, Self} from '@angular/core'
import {NgModel, ControlValueAccessor} from '@angular/forms'
import {} from '@angular/common'

// export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
//     provide: NG_VALUE_ACCESSOR,
//     useExisting: forwardRef(() => CustomInputComponent),
//     multi: true
// };

@Component({
  selector: 'form-control[type=date]',
  template: `<a class="link" *ngIf="!_editing" (click)="edit()">{{_dataModel | chineseDate}}</a>
  <div class="inline fields" *ngIf="_editing">
    <input type="number" class="form-control" style="width: 7em; text-align: center;" [(ngModel)]="_year" min="1900" max="2999" (blur)="_onTouched()" (change)="validate(year, month, day)" #year>
    <label style="margin: 0 0.5em 0 0.5em;">年</label>
    <input type="number" class="form-control" style="width: 5em; text-align: center;" [(ngModel)]="_month" min="1" max="12" (blur)="_onTouched()" (change)="validate(year, month, day)" #month>
    <label style="margin: 0 0.5em 0 0.5em;">月</label>
    <input type="number" class="form-control" style="width: 5em; text-align: center;" [(ngModel)]="_day" min="1" [max]="days(year.value, month.value)" (blur)="_onTouched()" (change)="validate(year, month, day)" #day>
    <label style="margin: 0 0.5em 0 0.5em;">日</label>
    <a class="link" (click)="doneEdit()">完成</a>
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

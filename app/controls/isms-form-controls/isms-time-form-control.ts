// Angular 2
import {Input, Output, Component, EventEmitter, OnInit} from '@angular/core'

import {Directive, Provider, forwardRef, Self} from '@angular/core'
import {NG_VALUE_ACCESSOR, ControlValueAccessor, NgModel} from '@angular/common'

interface InternalTimeDataFormat {
  hour: number
  minute: number
}

@Component({
  selector: 'form-control[type=time]',
  template: `<p *ngIf="!_editing" class="form-control-static" style="color: #0275d8;" (click)="edit()">{{_dataModel.hour + ' 時 ' + _dataModel.minute + ' 分'}}</p>
  <div class="form-inline" *ngIf="_editing">
    <input type="number" class="form-control" style="width: 4em; text-align: center;" [(ngModel)]="_dataModel.hour" min="0" max="23" (blur)="_onTouched()" (change)="validate(hour, minute)" #hour>
    <label>時</label>
    <input type="number" class="form-control" style="width: 4em; text-align: center;" [(ngModel)]="_dataModel.minute" min="0" max="59" (blur)="_onTouched()" (change)="validate(hour, minute)" #minute>
    <label>分</label>
    <p class="form-control-static" style="color: #0275d8;" (click)="doneEdit()">完成</p>
  </div>`
})

export class TimeFormControl implements ControlValueAccessor {
  private _onChanged = (_) => {}
  private _onTouched = () => {}
  private cd: NgModel
  
  private _dataModel: InternalTimeDataFormat
  private _editing: Boolean
  
  constructor(@Self() cd: NgModel) {
    this.cd = cd
    cd.valueAccessor = this
    this._editing = false
  }
  
  // 與 Value Accessor 有關的
  
  // 從 Value Accessor 接收資料
  writeValue(value: InternalTimeDataFormat): void {
    this._dataModel = value
  }
  
  edit(): void {
    // 進入編輯模式
    this._editing = true
  }
  
  doneEdit(): void {
    this._editing = false
  }
  
  validate(hour: HTMLInputElement, minute: HTMLInputElement): void {
    // 檢查是否有任何一個是非數字
    if (!(hour.valueAsNumber >= 0 && hour.valueAsNumber <= 23)) {
      hour.value = "0"
    }
    if (!(minute.valueAsNumber >= 0 && minute.valueAsNumber <= 59)) {
      minute.value = "0"
    }
    this._onChanged(this._dataModel)
  }
  
  registerOnChange(fn: (_: any) => void): void {
    this._onChanged = fn
  }
  
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn
  }
}

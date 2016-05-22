// Angular 2
import {Input, Output, Component, EventEmitter, OnInit} from 'angular2/core'

import {Directive, Provider, forwardRef} from 'angular2/core'
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from 'angular2/common'
import {CONST_EXPR} from 'angular2/src/facade/lang'

interface InternalTimeDataFormat {
  hour: number
  minute: number
}

@Component({
  selector: 'form-control[type=time]',
  template: `<p *ngIf="!_editing" class="form-control-static" style="color: #0275d8;" (click)="edit()">{{_dataModel.hour + ' 時 ' + _dataModel.minute + ' 分'}}</p>
  <div class="form-inline" *ngIf="_editing">
    <input type="number" class="form-control" style="width: 4em; text-align: center;" [(ngModel)]="_dataModel.hour" min="0" max="23" (blur)="_touched.emit()" (change)="validate(hour, minute)" #hour>
    <label>時</label>
    <input type="number" class="form-control" style="width: 4em; text-align: center;" [(ngModel)]="_dataModel.minute" min="0" max="59" (blur)="_touched.emit()" (change)="validate(hour, minute)" #minute>
    <label>分</label>
    <p class="form-control-static" style="color: #0275d8;" (click)="doneEdit()">完成</p>
  </div>`
})

export class TimeFormControl {
  // 推送資料
  @Output('control-changed') _changed = new EventEmitter<InternalTimeDataFormat>()
  // 當焦點離開
  @Output('control-touched') _touched = new EventEmitter<void>()
  
  private _dataModel: InternalTimeDataFormat
  private _editing: Boolean
  
  constructor() {
    console.dir("我是 TimeFormControl，我的 constructor 被呼叫了呦！")
    this._editing = false
  }
  
  // 與 Value Accessor 有關的
  
  // 從 Value Accessor 接收資料
  setValue(value: InternalTimeDataFormat): void {
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
    this._changed.emit(this._dataModel)
  }
}

const CUSTOM_VALUE_ACCESSOR = CONST_EXPR(new Provider(
  NG_VALUE_ACCESSOR, {useExisting: forwardRef(() => TimeFormControlValueAccessor), multi: true}
))

@Directive({
  selector: 'form-control[type=time]',
  host: {
    '(control-changed)': '_onChanged($event)',
    '(control-touched)': '_onTouched()'
  },
  providers: [CUSTOM_VALUE_ACCESSOR]
})

export class TimeFormControlValueAccessor implements ControlValueAccessor {
  private _onChanged = (_) => {}
  private _onTouched = () => {}

  constructor(private _host: TimeFormControl) {
    console.dir("我是 TimeFormControlValueAccessor，我的 constructor 被呼叫了呦！")
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

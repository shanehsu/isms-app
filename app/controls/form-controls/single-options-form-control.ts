// Angular 2
import { Input, Output, Component, EventEmitter, OnInit, AfterViewInit } from '@angular/core'

import { Directive, Provider, Inject, forwardRef, Self } from '@angular/core'
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgModel } from '@angular/forms'

import { RandomString } from './../../util'

@Component({
  selector: 'form-control[type=options][presentation=single]',
  template: `
  <div [id]="_uid" class="inline fields">
    <template ngFor let-item [ngForOf]="_metadata.options" let-i="index">
      <div class="field">
        <div class="ui radio checkbox">
          <input [name]="_uid" type="radio" (change)="select(item.id)" [checked]="_dataModel[item.id]?.selected">
          <label>{{item.value}}</label>
        </div>
      </div>
    </template>
  </div>
  <template ngFor let-item [ngForOf]="_metadata.options" let-i="index">
    <div style="margin-left: 4em;" *ngIf="_dataModel && _dataModel[item.id] && _dataModel[item.id].selected">
      <form-fields [nested]="true" [fields]="_metadata.options[i].fields" [(ngModel)]="_dataModel[item.id].values"></form-fields>
    </div>
  </template>
  `
})

export class SingleOptionsFormControl implements ControlValueAccessor, AfterViewInit {
  private _onChanged = (_) => { }
  private _onTouched = () => { }
  private cd: NgModel
  private _uid: string

  @Input('metadata') _metadata: any

  private _dataModel: any

  ngAfterViewInit() {
    ($('div#' + this._uid + ' .ui.radio.checkbox') as any).checkbox()
  }

  constructor( @Self() cd: NgModel) {
    this.cd = cd
    cd.valueAccessor = this
    this._uid = RandomString(10)
  }

  // 與 Value Accessor 有關的

  // 從 Value Accessor 接收資料
  writeValue(value: any): void {
    if (!value) {
      this._dataModel = this._metadata && this._metadata.options ? this._metadata.options.map(() => { }) : {}
    } else {
      this._dataModel = value
    }
  }

  select(id: string): void {
    let model = <{ [id: string]: { selected: boolean, value: any } }>this._dataModel
    for (let $0 in model) {
      model[$0].selected = false
    }
    model[id].selected = true

    this._onChanged(this._dataModel)
  }

  registerOnChange(fn: (_: any) => void): void {
    this._onChanged = fn
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn
  }
}

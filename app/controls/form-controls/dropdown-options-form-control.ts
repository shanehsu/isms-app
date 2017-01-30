// Angular 2
import { Input, Output, Component, EventEmitter, OnInit, AfterViewInit } from '@angular/core'

import { Self } from '@angular/core'
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgModel } from '@angular/forms'

import { RandomString } from './../../util'

@Component({
  selector: 'form-control[type=options][presentation=dropdown]',
  template: `
  <div>
    <select [id]="_uid" (change)="select($event)" class="ui dropdown">
      <template ngFor let-item [ngForOf]="_metadata.options" let-i="index">
        <option [value]="item.id" [selected]="_dataModel[item.id]?.selected">{{item.value}}</option>
      </template>
    </select>
    <template ngFor let-item [ngForOf]="_metadata.options" let-i="index">
      <div *ngIf="_dataModel[item.id]?.selected" style="margin-left: 4em;">
        <form-fields [nested]="true" [fields]="_metadata.options[i].fields" [(ngModel)]="_dataModel[item.id].values"></form-fields>
      </div>
    </template>
  </div>`
})

export class DropdownOptionsFormControl implements ControlValueAccessor, AfterViewInit {
  private _onChanged = (_) => { }
  private _onTouched = () => { }
  private _uid: string

  @Input('metadata') _metadata: any

  private _dataModel: any

  constructor( @Self() private cd: NgModel) {
    this._uid = RandomString(10)
    cd.valueAccessor = this
  }

  ngAfterViewInit() {
    ($('select#' + this._uid + '.ui.dropdown') as any).dropdown()
  }

  select(event: Event): void {
    let select = event.srcElement as HTMLSelectElement
    let id = select.selectedOptions[0].value
    let model = <{ [id: string]: { selected: boolean, value: any } }>this._dataModel
    for (let $0 in model) {
      model[$0].selected = false
    }
    model[id].selected = true

    this._onChanged(this._dataModel)
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

  registerOnChange(fn: (_: any) => void): void {
    this._onChanged = fn
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn
  }
}

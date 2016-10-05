// Angular 2
import {Input, Output, Component, EventEmitter, OnInit, AfterViewInit} from '@angular/core'

import {Directive, Provider, forwardRef, Self} from '@angular/core'
import {NG_VALUE_ACCESSOR, ControlValueAccessor, NgModel} from '@angular/forms'

import {RandomString} from './../../util'

@Component({
  selector: 'form-control[type=options][presentation=multi]',
  template: `
  <div [id]="_uid" class="grouped fields">
    <template ngFor let-item [ngForOf]="_metadata.options" let-i="index">
      <div class="field">
        <div class="ui checkbox">
          <input [name]="_uid" type="checkbox" (change)="select(i)" [checked]="_dataModel.selected && _dataModel.selected[i]">
          <label>{{item.value}}</label>
        </div>
      </div>
      <div style="margin-left: 4em;" *ngIf="_dataModel.selected && _dataModel.selected[i]">
        <form-fields [nested]="true" [fields]="_metadata.options[i].fields" [(ngModel)]="_dataModel.values[i]"></form-fields>
      </div>
    </template>
  </div>`
})

export class MultiOptionsFormControl implements ControlValueAccessor, AfterViewInit {
  private _onChanged = (_) => {}
  private _onTouched = () => {}
  private cd: NgModel
  private _uid: string
  
  @Input('metadata') _metadata: any
  
  private _dataModel: any
  
  constructor(@Self() cd: NgModel) {
    this.cd = cd
    this._uid = RandomString(10);
    cd.valueAccessor = this
  }
  
  ngAfterViewInit() {
    ($('div#' + this._uid + ' .ui.checkbox') as any).checkbox()
  }
  
  // 與 Value Accessor 有關的
  
  // 從 Value Accessor 接收資料
  writeValue(value: any): void {
    if (!value) {
      this._dataModel = this._metadata && this._metadata.options ? this._metadata.options.map(() => {}) : {}
    } else {
      this._dataModel = value
    }
  }
  
  select(index: number): void {
    this._dataModel.selected[index] = !this._dataModel.selected[index]
    
    this._onChanged(this._dataModel)
  }
  
  registerOnChange(fn: (_: any) => void): void {
    this._onChanged = fn
  }
  
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn
  }
}

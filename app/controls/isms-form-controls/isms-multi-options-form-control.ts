// Angular 2
import {Input, Output, Component, EventEmitter, OnInit} from '@angular/core'

import {Directive, Provider, forwardRef, Self} from '@angular/core'
import {NG_VALUE_ACCESSOR, ControlValueAccessor, NgModel} from '@angular/common'

import {FormFields} from './../../isms-form/form-fields'

@Component({
  selector: 'form-control[type=options][presentation=multi]',
  template: `<template ngFor let-item [ngForOf]="_metadata.options" let-i="index">
    <div class="checkbox form-control">
      <label>
        <input type="checkbox" (change)="select(i)" [checked]="_dataModel.selected[i]">
        {{item.value}}
      </label>
      <div *ngIf="_dataModel.selected[i]">
        <isms-form-fields [inline]="true" [fields]="_metadata.options[i].fields" [(ngModel)]="_dataModel.values[i]"></isms-form-fields>
      </div>
    </div>
  </template>`,
  directives: [forwardRef(() => FormFields)]
})

export class MultiOptionsFormControl implements ControlValueAccessor {
  private _onChanged = (_) => {}
  private _onTouched = () => {}
  private cd: NgModel
  
  @Input('metadata') _metadata: any
  
  private _dataModel: any
  
  constructor(@Self() cd: NgModel) {
    this.cd = cd
    cd.valueAccessor = this
  }
  
  // 與 Value Accessor 有關的
  
  // 從 Value Accessor 接收資料
  writeValue(value: any): void {
    this._dataModel = value
  }
  
  select(index: number): void {
    console.log(index + " is selected!")
    
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

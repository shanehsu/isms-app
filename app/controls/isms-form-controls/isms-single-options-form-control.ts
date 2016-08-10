// Angular 2
import {Input, Output, Component, EventEmitter, OnInit} from '@angular/core'

import {Directive, Provider, Inject, forwardRef, Self} from '@angular/core'
import {NG_VALUE_ACCESSOR, ControlValueAccessor, NgModel} from '@angular/common'

import {FormFields} from './../../isms-form/form-fields'

@Component({
  selector: 'form-control[type=options][presentation=single]',
  template: `<template ngFor let-item [ngForOf]="_metadata.options" let-i="index">
    <div class="radio form-control">
      <label>
        <input [name]="_uid" type="radio" (change)="select(i)" [checked]="_dataModel.selected[i]">
        {{item.value}}
      </label>
      <div *ngIf="_dataModel.selected[i]">
        <isms-form-fields [inline]="true" [fields]="_metadata.options[i].fields" [(ngModel)]="_dataModel.values[i]"></isms-form-fields>
      </div>
    </div>
  </template>`,
  directives: [forwardRef(() => FormFields)]
})

export class SingleOptionsFormControl implements ControlValueAccessor {
  private _onChanged = (_) => {}
  private _onTouched = () => {}
  private cd: NgModel
  private _uid: string
  
  @Input('metadata') _metadata: any
  
  private _dataModel: any
  
  constructor(@Self() cd: NgModel) {
    this.cd = cd
    cd.valueAccessor = this
    this._uid = randomString(5)
  }
  
  // 與 Value Accessor 有關的
  
  // 從 Value Accessor 接收資料
  writeValue(value: any): void {
    this._dataModel = value
  }
  
  select(index: number): void {
    this._dataModel.selected = this._dataModel.selected.map(() => { return false })
    this._dataModel.selected[index] = true
    
    this._onChanged(this._dataModel)
  }
  
  registerOnChange(fn: (_: any) => void): void {
    this._onChanged = fn
  }
  
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn
  }
}

var randomString = function(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
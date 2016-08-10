// Angular 2
import {Input, Output, Component, EventEmitter, OnInit} from '@angular/core'

import {Directive, Provider, forwardRef, Self} from '@angular/core'
import {NG_VALUE_ACCESSOR, ControlValueAccessor, NgModel} from '@angular/common'

import {FormFields} from './../../isms-form/form-fields'

@Component({
  selector: 'form-control[type=options][presentation=dropdown]',
  template: `<div class="radio form-control">
      <select (change)="select($event)" class="form-control">
        <template ngFor let-item [ngForOf]="_metadata.options" let-i="index">
          <option [value]="i" [selected]="_dataModel.selected[i]">{{item.value}}</option>
        </template>
      </select>
      <template ngFor let-item [ngForOf]="_metadata.options" let-i="index">
        <div *ngIf="_dataModel.selected[i]">
          <isms-form-fields [inline]="true" [fields]="_metadata.options[i].fields" [(ngModel)]="_dataModel.values[i]"></isms-form-fields>
        </div>
      </template>
    </div>`,
  directives: [forwardRef(() => FormFields)]
})

export class DropdownOptionsFormControl implements ControlValueAccessor {
  private _onChanged = (_) => {}
  private _onTouched = () => {}
  
  @Input('metadata') _metadata: any
  
  private _dataModel: any
  
  private cd: NgModel
  constructor(@Self() cd:NgModel) {
    this.cd = cd
    cd.valueAccessor = this
  }
  
  select(event: Event): void {
    let select = event.srcElement as HTMLSelectElement
    let index = select.selectedIndex
    
    this._dataModel.selected = this._dataModel.selected.map(() => { return false })
    
    this._dataModel.selected[index] = !this._dataModel.selected[index]
    
    this._onChanged(this._dataModel)
  }
  
  // 與 Value Accessor 有關的
  
  // 從 Value Accessor 接收資料
  writeValue(value: any): void {
    this._dataModel = value
  }
  
  registerOnChange(fn: (_: any) => void): void {
    this._onChanged = fn
  }
  
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn
  }
}

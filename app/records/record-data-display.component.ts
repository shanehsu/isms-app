import { Component, Self } from '@angular/core'
import { ControlValueAccessor, NgModel } from '@angular/forms'
import { TextFieldData, TimeFieldData, DateFieldData, OptionFieldData,
         TableFieldData, FieldData, Schema, GenericFieldDisplayData,
         OptionFieldDisplayData, TableFieldDisplayData, FieldDisplayData,
         FieldDisplayMetadata } from './records.types'

@Component({
  selector: 'record-data-display',
  template: `
  <div *ngIf="value && value.selectedValues">
    <div *ngFor="let selectedValue of value.selectedValues; let i = index;">
      <p>{{selectedValue}}</p>
      <div class="sub-fields">
        <div *ngFor="let nestedValue of value.nestedValues[i]; let j = index;">
          {{nestedValue.title}}
          <record-data-display [(ngModel)]="value.nestedValues[i][j].value"></record-data-display>
        </div>
      </div>
    </div>
  </div>
  <div *ngIf="value && value.titles">
    <table class="ui compact basic table">
      <thead>
        <tr>
          <td *ngFor="let title of value.titles">{{title}}</td>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let _ of value.values; let i = index;">
          <td *ngFor="let _ of value.values[i]; let j = index;">
            <record-data-display [(ngModel)]="value.values[i][j]"></record-data-display>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <p *ngIf="value && !value.titles && !value.selectedValues">{{value}}</p>
  `,
  styles: [
    'div.sub-fields { padding-left: 1em; }'
  ]
})
export class RecordDataDisplay implements ControlValueAccessor {
  private value: FieldDisplayMetadata | undefined
  
  // Angular 給我們的 Callback 函數
  private change: (_: any) => void
  private touched: () => void
  
  constructor(@Self() private model: NgModel) {
    model.valueAccessor = this
    this.value = undefined
  }
  writeValue(value: any) {
    this.value = value
  }
  
  // ControlValueAccessor - 註冊函數
  registerOnChange(fn: (_: any) => void): void {
    this.change = fn
  }
  registerOnTouched(fn: () => void): void {
    this.touched = fn
  }
}
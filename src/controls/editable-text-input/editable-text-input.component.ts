import {Component, Self, Input} from '@angular/core'
import {ControlValueAccessor, NgModel} from '@angular/forms'

@Component({
  selector: 'text-input[editable]',
  template: `
  <form class="ui form">
    <div class="field">
      <label (click)="isEditing = !isEditing;">{{label}}</label>
      <p [style.display]="isEditing ? 'none' : undefined" (click)="isEditing = true;">{{text}}</p>
      <input [style.display]="isEditing ? undefined : 'none'" type="text" (keypress)="keypress($event)" [(ngModel)]="text" name="value" (keyup)="emitValue()" />
    </div>
  </form>
  `
})
export class EditableTextInput implements ControlValueAccessor {
  @Input('label') label: string = ""
  private text: string = ""
  private isEditing: boolean = false
  
  // Angular 給我們的 Callback 函數
  private change: (_: any) => void
  private touched: () => void
  
  // 建構子
  constructor(@Self() private model: NgModel) {
    model.valueAccessor = this
  }
  
  emitValue(): void {
    this.change(this.text)
  }
  
  // ControlValueAccessor - 註冊函數
  registerOnChange(fn: (_: any) => void): void {
    this.change = fn
  }
  registerOnTouched(fn: () => void): void {
    this.touched = fn
  }
  
  keypress(event: KeyboardEvent): boolean {
    if (event.which == 13) {
      this.isEditing = false
      return false
    } else {
      return true
    }
  }
  
  writeValue(value: any): void {
    this.text = value
  }
}
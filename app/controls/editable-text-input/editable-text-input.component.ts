// Angular 2
import {Input, Output, Component, EventEmitter, OnInit} from 'angular2/core'

@Component({
  selector: 'input-text-editable',
  template: `
  <span [ngSwitch]="_editing">
    <template [ngSwitchWhen]="true">
      <input type="text" class="form-control" [ngModel]="_model" (ngModelChange)="modelChange($event)"
             (keydown)="keydown($event)" (blur)="touched()">
    </template>
    
    <template [ngSwitchWhen]="false">
      <a (click)="startEditing()">{{_model}}</a>
    </template>
    
    <template ngSwitchDefault>EditableTextInputComponent：未知的編輯狀態</template>
  </span>
  `
})

export class EditableTextInputComponent {
  private _editing: boolean = false
  private _model: string
  
  @Output('control-changed') _changed = new EventEmitter<string>()
  @Output('control-touched') _touched = new EventEmitter<void>()
  
  @Output('editing-will-end') _editingWillEnd = new EventEmitter<string>()
  
  // 與 Value Accessor 有關的
  setValue(value: string): void {
    this._model = value
  }
  
  // 與 View 有關的
  modelChange(value: string): void {
    console.log('model change')
    this._model = value
    
    this._changed.emit(value)
  }
  
  keydown(event: KeyboardEvent): void {
    if (event.key === "Enter" || event.keyCode === 13 || event.which === 123) {
      console.log('Enter pressed')
      this._editingWillEnd.emit(this._model)
      this._editing = false
      event.preventDefault()
    }
  }
  
  touched(): void {
    this._touched.emit(null)
  }
  
  startEditing(): void {
    this._editing = true
  }
}
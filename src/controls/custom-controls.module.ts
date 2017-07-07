import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { EditableTextInput } from './editable-text-input/editable-text-input.component'


@NgModule({
  declarations: [
    EditableTextInput
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    EditableTextInput
  ]
})
export class customControlsModule { }

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { pipesModule } from './../pipes/pipes.module'

import { DateFormControl } from './form-controls/date-form-controls'
import { DropdownOptionsFormControl } from './form-controls/dropdown-options-form-control'
import { MultiLineTextFormControl } from './form-controls/multi-line-text-form-control'
import { MultiOptionsFormControl } from './form-controls/multi-options-form-control'
import { SingleLineTextFormControl } from './form-controls/single-line-text-form-control'
import { SingleOptionsFormControl } from './form-controls/single-options-form-control'
import { TableFormControl } from './form-controls/table-form-control'
import { TimeFormControl } from './form-controls/time-form-control'

import { FieldsComponent } from './form-controls/fields.component'

@NgModule({
  declarations: [
    DateFormControl,
    DropdownOptionsFormControl,
    MultiLineTextFormControl,
    MultiOptionsFormControl,
    SingleLineTextFormControl,
    SingleOptionsFormControl,
    TableFormControl,
    TimeFormControl,
    FieldsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    
    pipesModule
  ],
  exports: [
    DateFormControl,
    DropdownOptionsFormControl,
    MultiLineTextFormControl,
    MultiOptionsFormControl,
    SingleLineTextFormControl,
    SingleOptionsFormControl,
    TableFormControl,
    TimeFormControl,
    FieldsComponent
  ]
})
export class formControlsModule { }

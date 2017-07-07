import { NgModule, Component, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { customControlsModule } from './../../controls/custom-controls.module'

import { FormsListComponent } from './forms-list.component'
import { FormDetailComponent } from './form-detail.component'
import { RevisionComponent } from './revision.component'
import { FieldComponent } from './field.component'
import { EmptyFieldMetadataComponent, OptionFieldMetadataComponent, TableFieldMetadataComponent } from './field-metadata.component'
export { FormsListComponent, FormDetailComponent }

import { CodemirrorModule } from 'ng2-codemirror'

let FieldTypes = [
  {
    label: '單行文字',
    value: 'shortText'
  },
  {
    label: '多行文字',
    value: 'longText'
  },
  {
    label: '日期',
    value: 'date'
  },
  {
    label: '時間',
    value: 'time'
  },
  {
    label: '選擇',
    value: 'options'
  },
  {
    label: '表格',
    value: 'table'
  }
]

@Pipe({
  name: 'fieldType'
})
class FieldTypePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return ''
    }
    return FieldTypes.find(type => type.value == value).label
  }
}

@Component({
  template: `<router-outlet></router-outlet>`
})
export class FormAdminComponent { }

@NgModule({
  declarations: [
    FormAdminComponent,
    FormsListComponent,
    FormDetailComponent,
    RevisionComponent,
    FieldComponent,
    EmptyFieldMetadataComponent,
    OptionFieldMetadataComponent,
    TableFieldMetadataComponent,
    FieldTypePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CodemirrorModule,
    customControlsModule
  ],
  providers: [
    { provide: 'fieldTypes', useValue: FieldTypes }
  ],
  exports: [
    FormAdminComponent,
    FormsListComponent,
    FormDetailComponent
  ]
})

export class formsAdminModule { }

import { NgModule, Component, Pipe, PipeTransform } from '@angular/core';
import { RecordsListComponent } from './records-list.component'
import { RecordComponent } from './record.component'
import { RecordUpdateComponent } from './record.update.component'
import { RecordDataDisplay } from './record-data-display.component'

import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { formControlsModule } from './../controls/form-controls.module'

@Component({
  template: `<router-outlet></router-outlet>`
})
class RecordsComponent { }

let routes: Routes = [
  {
    path: 'records',
    component: RecordsComponent,
    children: [
      { path: '', component: RecordsListComponent },
      { path: ':id', component: RecordComponent },
      { path: 'update/:id', component: RecordUpdateComponent }
    ]
  }
];

const recordsRoutingModule: ModuleWithProviders = RouterModule.forChild(routes)

@Pipe({
  name: 'status'
})
class StatusPipe implements PipeTransform {
  transform(status: string): string {
    if (status == 'awaiting_review') {
      return '等待簽核'
    } else if (status == 'accepted') {
      return '審核成功'
    } else {
      return '退回'
    }
  }
}

@NgModule({
  declarations: [
    RecordsComponent,
    RecordsListComponent,
    RecordComponent,
    RecordUpdateComponent,
    RecordDataDisplay,
    StatusPipe
  ],
  imports: [
    CommonModule,
    FormsModule,

    recordsRoutingModule,
    formControlsModule
  ]
})

export class recordsModule { }

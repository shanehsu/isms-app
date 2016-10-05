import { NgModule, Component } from '@angular/core';
import { RecordsListComponent } from './records-list.component'
import { RecordComponent } from './record.component'
import { RecordDataDisplay } from './record-data-display.component'

import { CommonModule }  from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

@Component({
  template: `<router-outlet></router-outlet>`
})
class RecordsComponent {}

let routes: Routes = [
  {
    path: 'records',
    component: RecordsComponent,
    children: [
      { path: '', component: RecordsListComponent },
      { path: ':id', component: RecordComponent }
    ]
  }
];

const recordsRoutingModule: ModuleWithProviders = RouterModule.forChild(routes)

@NgModule({
  declarations: [
    RecordsComponent,
    RecordsListComponent,
    RecordComponent,
    RecordDataDisplay
  ],
  imports: [
    CommonModule,
    FormsModule,
    
    recordsRoutingModule
  ]
})

export class recordsModule { }

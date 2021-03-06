import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { DragulaModule } from 'ng2-dragula'


import { pipesModule } from './../../pipes/pipes.module'
import { UnitsListComponent } from './units-list.component'
import { UnitDetailComponent } from './unit-detail.component'
import { NgSemanticModule } from "ng-semantic"

export { UnitsListComponent, UnitDetailComponent }

@Component({
  template: `<router-outlet></router-outlet>`
})
export class UnitAdminComponent { }

@NgModule({
  declarations: [
    UnitAdminComponent,
    UnitsListComponent,
    UnitDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    DragulaModule,
    NgSemanticModule,

    pipesModule
  ],
  exports: [
    UnitAdminComponent,
    UnitsListComponent,
    UnitDetailComponent
  ]
})

export class unitsAdminModule { }

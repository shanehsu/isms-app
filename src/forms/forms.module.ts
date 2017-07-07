import { NgModule, Component } from '@angular/core';
import { FormListComponent } from './form-list.component'
import { FormComponent } from './form.component'

import { CommonModule }  from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { formControlsModule } from './../controls/form-controls.module'

@Component({
  template: `<router-outlet></router-outlet>`
})
class FormsComponent {}

let routes: Routes = [
  {
    path: 'forms',
    component: FormsComponent,
    children: [
      { path: '', component: FormListComponent },
      { path: ':id', component: FormComponent }
    ]
  }
];

const newsRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes)

@NgModule({
  declarations: [
    FormsComponent,
    FormListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    
    newsRoutingModule,
    formControlsModule
  ]
})

export class formsModule { }

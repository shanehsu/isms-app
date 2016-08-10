import {Component, OnInit}         from '@angular/core'
import {Routes, ROUTER_DIRECTIVES} from '@angular/router'

import {FormFillListComponent}     from './form-fill-list.component'
import {FormComponent}             from './form.component'

@Component({
  selector: 'isms-form',
  template: `<router-outlet></router-outlet>`,
  directives: [ROUTER_DIRECTIVES]
})

@Routes([
  {
    path: '/',
    component: FormFillListComponent,
  },
  {
    path: '/:id',
    component: FormComponent
  }
])

export class FormIndexComponent {}

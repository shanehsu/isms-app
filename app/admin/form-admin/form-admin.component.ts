// Angular 2
import {Component} from '@angular/core'
import {Routes, ROUTER_DIRECTIVES} from '@angular/router'

// 子元件
import {FormListComponent} from './form-list/form-list.component'
import {FormDetailComponent} from './form-detail/form-detail.component'

@Component({
    selector: 'form-admin',
    templateUrl: '/app/admin/form-admin/form-admin.template.html',
    directives: [ROUTER_DIRECTIVES]
})

@Routes([
  {
    path: '/',
    component: FormListComponent,
  },
  {
    path: '/:id',
    component: FormDetailComponent
  }
])

export class FormAdminComponent {
  constructor() {}
}

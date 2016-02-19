// Angular 2
import {Component} from 'angular2/core'
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router'

// 子元件
import {FormListComponent} from './form-list/form-list.component'
import {FormDetailComponent} from './form-detail/form-detail.component'

@Component({
    selector: 'form-admin',
    templateUrl: '/app/admin/form-admin/form-admin.template.html',
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
  {
    path: '/',
    name: 'FormList',
    component: FormListComponent,
    useAsDefault: true
  },
  {
    path: '/:id',
    name: 'FormDetail',
    component: FormDetailComponent
  }
])

export class FormAdminComponent {
  constructor() {}
}

import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {UserListComponent} from './user-list/user-list.component';
import {UserDetailComponent} from './user-detail/user-detail.component';

@Component({
    selector: 'user-admin',
    templateUrl: '/app/admin/user-admin/user-admin.template.html',
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
  {
    path: '/',
    name: 'UserList',
    component: UserListComponent,
    useAsDefault: true
  },
  {
    path: '/:id',
    name: 'UserDetail',
    component: UserDetailComponent,
  }
])


export class UserAdminComponent implements OnInit {
  ngOnInit() {
  }
  
  constructor() {}
}

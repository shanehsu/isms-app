import {Component, OnInit} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES} from '@angular/router';

import {UserListComponent} from './user-list/user-list.component';
import {UserDetailComponent} from './user-detail/user-detail.component';

@Component({
    selector: 'user-admin',
    templateUrl: '/app/admin/user-admin/user-admin.template.html',
    directives: [ROUTER_DIRECTIVES]
})

@Routes([
  {
    path: '/',
    component: UserListComponent,
  },
  {
    path: '/:id',
    component: UserDetailComponent,
  }
])


export class UserAdminComponent implements OnInit {
  ngOnInit() {
  }
  
  constructor() {}
}

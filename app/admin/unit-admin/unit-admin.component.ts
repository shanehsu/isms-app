import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {UnitListComponent} from './unit-list/unit-list.component';
import {UnitDetailComponent} from './unit-detail/unit-detail.component';

@Component({
    selector: 'unit-admin',
    templateUrl: '/app/admin/unit-admin/unit-admin.template.html',
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
  {
    path: '/',
    name: 'UnitList',
    component: UnitListComponent,
    useAsDefault: true
  },
  {
    path: '/:id',
    name: 'UnitDetail',
    component: UnitDetailComponent,
  }
])


export class UnitAdminComponent implements OnInit {
  ngOnInit() {
  }
  
  constructor() {}
}

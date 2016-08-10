import {Component, OnInit} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES} from '@angular/router';

import {UnitListComponent} from './unit-list/unit-list.component';
import {UnitDetailComponent} from './unit-detail/unit-detail.component';

@Component({
    selector: 'unit-admin',
    templateUrl: '/app/admin/unit-admin/unit-admin.template.html',
    directives: [ROUTER_DIRECTIVES]
})

@Routes([
  {
    path: '/',
    component: UnitListComponent,
  },
  {
    path: '/:id',
    component: UnitDetailComponent,
  }
])


export class UnitAdminComponent implements OnInit {
  ngOnInit() {
  }
  
  constructor() {}
}

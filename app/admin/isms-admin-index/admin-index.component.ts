import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {NewsAdminComponent} from './../news-admin/news-admin.component'

@Component({
    selector: 'isms-admin-index',
    templateUrl: '/app/admin/isms-admin-index/admin-index.template.html',
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
  {
    path: '/news',
    name: 'NewsAdmin',
    component: NewsAdminComponent,
    useAsDefault: true
  }
])

export class AdminIndexComponent implements OnInit {
    ngOnInit() {
        
    }
    
    constructor() {}
}

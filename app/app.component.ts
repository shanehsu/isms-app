import {Component, OnInit} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {NavigationComponent} from './isms-nav/navigation.component'
import {AdminIndexComponent} from './admin/isms-admin-index/admin-index.component'
import {NewsComponent}       from './isms-news/news.component'

@Component({
    selector: 'isms-app',
    template:`
    <isms-nav></isms-nav>
    <br>
    <router-outlet></router-outlet>
    `,
    directives: [NavigationComponent, ROUTER_DIRECTIVES]
})

@RouteConfig([
  {
    path:'/news',
    name: 'News',
    component: NewsComponent,
    useAsDefault: true
  }, {
    path: '/admin/...',
    name: 'Admin',
    component: AdminIndexComponent
  }
])

export class AppComponent implements OnInit {
    ngOnInit() {
        
    }
    
    constructor(private _router: Router) {}
}

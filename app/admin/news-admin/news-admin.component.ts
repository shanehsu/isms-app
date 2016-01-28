import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {NewsListComponent} from './news-list/news-list.component'
import {NewsDetailComponent} from './news-detail/news-detail.component'

@Component({
    selector: 'news-admin',
    templateUrl: '/app/admin/news-admin/news-admin.template.html',
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
  {
    path: '/',
    name: 'NewsList',
    component: NewsListComponent,
    useAsDefault: true
  },
  {
    path: '/:id',
    name: 'NewsDetail',
    component: NewsDetailComponent
  }
])

export class NewsAdminComponent implements OnInit {
  ngOnInit() {
  }
  
  constructor() {}
}

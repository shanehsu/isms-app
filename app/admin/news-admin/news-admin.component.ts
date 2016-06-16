import {Component, OnInit} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES} from '@angular/router';

import {NewsListComponent} from './news-list/news-list.component'
import {NewsDetailComponent} from './news-detail/news-detail.component'

@Component({
    selector: 'news-admin',
    templateUrl: '/app/admin/news-admin/news-admin.template.html',
    directives: [ROUTER_DIRECTIVES]
})

@Routes([
  {
    path: '/',
    component: NewsListComponent,
  },
  {
    path: '/:id',
    component: NewsDetailComponent
  }
])

export class NewsAdminComponent implements OnInit {
  ngOnInit() {
  }
  
  constructor() {}
}

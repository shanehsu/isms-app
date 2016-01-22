import {Component, OnInit} from 'angular2/core';
import {NewsService}       from './../../services/news.service'

import {Pipe}              from 'angular2/core';

import {Piece}             from './../../types/piece'

@Component({
    selector: 'isms-news-admin',
    templateUrl: '/app/admin/news-admin/news-admin.template.html',
    providers: [NewsService]
})

export class NewsAdminComponent implements OnInit {
  ngOnInit() {
  }
  
  constructor(private _newsService: NewsService) {}
}

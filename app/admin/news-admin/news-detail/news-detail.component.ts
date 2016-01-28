import {Component, OnInit} from 'angular2/core'

import {Pipe}              from 'angular2/core';

import {Piece}             from './../../../types/piece'

import {NewsService}       from './../../../services/news.service'

import {Router, RouteParams}            from 'angular2/router'

@Component({
    selector: 'news-detail',
    templateUrl: '/app/admin/news-admin/news-detail/news-detail.template.html',
})

export class NewsDetailComponent implements OnInit {
  private _id: string;
  
  ngOnInit() {
    this._id = this._routeParams.get('id')
  }
  
  back() {
    this._router.navigate(['NewsList']);
  }
  
  constructor(private _router: Router, private _routeParams: RouteParams, private _newsService: NewsService) {}
}
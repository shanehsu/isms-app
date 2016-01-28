import {Component, OnInit} from 'angular2/core'
import {Pipe}              from 'angular2/core';
import {Router}            from 'angular2/router'

import {Piece}             from './../../../types/piece'

import {NewsService}       from './../../../services/news.service'

@Component({
    selector: 'news-list',
    templateUrl: '/app/admin/news-admin/news-list/news-list.template.html',
})

export class NewsListComponent implements OnInit {
  private _pieces: Piece[];
  
  ngOnInit() {
    this._pieces = [];
    this._newsService.retrieve().then(pieces => this._pieces = pieces);
  }
  
  edit(id: string) {
    this._router.navigate(['NewsDetail', {'id': id}]);
  }
  
  delete(id: string) {
    let shouldDelete = confirm("確定要刪除嗎？");
    if (shouldDelete) {
      this._newsService.delete(id).then(() => this._newsService.retrieve().then(pieces => this._pieces = pieces))
                                 .catch(() => this._newsService.retrieve().then(pieces => this._pieces = pieces))
    }
  }
  
  constructor(private _router: Router, private _newsService: NewsService) {}
}
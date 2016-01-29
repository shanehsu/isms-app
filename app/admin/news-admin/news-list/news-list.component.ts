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
  private _piecesToKeep: number;
  
  ngOnInit() {
    this._piecesToKeep = 20;
    this._pieces = [];
    this._newsService.retrieve().then(pieces => this._pieces = pieces);
  }
  
  new() {
    this._newsService.create(this._newsService.fake())
        .then(() => this._newsService.retrieve().then(pieces => this._pieces = pieces))
        .catch(() => this._newsService.retrieve().then(pieces => this._pieces = pieces))
  }
  
  deleteExcessive() {
    let piecesToKeep = this._piecesToKeep;
    let length       = this._pieces.length;
    if (piecesToKeep >= this._pieces.length) return;
    
    let shouldDelete = confirm("確定刪除多餘的 " + (length - piecesToKeep) + " 筆消息？");
    if (!shouldDelete) return;
    
    let issuedRequest = 0;
    let receivedResponse = 0;
    
    for (let index = this._piecesToKeep; index < this._pieces.length; index ++) {
      issuedRequest ++;
      this._newsService.delete(this._pieces[index].id)
          .then(() => {
            receivedResponse ++;
            this._newsService.retrieve().then(pieces => this._pieces = pieces)
            
            if (issuedRequest == receivedResponse) {
              this._newsService.retrieve().then(pieces => this._pieces = pieces)
            }
          })
          .catch(() => {
            receivedResponse ++;
            this._newsService.retrieve().then(pieces => this._pieces = pieces)
            
            if (issuedRequest == receivedResponse) {
              this._newsService.retrieve().then(pieces => this._pieces = pieces)
            }
          })
    }
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
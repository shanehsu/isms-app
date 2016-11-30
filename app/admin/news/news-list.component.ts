import {Component, OnInit} from '@angular/core'
import {Pipe}              from '@angular/core';
import {Router, ActivatedRoute}            from '@angular/router'

import {Piece}             from './../../types/piece'

import {NewsService}       from './../../services/news.service'

@Component({
  template: `
  <div class="ui two column grid">
    <div class="ui form left aligned column">
      <div class="inline field">
        <div class="ui right labeled input">
          <div class="ui basic label">留下最新</div>
          <input type="number" style="width: 5em; text-align: center;" min="1" max="99" id="amount" [(ngModel)]="_piecesToKeep">
          <div class="ui basic label">則消息</div>
        </div>
        <button class="ui red button" (click)="deleteExcessive()">刪除</button>
      </div>
    </div>
    <form class="ui form right aligned column">
      <button type="button" class="ui right floated blue labeled icon button" (click)="new()">
        <i class="plus icon"></i>
        新增消息
      </button>
    </form>
  </div>
  <table class="ui striped table">
    <thead>
      <tr>
        <th style="min-width: 10em;">日期</th>
        <th style="min-width: 6em;">來源</th>
        <th style="width: 100%">新聞簡介</th>
        <th style="min-width: 12em;">動作</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let piece of _pieces">
        <td>{{piece.date | chineseDate}}</td>
        <td>{{piece.source}}</td>
        <td>{{piece.summary}}</td>
        <td style="text-align: center;">
          <div class="small ui buttons">
            <button type="button" class="ui basic teal button" (click)="edit(piece.id)">編輯</button>
            <button type="button" class="ui basic red button" (click)="delete(piece.id)">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>`
})

export class NewsListComponent implements OnInit {
  private _pieces: Piece[];
  private _piecesToKeep: number;
  
  ngOnInit() {
    this._piecesToKeep = 20;
    this._pieces = [];
    this.newsService.retrieve().then(pieces => this._pieces = pieces);
  }
  
  new() {
    this.newsService.create(this.newsService.placeholder())
        .then(id => this.edit(id))
        .catch(() => this.newsService.retrieve().then(pieces => this._pieces = pieces))
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
      this.newsService.delete(this._pieces[index].id)
          .then(() => {
            receivedResponse ++;
            this.newsService.retrieve().then(pieces => this._pieces = pieces)
            
            if (issuedRequest == receivedResponse) {
              this.newsService.retrieve().then(pieces => this._pieces = pieces)
            }
          })
          .catch(() => {
            receivedResponse ++;
            this.newsService.retrieve().then(pieces => this._pieces = pieces)
            
            if (issuedRequest == receivedResponse) {
              this.newsService.retrieve().then(pieces => this._pieces = pieces)
            }
          })
    }
  }
  
  edit(id: string) {
    this.router.navigate([id], {relativeTo: this.route});
  }
  
  delete(id: string) {
    let shouldDelete = confirm("確定要刪除嗎？");
    if (shouldDelete) {
      this.newsService.delete(id).then(() => this.newsService.retrieve().then(pieces => this._pieces = pieces))
                                 .catch(() => this.newsService.retrieve().then(pieces => this._pieces = pieces))
    }
  }
  
  constructor(private router: Router, private route: ActivatedRoute, private newsService: NewsService) {}
}
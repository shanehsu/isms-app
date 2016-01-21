import {Component, OnInit} from 'angular2/core';
import {NewsService}       from './../services/news.service'

import {Pipe}              from 'angular2/core';

import {Piece}             from './../types/piece'

@Component({
    selector: 'isms-news',
    template:`
    <div class="container">
      <h2>最新消息</h2>
      <table class="table table-striped" ng-if="state == 1">
          <thead>
              <tr>
                  <th>日期</th>
                  <th>來源</th>
                  <th>新聞簡介</th>
              </tr>
          </thead>
          <tbody>
              <tr *ngFor="#piece of pieces">
                  <td>{{piece.date | date: 'longDate'}}</td>
                  <td>{{piece.source}}</td>
                  <td><a [href]="piece.link">{{piece.summary}}</a></td>
              </tr>
          </tbody>
      </table>
    </div>
    `,
    providers: [NewsService]
})

export class NewsComponent implements OnInit {
  private pieces: Piece[];
  
  ngOnInit() {
    this.pieces = [];
    this._newsService.retrieve().then(pieces => this.pieces = pieces).then(pieces => console.log(pieces));
  }
  
  constructor(private _newsService: NewsService) {}
}

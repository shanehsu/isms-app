import {Component, OnInit} from 'angular2/core';
import {NewsService}       from './../services/news.service'

import {Pipe}              from 'angular2/core';

import {Piece}             from './../types/piece'

@Component({
    selector: 'isms-news',
    templateUrl: '/app/isms-news/news.template.html',
    providers: [NewsService]
})

export class NewsComponent implements OnInit {
  private pieces: Piece[];
  
  ngOnInit() {
    this.pieces = [];
    this._newsService.retrieve().then(pieces => this.pieces = pieces);
  }
  
  constructor(private _newsService: NewsService) {}
}

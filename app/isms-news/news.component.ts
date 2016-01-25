import {Component, OnInit} from 'angular2/core';
import {NewsService}       from './../services/news.service'

import {Pipe}              from 'angular2/core';

import {Piece}             from './../types/piece'

@Component({
    selector: 'isms-news',
    templateUrl: '/app/isms-news/news.template.html'
})

export class NewsComponent implements OnInit {
  private currentPage: number;
  private piecesView: Piece[];
  
  private pieces: Piece[];
  
  ngOnInit() {
    this.currentPage = 1;
    this.pieces = [];
    this._newsService.retrieve().then(pieces => {
      this.pieces = pieces;
      this.piecesView = this.pieces.slice(0, 10);
    });
  }
  
  older() {
    this.currentPage ++;
  }
  
  newer() {
    this.currentPage --;
  }
  
  constructor(private _newsService: NewsService) {}
}

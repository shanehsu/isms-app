import {Component, OnInit} from 'angular2/core';
import {NewsService}       from './../services/news.service'

import {Pipe}              from 'angular2/core';
import {ChineseDatePipe}   from '../pipes/pipes'

import {Piece}             from './../types/piece'

@Component({
    selector: 'isms-news',
    templateUrl: '/app/isms-news/news.template.html',
    pipes: [ChineseDatePipe]
})

export class NewsComponent implements OnInit {
  private currentPage: number;
  private piecesView: Piece[];
  
  private pieces: Piece[];
  
  private hasOlder: boolean;
  private hasNewer: boolean;
  
  ngOnInit() {
    this.hasNewer = false;
    this.currentPage = 1;
    this.pieces = [];
    this._newsService.retrieve().then(pieces => {
      this.pieces = pieces;
      this.piecesView = this.pieces.slice(0, 10);
      this.hasOlder = (pieces.length > 10);
    });
  }
  
  older() {
    if (!this.hasOlder) return;
    this.hasNewer = true;
    this.currentPage ++;
    this.hasOlder = this.pieces.length > this.currentPage * 10;
    
    this.piecesView = this.pieces.slice((this.currentPage - 1) * 10, this.currentPage * 10);
  }
  
  newer() {
    if(!this.hasNewer) return;
    this.hasOlder = true;
    this.currentPage --;
    this.hasNewer = this.currentPage > 1;
    
    this.piecesView = this.pieces.slice((this.currentPage - 1) * 10, this.currentPage * 10);
  }
  
  constructor(private _newsService: NewsService) {}
}

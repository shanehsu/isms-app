import {Component, OnInit} from '@angular/core';
import {NewsService}       from './../services/news.service'

import {Piece}             from './../types/piece'

@Component({
  template: `
  <h2 class="ui header">最新消息</h2>
  <table class="ui padded basic striped table">
    <thead>
      <tr>
        <th style="width: 13em">日期</th>
        <th style="width: 13em">來源</th>
        <th>新聞簡介</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let piece of piecesView">
        <td>{{piece.date | chineseDate}}</td>
        <td>{{piece.source}}</td>
        <td><a [href]="piece.link">{{piece.summary}}</a></td>
      </tr>
    </tbody>
    <tfoot class="full-width">
      <tr>
        <th colspan="3" style="padding: 0.5em 0.5em;">
          <div class="ui right floated mini pagination menu">
            <a class="icon item" [class.disabled]="!hasNewer" (click)="newer()"><i class="left chevron icon"></i></a>
            <a class="icon item" [class.disabled]="!hasOlder" (click)="older()"><i class="right chevron icon"></i></a>
          </div>
        </th>
      </tr>
    </tfoot>
  </table>
  `
})

export class NewsComponent implements OnInit {
  private currentPage: number
  private piecesView: Piece[]
  
  private pieces: Piece[]
  
  private hasOlder: boolean
  private hasNewer: boolean
  
  ngOnInit() {
    this.hasNewer = false
    this.currentPage = 1
    this.pieces = []
    this.piecesView = []
    this.newsService.retrieve().then(pieces => {
      this.pieces = pieces
      this.piecesView = this.pieces.slice(0, 10)
      this.hasOlder = (pieces.length > 10)
    })
  }
  
  older() {
    if (!this.hasOlder) return
    this.hasNewer = true
    this.currentPage ++
    this.hasOlder = this.pieces.length > this.currentPage * 10
    
    this.piecesView = this.pieces.slice((this.currentPage - 1) * 10, this.currentPage * 10)
  }
  
  newer() {
    if(!this.hasNewer) return
    this.hasOlder = true
    this.currentPage --
    this.hasNewer = this.currentPage > 1
    
    this.piecesView = this.pieces.slice((this.currentPage - 1) * 10, this.currentPage * 10)
  }
  
  constructor(private newsService: NewsService) {}
}

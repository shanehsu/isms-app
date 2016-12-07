import { Component, OnInit } from '@angular/core'

import { NewsService }       from './../services/news.service'
import { Piece }             from './../types/piece'

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
      <tr style="height: 8em;" *ngIf="!isLoading && piecesView && piecesView.length == 0">
        <td style="text-align: center; font-size: 1.4em; color: rgb(160, 160, 160);" colspan="3">無資料</td>
      </tr>
      <tr style="height: 8em;" *ngIf="isLoading">
        <td style="text-align: center; font-size: 1.4em; color: rgb(160, 160, 160);" colspan="3">
          載入中 <i class="spinner loading icon"></i>
        </td>
      </tr>
      <tr style="height: 8em;" *ngIf="hasError">
        <td style="text-align: center; font-size: 1.4em; color: rgb(160, 160, 160); margin-bottom: 0em;" colspan="3">
          <p>
            載入錯誤 <i class="warning sign icon"></i>
          </p>
          <a style="font-size: 0.5em; color: #7e8bb3;" class="link" (click)="load()">重新載入？</a>
        </td>
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
  private isLoading: boolean
  private currentPage: number
  private piecesView: Piece[]
  
  private pieces: Piece[]
  
  private hasOlder: boolean
  private hasNewer: boolean
  private hasError: boolean

  ngOnInit() {
    this.load()
  }
  
  private load(): void {
    this.isLoading = true
    this.hasError = false

    this.hasNewer = false
    this.hasOlder = false

    this.currentPage = 1
    this.pieces = []
    this.piecesView = []

    this.newsService.retrieve().then(pieces => {
      this.isLoading = false
      this.pieces = pieces
      this.piecesView = this.pieces.slice(0, 10)
      this.hasOlder = (pieces.length > 10)
    }).catch(_ => this.hasError = true )
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

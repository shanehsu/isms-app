import { Component, OnInit } from '@angular/core'
import { Pipe } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

import { Piece } from './../../types/piece'

import { NewsService } from './../../services/news.service'
import { MessageService } from './../../services/message.service'

enum PieceState {
  Normal = 1,
  Deleting = 2,
  Errored = 3
}

@Component({
  template: `
  <div class="ui two column grid">
    <div class="ui form left aligned column">
      <div class="inline field">
        <div class="ui right labeled input">
          <div class="ui basic label">留下最新</div>
          <input type="number" style="width: 5em; text-align: center;" value="1" min="1" max="99" id="amount" #keepInput>
          <div class="ui basic label">則消息</div>
        </div>
        <button class="ui red button" (click)="deleteExcessive(keepInput.value)">刪除</button>
      </div>
    </div>
    <form class="ui form right aligned column">
      <button type="button" class="ui right floated blue labeled icon button" [class.loading]="creating" (click)="create()">
        <i class="plus icon"></i>
        新增消息
      </button>
    </form>
  </div>
  <table class="ui striped table">
    <thead>
      <tr>
        <th style="min-width: 12em;">日期</th>
        <th style="min-width: 6em;">來源</th>
        <th style="width: 100%">新聞簡介</th>
        <th style="min-width: 12em;">動作</th>
      </tr>
    </thead>
    <tbody>
      <!-- 訊息 -->
      <tr style="height: 8em;" *ngIf="!loading && pieces && pieces.length == 0">
        <td style="text-align: center; font-size: 1.4em; color: rgb(160, 160, 160);" colspan="4">
          無資料
        </td>
      </tr>
      <tr style="height: 8em;" *ngIf="loading">
        <td style="text-align: center; font-size: 1.4em; color: rgb(160, 160, 160);" colspan="4">
          載入中 <i class="spinner loading icon"></i>
        </td>
      </tr>
      <tr style="height: 8em;" *ngIf="!loading && error">
        <td style="text-align: center; font-size: 1.4em; color: rgb(160, 160, 160); margin-bottom: 0em;" colspan="4">
          <p>
            載入錯誤 <i class="warning sign icon"></i>
          </p>
          <a style="font-size: 0.5em; color: #7e8bb3;" class="link" (click)="reload()">重新載入？</a>
        </td>
      </tr>

      <tr *ngFor="let piece of pieces" [class.warning]="states[piece.id] == 2" [class.error]="states[piece.id] == 3">
        <td>{{piece.date | chineseDate}}</td>
        <td>{{piece.source}}</td>
        <td>{{piece.summary}}</td>
        <td style="text-align: center;">
          <div class="small ui buttons">
            <button type="button" class="ui basic teal button" (click)="edit(piece.id)">編輯</button>
            <button type="button" class="ui basic red button"  (click)="delete(piece.id)" [class.loading]="states[piece.id] == 2">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>`
})

export class NewsListComponent implements OnInit {
  // 載入狀態
  private loading: boolean
  private loadingError: any

  // 新增狀態
  private creating: boolean

  // 新聞狀態（正常、刪除中、錯誤）
  private states: { [id: string]: PieceState }

  // 新聞
  private pieces: Piece[]

  ngOnInit() {
    this.creating = false
    this.reload()
  }
  private reload() {
    this.pieces = []
    this.states = {}

    this.loading = true
    this.loadingError = undefined

    this.newsService.retrieve().then(pieces => {
      for (let piece of pieces) {
        this.states[piece.id] = PieceState.Normal
      }
      this.pieces = pieces

      this.loading = false
    }).catch(err => {
      this.loading = false
      this.loadingError = err
    })
  }
  private create() {
    this.creating = true
    this.newsService.create()
      .then(id => {
        this.edit(id)
        this.creating = false
      })
      .catch(err => {
        this.creating = false
      })
  }
  private deleteExcessive(keep: string) {
    let piecesToKeep = +keep
    let length = this.pieces.length
    if (piecesToKeep >= this.pieces.length) return

    let shouldDelete = confirm("確定刪除多餘的 " + (length - piecesToKeep) + " 筆消息？")
    if (!shouldDelete) return

    for (let index = piecesToKeep; index < this.pieces.length; index++) {
      let id = this.pieces[index].id
      this.delete(id)
    }
  }
  private edit(id: string) {
    this.router.navigate([id], { relativeTo: this.route })
  }
  private delete(id: string) {
    let shouldDelete = confirm("確定要刪除嗎？");
    if (shouldDelete) {
      // 設定狀態
      this.states[id] = PieceState.Deleting

      this.newsService.delete(id).then(_ => {
        delete this.states[id]
        this.pieces.splice(this.pieces.findIndex(x => x.id == id), 1)
      }).catch(() => {
        this.states[id] = PieceState.Errored
        this.messageService.post({
          header: '刪除失敗',
          content: '刪除失敗，資料與伺服器可能不同步，請考慮重整網頁。',
          icon: 'remove',
          class: 'error'
        }, -1)
      })
    }
  }
  constructor(private router: Router, private route: ActivatedRoute, private newsService: NewsService, private messageService: MessageService) { }
}
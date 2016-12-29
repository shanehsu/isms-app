import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormGroup } from '@angular/forms'

import { Piece } from './../../types/piece'
import { NewsService } from './../../services/news.service'
import { MessageService } from './../../services/message.service'

@Component({
  template: `
    <form class="ui dimmable basic segment form" [class.loading]="loading" [class.dimmed]="updatingError || loadingError" #pieceForm="ngForm">
      <div class="ui simple blurring dimmer">
        <div class="content">
          <div class="center">
            <a class="link" (click)="reload()" style="font-size: 1.5em; color: #7e8bb3;">重新載入？</a>
          </div>
        </div>
      </div>

      <div class="field">
        <label>ID</label>
        <p>{{piece.id}}</p>
      </div>
      <div class="field">
        <label>日期</label>
        <form-control type="date" [(ngModel)]="piece.date" name="date"></form-control>
      </div>
      <div class="field">
        <label>簡介</label>
        <input type="text" [(ngModel)]="piece.summary" name="summary" required>
      </div>
      <div class="field">
        <label>來源</label>
        <input type="text" [(ngModel)]="piece.source" name="source" required>
      </div>
      <div class="field">
        <label>連結</label>
        <input type="text" [(ngModel)]="piece.link" name="link">
      </div>
      
      <div style="text-align: right;">
        <button type="button" class="ui grey button" (click)="return()">返回</button>
        <button type="button" class="ui button" [class.blue]="pieceForm.form.valid" [class.red]="!pieceForm.form.valid" 
          [class.loading]="updating" [disabled]="!pieceForm.form.valid" (click)="update()">更新</button>
        <button type="button" class="ui button" [class.green]="pieceForm.form.valid" [class.red]="!pieceForm.form.valid"
          [class.loading]="updating" [disabled]="!pieceForm.form.valid" (click)="updateAndReturn()">更新並返回</button>
      </div>
    </form>
    `
})

export class NewsDetailComponent implements OnInit {
  private piece: Piece

  private loading: boolean
  private loadingError: any | null
  private updating: boolean
  private updatingError: any | null

  ngOnInit() {
    this.loading = true
    this.updating = false
    this.loadingError = null
    this.updatingError = null

    this.piece = this.newsService.placeholder()

    this.route.params.subscribe((params: { id: string }) => {
      this.reload(params.id)
    })
  }
  private reload(id: string) {
    this.loading = true
    this.updatingError = null
    this.loadingError = null
    this.piece = this.newsService.placeholder()

    this.newsService.retrievePiece(id).then(piece => {
      this.loading = false
      this.piece = piece
    }).catch(err => {
      this.loadingError = err
      this.messageService.post({
        icon: 'remove',
        class: 'error',
        header: '載入失敗',
        content: '載入新聞失敗'
      })
      this.loading = false
    })
  }
  private update() {
    this.updating = true
    this.updatingError = null

    this.newsService.update(this.piece)
      .then(() => {
        this.updating = false
        this.reload(this.piece.id)
      })
      .catch(err => {
        this.updating = false
        this.updatingError = err
      })
  }
  private updateAndReturn() {
    this.updating = true
    this.updatingError = null

    this.newsService.update(this.piece)
      .then(() => {
        this.updating = false
        this.return()
      })
      .catch(err => {
        this.updating = false
        this.updatingError = err
      })
  }
  private return() {
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  constructor(private router: Router, private route: ActivatedRoute,
    private newsService: NewsService, private messageService: MessageService) { }
}

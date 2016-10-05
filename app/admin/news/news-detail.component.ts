import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {FormGroup, Validators} from '@angular/forms'

import {Piece}             from './../../types/piece'
import {NewsService}       from './../../services/news.service'

import {Router} from '@angular/router'

@Component({
    template: `
    <form class="ui form" (ngSubmit)="submit()" #pieceForm="ngForm">
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
        <button type="button" class="ui basic button" (click)="cancel()">取消</button>
        <button type="submit" class="ui basic button" [class.green]="pieceForm.form.valid" [class.red]="!pieceForm.form.valid" [disabled]="!pieceForm.form.valid">更新</button>
      </div>
    </form>
    `
})

export class NewsDetailComponent implements OnInit {
  private id: string;
  private piece: Piece;
  
  ngOnInit() {
    this.piece = this.newsService.fake()
    this.id = this.route.snapshot.params['id']
    this.newsService.retrievePiece(this.id).then(piece => this.piece = piece)
  }
  
  submit() {
    this.newsService.update(this.piece).then(piece => this.router.navigate(['..'], {relativeTo: this.route}))
                                         .catch(err => console.error(err));
  }
  
  cancel() {
    this.router.navigate(['..'], {relativeTo: this.route});
  }
  
  constructor(private router: Router,
              private route: ActivatedRoute,
              private newsService: NewsService) {  }
}

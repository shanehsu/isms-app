"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const router_1 = require('@angular/router');
const news_service_1 = require('./../../services/news.service');
const router_2 = require('@angular/router');
let NewsDetailComponent = class NewsDetailComponent {
    constructor(router, route, newsService) {
        this.router = router;
        this.route = route;
        this.newsService = newsService;
    }
    ngOnInit() {
        this.piece = this.newsService.placeholder();
        this.id = this.route.snapshot.params['id'];
        this.newsService.retrievePiece(this.id).then(piece => this.piece = piece);
    }
    submit() {
        this.newsService.update(this.piece).then(piece => this.router.navigate(['..'], { relativeTo: this.route }))
            .catch(err => console.error(err));
    }
    cancel() {
        this.router.navigate(['..'], { relativeTo: this.route });
    }
};
NewsDetailComponent = __decorate([
    core_1.Component({
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
    }), 
    __metadata('design:paramtypes', [router_2.Router, router_1.ActivatedRoute, news_service_1.NewsService])
], NewsDetailComponent);
exports.NewsDetailComponent = NewsDetailComponent;
//# sourceMappingURL=news-detail.component.js.map
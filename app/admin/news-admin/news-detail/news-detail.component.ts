import {Component, OnInit} from '@angular/core'
import {NgForm}    from '@angular/common';

import {Piece}             from './../../../types/piece'

import {NewsService}       from './../../../services/news.service'

import {Router, RouteSegment} from '@angular/router'

import {DateFormControl}        from './../../../controls/isms-form-controls'

@Component({
    selector: 'news-detail',
    templateUrl: '/app/admin/news-admin/news-detail/news-detail.template.html',
    directives: [DateFormControl]
})

export class NewsDetailComponent implements OnInit {
  private _id: string;
  private _piece: Piece;
  
  ngOnInit() {
    this._piece = this._newsService.fake();
    this._id = this._routeSegment.getParam('id')
    this._newsService.retrievePiece(this._id).then(piece => this._piece = piece);
  }
  
  submit() {
    this._newsService.update(this._piece).then(piece => this._router.navigate(['/admin/news']))
                                         .catch(err => console.error(err));
  }
  
  cancel() {
    this._router.navigate(['/admin/news']);
  }
  
  constructor(private _router: Router, private _routeSegment: RouteSegment, private _newsService: NewsService) {}
}
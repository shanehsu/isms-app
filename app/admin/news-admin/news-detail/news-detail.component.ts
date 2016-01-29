import {Component, OnInit} from 'angular2/core'
import {NgForm}    from 'angular2/common';

import {Pipe}              from 'angular2/core';

import {Piece}             from './../../../types/piece'

import {NewsService}       from './../../../services/news.service'

import {Router, RouteParams}            from 'angular2/router'

import {DatePicker}        from './../../../controls/datepicker/datepicker.component'

@Component({
    selector: 'news-detail',
    templateUrl: '/app/admin/news-admin/news-detail/news-detail.template.html',
    directives: [DatePicker]
})

export class NewsDetailComponent implements OnInit {
  private _id: string;
  private _piece: Piece;
  
  ngOnInit() {
    this._piece = this._newsService.fake();
    this._id = this._routeParams.get('id')
    this._newsService.retrievePiece(this._id).then(piece => this._piece = piece);
  }
  
  submit() {
    this._newsService.update(this._piece).then(piece => this._router.navigate(['NewsList']))
                                         .catch(err => console.error(err));
  }
  
  cancel() {
    this._router.navigate(['NewsList']);
  }
  
  constructor(private _router: Router, private _routeParams: RouteParams, private _newsService: NewsService) {}
}
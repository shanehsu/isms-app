import {Component, OnInit} from 'angular2/core';
import {NewsService}       from './../../services/news.service'

import {Pipe}              from 'angular2/core';

import {Piece}             from './../../types/piece'

@Component({
    selector: 'news-admin',
    templateUrl: '/app/admin/news-admin/news-admin.template.html'
})

export class NewsAdminComponent implements OnInit {
  private _pieces: Piece[];
  
  ngOnInit() {
    this._pieces = [];
    this._newsService.retrieve().then(pieces => this._pieces = pieces);
  }
  
  edit(id: string) {
    console.log('I will edit!')
  }
  
  delete(id: string) {
    console.log('I will delete')
  }
  
  constructor(private _newsService: NewsService) {}
}

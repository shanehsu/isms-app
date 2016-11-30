import {Inject, Injectable} from '@angular/core';
import {Http, Headers, URLSearchParams} from '@angular/http';
import {Piece} from './../types/piece';

import {AuthService} from './auth.service'

@Injectable()
export class NewsService {
  private _baseURL: string;

  constructor(private _http: Http, private _authService: AuthService, @Inject("app.config") private _config) {
    this._baseURL = _config.endpoint + '/news';
  }
  
  placeholder() : Piece {
    return new Piece({
      _id: '4e7020cb7cac81af7136236b', date: new Date(),
      summary: '新聞簡述', source: '新聞來源', link: 'http://www.google.com/'
    })
  }

  retrieve() {
    return new Promise<Piece[]>((resolve, reject) =>
      this._http.get(this._baseURL)
        .map(res => res.json())
        .subscribe((data: any[]) => resolve(data.map(p => new Piece(p))), err => reject(err))
    )
  }

  retrievePage(page: number) {
    let params = new URLSearchParams()
    params.set('page', page.toString());

    return new Promise<Piece[]>((resolve, reject) =>
      this._http.get(this._baseURL, {
        search: params
      }).map(res => res.json())
        .subscribe((data: any[]) => resolve(data.map(p => new Piece(p))), err => reject(err))
    )
  }
  
  retrievePiece(id: string) : Promise<Piece> {
    return new Promise<Piece>((resolve, reject) =>
      this._http.get(this._baseURL + '/' + id)
        .map(response => response.json())
        .subscribe(data => resolve(new Piece(data)), err  => reject(err))
    );
  }
  
  create(piece: Piece) {
    return new Promise<string>((resolve, reject) => {
      let header = new Headers({
        token: this._authService.retrieve_token(),
        'Content-Type': 'application/json'
      });

      this._http.post(this._baseURL, '', {
        headers: header
      })
        .map(res => res.text())
        .subscribe(
          id => {
            resolve(id);
          },
          err => reject()
        )
    });
  }

  update(piece: Piece) {
    return new Promise<void>((resolve, reject) => {
      let header = new Headers({
        token: this._authService.retrieve_token(),
        'Content-Type': 'application/json'
      });
      
      this._http.put(this._baseURL + '/' + piece.id, JSON.stringify({
        date: piece.date,
        link: piece.link,
        source: piece.source,
        summary: piece.summary
      }), {
        headers: header
      }).subscribe(_ => resolve(), err => reject(err))
    })
  }

  delete(id: string) {
    return new Promise<void>((resolve, reject) => {
      let header = new Headers({
        token: this._authService.retrieve_token()
      });

      this._http.delete(this._baseURL + '/' + id, {
        headers: header
      }).map(res => res.status)
      .subscribe(_ => resolve(), err => reject())
    });
  }
}
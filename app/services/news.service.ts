import { Inject, Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Piece } from './../types/piece';

import { AuthService } from './auth.service'

@Injectable()
export class NewsService {
  private baseURL: string;

  constructor(private http: Http, private authService: AuthService, @Inject("app.config") config) {
    this.baseURL = config.endpoint + '/news';
  }

  placeholder(): Piece {
    return new Piece({
      _id: '4e7020cb7cac81af7136236b', date: new Date(),
      summary: '載入中...', source: '載入中...', link: '載入中...'
    })
  }

  retrieve() {
    return new Promise<Piece[]>((resolve, reject) =>
      this.http.get(this.baseURL)
        .map(res => res.json())
        .subscribe((data: any[]) => resolve(data.map(p => new Piece(p))), err => reject(err))
    )
  }

  retrievePage(page: number) {
    let params = new URLSearchParams()
    params.set('page', page.toString());

    return new Promise<Piece[]>((resolve, reject) =>
      this.http.get(this.baseURL, {
        search: params
      }).map(res => res.json())
        .subscribe((data: any[]) => resolve(data.map(p => new Piece(p))), err => reject(err))
    )
  }

  retrievePiece(id: string): Promise<Piece> {
    return new Promise<Piece>((resolve, reject) =>
      this.http.get(this.baseURL + '/' + id)
        .map(response => response.json())
        .subscribe(data => resolve(new Piece(data)), err => reject(err))
    );
  }

  create() {
    return new Promise<string>((resolve, reject) => {
      let header = new Headers({
        token: this.authService.token.getValue()
      });

      this.http.post(this.baseURL, '', {
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
        token: this.authService.token.getValue(),
        'Content-Type': 'application/json'
      });

      this.http.put(this.baseURL + '/' + piece.id, JSON.stringify({
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
        token: this.authService.token.getValue()
      });

      this.http.delete(this.baseURL + '/' + id, {
        headers: header
      }).map(res => res.status)
        .subscribe(_ => resolve(), err => reject())
    });
  }
}
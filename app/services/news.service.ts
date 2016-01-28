import {Inject, Injectable} from 'angular2/core';
import {Http, Headers, URLSearchParams} from 'angular2/http';
import {Piece} from './../types/piece';

import {AuthService} from './auth.service'

@Injectable()
export class NewsService {
  private _baseURL: string;

  constructor(private _http: Http, private _authService: AuthService, @Inject("app.config") private _config) {
    this._baseURL = _config.endpoint + '/pieces';
  }

  retrieve() {
    return new Promise<Piece[]>((resolve, reject) =>
      this._http.get(this._baseURL)
        .map(response => response.json())
        .subscribe(
          function(data) {
            var pieces: Piece[] = [];
            for (var piece of data) {
              pieces.push({
                id: piece._id,
                date: new Date(piece.date),
                summary: piece.summary,
                source: piece.source,
                link: piece.link
              });
            }
            resolve(pieces);
          },
          err  => {
            reject();
            console.error(err)
          }
        )
    );
  }

  retrieveFromDate(fromDate: Date) {
    let params = new URLSearchParams();
    params.set('fromDate', fromDate.toISOString());

    return new Promise<Piece[]>((resolve, reject) =>
      this._http.get(this._baseURL, {
        search: params
      }).map(response => response.json())
        .subscribe(
          function(data) {
            var pieces: Piece[] = [];
            for (var piece of data) {
              pieces.push({
                id: piece._id,
                date: new Date(piece.date),
                summary: piece.summary,
                source: piece.source,
                link: piece.link
              });
            }
            resolve(pieces);
          },
          err  => {
            reject();
            console.error(err)
          }
        )
    );
  }

  create(piece: Piece) {
    return new Promise<Piece>((resolve, reject) => {
      let object = {
        date: piece.date.toISOString(),
        summary: piece.summary,
        source: piece.source,
        link: piece.link
      };

      let header = new Headers({
        token: this._authService.retrieve_token(),
        'Content-Type': 'application/json'
      });

      this._http.post(this._baseURL, JSON.stringify(object), header)
                .map(res => res.json())
                .subscribe(
                  data => {
                    var piece: Piece;
                    piece.id = data._id;
                    piece.date = new Date(data.date);
                    piece.link = data.link;
                    piece.source = data.source;
                    piece.summary = data.summary;

                    resolve(piece);
                  },
                  err => reject()
                )
    });
  }

  update(piece: Piece) {
    return new Promise<Piece>((resolve, reject) => {
      let header = new Headers({
        token: this._authService.retrieve_token(),
        'Content-Type': 'application/json'
      });
      
      this._http.put(this._baseURL + '/' + piece.id, JSON.stringify({
        date: piece.date,
        link: piece.link,
        source: piece.source,
        summary: piece.summary
      }), header)
        .map(res => res.json())
        .subscribe(
          data => {
            var piece: Piece;
            piece.id = data._id;
            piece.date = new Date(data.date);
            piece.link = data.link;
            piece.source = data.source;
            piece.summary = data.summary;

            resolve(piece);
          },
          err => reject()
        )
    });
  }

  delete(id: string) {
    return new Promise<void>((resolve, reject) => {
      let header = new Headers({
        token: this._authService.retrieve_token()
      });

      this._http.delete(this._baseURL + '/' + id, header)
                .map(res => res.status)
                .subscribe(
                  data => {
                    if (data == 200) {
                      resolve();
                    } else {
                      reject();
                    }
                  },
                  err => reject()
                )
    });
  }
}
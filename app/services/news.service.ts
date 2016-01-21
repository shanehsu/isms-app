import {Inject, Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Piece} from './../types/piece';

@Injectable()
export class NewsService {
  private _baseURL: string;
  
  constructor(private _http: Http, @Inject("app.config") private _config) {
    this._baseURL = _config.endpoint + '/pieces';
  }
  
  retrieve(fromDate = Date()) {
    return new Promise<Piece[]>(resolve => 
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
            err  => console.error(err),
            ()   => console.log("HTTP GET Complete.")
          )
    );
  }
}
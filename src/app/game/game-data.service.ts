import { AuthenticationService } from '../user/authentication.service';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Hiscore } from './models/hiscore.model';

@Injectable()
export class GameDataService {
  private _appUrl = '/API';
  private _hiscores;

  constructor(private http: Http, private auth: AuthenticationService) {
  }

  get hiscores(): Observable<Hiscore[]> {
    return this.http.get(`${this._appUrl}/hiscores`, { headers: new Headers({Authorization: `Bearer ${this.auth.token}`}) })
      .map(response => response.json().map(item => Hiscore.fromJSON(item)));

  }

  getHiscore(id): Observable<Hiscore> {
    return this.http.get(`${this._appUrl}/hiscore/${id}`)
      .map(response => response.json()).map(item => Hiscore.fromJSON(item));
  }

  addNewHiscore(rec): Observable<Hiscore> {
    return this.http.post(`${this._appUrl}/hiscores`, rec, { headers: new Headers({Authorization: `Bearer ${this.auth.token}`}) })
      .map(res => res.json()).map(item => Hiscore.fromJSON(item));
  }

  addCommentToHiscore(comment: String, hiscore: Hiscore): Observable<String> {
    return this.http.post(`${this._appUrl}/hiscore/${hiscore.id}/comments`, comment)
      .map(res => res.json()).map(item => item /*Ingredient.fromJSON(item)*/);//geeft als result alle comments terug, gewone String objecten
      //dus is er geen fromJson conversie nodig.
  }

  removeHiscore(rec) {
    return this.http.delete(`${this._appUrl}/hiscore/${rec.id}`).map(res => res.json()).map(item => Hiscore.fromJSON(item));
  }
}
import { AuthenticationService } from '../user/authentication.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Hiscore } from '../game/models/hiscore.model';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable()
export class HiscoreDataService {
  private _appUrl = '/API/hiscores';
  private _hiscores;

  constructor(private http: HttpClient, private auth: AuthenticationService) {
  }

  get hiscores(): Observable<Hiscore[]> {
    // return this.http.get(`${this._appUrl}/hiscores/`, { headers: new Headers({Authorization: `Bearer ${this.auth.token}`}) })
    //   .map(response => response.json().map(item => Hiscore.fromJSON(item)));
    return this.http
      .get(`${this._appUrl}/`)
      .pipe(map((list: any[]): Hiscore[] => list.map(Hiscore.fromJSON)));
  }

  bestHiscore(): Observable<Hiscore> {  
        //{ headers: new Headers({ Authorization: `Bearer ${this.auth.token}` })} ) Dit is voor http, niet httpClient

//     let headers = new HttpHeaders();
// // headers = headers.append("Authorization", "Basic " + btoa("username:password"));
// headers = headers.append("Authorization", `Bearer ${this.auth.token}`);
// headers = headers.append("Content-Type", "application/x-www-form-urlencoded"); 
//return this.http.get<Hiscore>(`${this._appUrl}/bestHiscore/`);
    return this.http
    .get(`${this._appUrl}/bestHiscore/`/*, {headers: headers}*/)
    .pipe(map(Hiscore.fromJSON));
  }

  getHiscore(id): Observable<Hiscore> {
    return this.http
      .get(`${this._appUrl}/hiscore/${id}`)
      .pipe(map(Hiscore.fromJSON));
  }

  addNewHiscore(hiscore: Hiscore): Observable<Hiscore> {
    console.log("adding new hiscore to db: ");
    console.log(hiscore);
    return this.http
      .post(`${this._appUrl}/new/`, hiscore)
      .pipe(map(Hiscore.fromJSON));
  }


  // addCommentToHiscore(comment: String, hiscore: Hiscore): Observable<String> {
  //   return this.http.post(`${this._appUrl}/hiscore/${hiscore.id}/comments`, comment)
  //     .map(res => res.json()).map(item => item /*Ingredient.fromJSON(item)*/);//geeft als result alle comments terug, gewone String objecten
  //     //dus is er geen fromJson conversie nodig.
  // }

  removeHiscore(recId: string): Observable<Hiscore> {
    return this.http
      .delete(`${this._appUrl}/delete/${recId}`)
      .pipe(map(Hiscore.fromJSON));
  }

}
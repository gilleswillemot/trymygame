import { Component, OnInit } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Hiscore } from '../game/models/hiscore.model';
import { HiscoreDataService } from './hiscore-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../user/authentication.service'

@Component({
  selector: 'app-hiscores',
  templateUrl: './hiscores.component.html',
  styleUrls: ['./hiscores.component.css'],
  // providers:  [HiscoreDataService] Is al in app module gedaan omdat gameCanvasComponent de service ook nodig heeft.
})
export class HiscoresComponent implements OnInit {

  //hiscoreVerwijderd: boolean = false;
  private hiscoreId: string;//id of the hiscore that might get deleted.
  public removeButtonClicked: boolean = false;
  private _hiscores: Hiscore[];
  public errorMsg: string;
  public staticAlertClosed: boolean = true;
  public _username: string;

  constructor(private _hiscoreDataService: HiscoreDataService, private _authenticationService: AuthenticationService) { }

  ngOnInit() {
    //ToDo eerst gewoon lichte data van hiscores ophalen, bij klik alle data van die specifieke hiscore ophalen

    this._hiscoreDataService.hiscores.subscribe(
      hiscores => (this._hiscores = hiscores.sort((a, b) => b.kills - a.kills)),
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${error.status} while trying to retrieve recipes: ${error.error}`;
      }
    );

    this._authenticationService.user$.subscribe(item => this._username = item);

    /**Test data */
    // this._hiscores = [];
    // this._hiscores[0] = new Hiscore(250, 2, 5);
    // this._hiscores[1] = new Hiscore(500, 4, 12);
    // this._hiscores[2] = new Hiscore(750, 3, 18);
    // for(let i = 0; i < this._hiscores.length; i++){
    //   this._hiscores[i].id = i.toString();
    // }
  }

  get username() {
    return this._username;
  }

  get hiscores() {
    return this._hiscores;
  }

  public beforeChange($event: NgbPanelChangeEvent) {
    if (this.removeButtonClicked)//als het niet leeg is, moet misschien this.hiscoreId == "" zijn
    {
      $event.preventDefault();

      console.log("verwijderen gedaan, niets meer");
      // this.removeHiscore();

    }//else -> aangeklikte hiscore informatie tonen
    console.log("hiscore info tonen");

  };

  public removeHiscore(verwijderen: boolean) {
    console.log(this._hiscores);
    if (verwijderen) {//if used confirmed that the hiscore should be deleted.
      this._hiscoreDataService.removeHiscore(this.hiscoreId).subscribe(
        item => (this._hiscores = this._hiscores.filter(val => item.id !== val.id)),
        (error: HttpErrorResponse) => {
          this.staticAlertClosed = false;
          setTimeout(() => this.staticAlertClosed = true, 5000);
          this.errorMsg = `${error.error}`;
        }
      );
    }
    //this._hiscores = this._hiscores.filter(val => /*item.id*/ this.hiscoreId !== val.id);
    console.log(this._hiscores);
    this.removeButtonClicked = false;
    this.hiscoreId = "";
  }

  public scoreText(score: number): string {
    let text = "";
    if (score > 700) text = "ME ME ME mEEEET YOUR MAKER!";
    else if (score > 400) text = "Ki ki killlllllling spree!";
    else if (score > 299) text = ">Not bad...For a newbie";
    else text = "Could this be worse?";
    return text;
  }

  public onRemoveButtonClick(hiscoreId: string) {
    this.removeButtonClicked = true;
    this.hiscoreId = hiscoreId;
  }
}

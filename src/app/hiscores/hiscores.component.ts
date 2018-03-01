import { Component, OnInit } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Hiscore } from '../game/models/hiscore.model';
import { HiscoreDataService } from './hiscore-data.service';
import { HttpErrorResponse } from '@angular/common/http';

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

  constructor(private _hiscoreDataService: HiscoreDataService) { }

  ngOnInit() {
    //ToDo eerst gewoon lichte data van hiscores ophalen, bij klik alle data van die specifieke hiscore ophalen

    this._hiscoreDataService.hiscores.subscribe(
      hiscores => (this._hiscores = hiscores.sort((a, b) => b.kills - a.kills)),
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${
          error.status
          } while trying to retrieve recipes: ${error.error}`;
      }
    );

    /**Test data */
    // this._hiscores = [];
    // this._hiscores[0] = new Hiscore(250, 2, 5);
    // this._hiscores[1] = new Hiscore(500, 4, 12);
    // this._hiscores[2] = new Hiscore(750, 3, 18);
    // for(let i = 0; i < this._hiscores.length; i++){
    //   this._hiscores[i].id = i.toString();
    // }
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
          this.errorMsg = `Error ${error.status} while removing hiscores for hiscore with following id ${
            this.hiscoreId
            }: ${error.error}`;
        }
      );
    }
    //this._hiscores = this._hiscores.filter(val => /*item.id*/ this.hiscoreId !== val.id);
    console.log(this._hiscores);
    this.removeButtonClicked = false;
    this.hiscoreId = "";
  }

  public onRemoveButtonClick(hiscoreId: string) {
    this.removeButtonClicked = true;
    this.hiscoreId = hiscoreId;
  }

  public toFormattedDate(dateString: string): string {
    let date = new Date(dateString);
    let dateFormattedString = date.toLocaleString('nl-NL',
      { day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
      return dateFormattedString;
  }
}

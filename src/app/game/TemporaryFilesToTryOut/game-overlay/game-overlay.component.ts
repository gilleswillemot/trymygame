import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GameOverlay } from '../game-overlay.model';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
//import { GameService } from '../../homepage/game.service';

@Component({
  selector: 'app-game-overlay',
  templateUrl: './game-overlay.component.html',
  styleUrls: ['./game-overlay.component.css']
})
export class GameOverlayComponent implements OnInit {
  // canvasObject;
  // numberOfKills: number;
  //gameOver: boolean;
  // moveIntervalTime:number;
  // directionIntervalTime:number;
  // timer: number;
  // numberOfBullets:number;
  @Input() gameOverlay: GameOverlay;
  _restart: EventEmitter<boolean> = new EventEmitter();
  remove: boolean = false;
  constructor(/*gameService: GameService*/) { }

  ngOnInit() {
    console.log("in gameoverlay");
    console.log(this.gameOverlay);
  }

  restart(){
    this._restart.emit(true);
  }

  public beforeChange($event: NgbPanelChangeEvent) {
    if (this.remove) {
      $event.preventDefault();
      this.removePlayer();
      //this.songToRemove = undefined;
      this.remove = false;
    }
  };

  removePlayer(){

  }
}

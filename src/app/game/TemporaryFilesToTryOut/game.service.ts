import { Injectable } from '@angular/core';
import { GameOverlay } from './game-overlay.model';

@Injectable()
export class GameService {

  gameOverlay: GameOverlay;
  constructor() { }

  addGameOverlay(go){
    this.gameOverlay = go;
  }

  getGameOverlay(){
    return this.gameOverlay;
  }
}

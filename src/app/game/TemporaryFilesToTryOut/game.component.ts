import { Component, OnInit, OnDestroy, Output, Input, EventEmitter, ViewChild } from '@angular/core';
//import { GameOverlay } from './game-overlay.model';
// import { GameCanvasComponent } from './game-canvas/game-canvas.component';
// import { GameService } from '../homepage/game.service';


@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css'],
   /* providers:[GameService]*/
    //directives: [GameCanvasComponent]
    
  })
  export class GameComponent implements OnInit {
 //   @ViewChild(GameCanvasComponent) child:GameCanvasComponent;
    
//gameOverlayInp: GameOverlay;    

constructor(){

}

ngOnInit(){
//console.log(this.gameOverlayInp);
}

// gameOverlayEmit(event){
//     console.log("edtrrt");
//     this.gameOverlayInp = event;
//     console.log(this.gameOverlayInp);
// }

// restart(){
//   //  this._restart.emit(true);
//   console.log("restart in game componenten (parent) opgeroepen.");
//   this.child.restart();
// }

  }//Einde class
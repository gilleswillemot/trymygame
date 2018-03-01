import { Bullet } from "../models/bullet.model";
import { Player } from "../models/player.model";

export class GameOverlay {
    
    constructor(private _canvas, private _player: Player, private _timer:number,
         private _botsMovingSpeed:number, private _botsDirectionalChangeSpeed:number,
         private _gameOver:boolean = false, private _kills:number){

    }

    get timer(){
        return this._timer;
    }

    set timer(tmr){
        this._timer = tmr;
    }

    set botsMovingSpeed(speed){
        this._botsMovingSpeed = speed;
    }

    get botsMovingSpeed(){
        return this._botsMovingSpeed;
    }

    set botsDirectionalChangeSpeed(speed){
        this._botsDirectionalChangeSpeed = speed;
    }

    get botsDirectionalChangeSpeed(){
        return this._botsDirectionalChangeSpeed;
    }

    get canvas(){
        return this._canvas;
    }

    get player(){
        return this._player;
    }

    get weapon(){
        return this.player.weapon;
    }

    get bullets(): Bullet[]{
        return this.weapon.bullets;
    }

    get gameOver():boolean{
        return this._gameOver;
    }

    set gameOver(isGameOver: boolean){
        this._gameOver = isGameOver;
    }

    get numberOfBulletsLeft(): number{
        return this.weapon.getNumberOfBulletsLeft();
    }

    get numberOfKills():number{
        return this._kills;
    }

    addKill():void{
        this._kills++;
    }
}
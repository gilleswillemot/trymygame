//###################
//Infitrator Game
//######################

/* x axe starts left with 0 and ends right at the width of the canvas (600)
 * y axe starts at the top with position 0 and ends at the bottom of the canvas with the height (400)
 *   */
/*####################################################################################
## Als er ook maar iets misgaat: controleer of de getter/setter bestaat ##############
## voor de betrokken model(s), want er wordt geen foutmelding gegeven hieromtrent. ###
######################################################################################*/

import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges, OnDestroy } from '@angular/core';
import { Bot } from '../models/bot.model';
import { Bullet } from '../models/bullet.model';
import { Weapon } from '../models/weapon.model';
import { Player } from '../models/player.model';
import { HiscoreDataService } from '../../hiscores/hiscore-data.service';
import { Hiscore } from '../models/hiscore.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../../user/authentication.service';

// import * as p5 from 'p5';
declare var p5: any;

@Component({
    selector: 'app-game-canvas',
    templateUrl: './game-canvas.component.html',
    styleUrls: ['./game-canvas.component.css']
})
export class GameCanvasComponent implements OnInit, OnDestroy {
    ngOnDestroy(): void {
        this._p5Object.remove();
    }

    private _player: Player;
    private _bots: Bot[];
    private _numberOfBots: number = 4;
    private _directions: string[] = ["SE", "SW", "NE", "NW", "N", "E", "S", "W"]; //TODO enum van maken.
    private _shotBullets: Bullet[];
    private _weapon: Weapon;
    private _gameOver: boolean;
    private _p5Object: any;//P5 object, destroyed onDestroy, otherwise it still exists on the html/component
    private _moveIntervalTime: number;//type Timer
    private _directionIntervalTimer: number;
    private _timer: number;
    private _pauseTimer: number;
    private _gameIsPaused: boolean = false;
    private _gameStarted: boolean;
    private _timerObject: any;// NodeJS.Timer;
    private _mInterval: number; //movement speed interval
    private _dInterval: number; //direction change speed interval
    private _hiscore: Hiscore; //contains the game info: #rounds, score, #kills, etc
    private _bestHiscore: Hiscore;
    private _numberOfKills: number;
    public errorMsg: string;
    public staticAlertClosed = false;

    constructor(private _hiscoreDataService: HiscoreDataService, private _authenticationService: AuthenticationService) { }

    //canvas;

    ngOnInit() {
        setTimeout(() => this.staticAlertClosed = true, 10000);

        let username = "";
        this._authenticationService.user$.subscribe(item => username = item);
        this._hiscore = new Hiscore(0, 1, 0, username);
        this._gameOver = false;
        this._bots = [];
        this._shotBullets = [];
        this._timer = 0;
        this.setGameUp();
        this.besteHiscoreOphalen();
        this._numberOfKills = this._hiscore.kills;

        this.setMovebotsInterval(200);
        this.setDirectionInterval(500);
    }//einde ngOnInit

    // ngOnChanges(changes: SimpleChanges): void {
    //     const hiscore: SimpleChange = changes["_hiscore"];
    //     if (!hiscore.isFirstChange()) {
    //         console.log("11111111EKKEKEKEKEKKEKKEhiscore kills changed");
    //         this._numberOfKills = this._hiscore.kills;
    //     }
    // }

    get bestHiscore() {
        return this._bestHiscore;
    }

    besteHiscoreOphalen() {
        this._hiscoreDataService.bestHiscore().subscribe(item => (this._bestHiscore = item),
            (error: HttpErrorResponse) => {
                this.errorMsg = `${error.error} Hurry in getting one soon!`;
            }
        );
    }

    onGameButtonClick() {
        this.staticAlertClosed = true;
        if (this._gameStarted) {
            console.log("game has starteddddd");
            if (this._gameOver) this.restart();
            else this.pauseGame();
        } else {
            this._p5Object.draw = () => this.draw(this._p5Object);
            this.setTimer();
            this.initiateGameAttributes(this._p5Object);
            this.unfreezeKeys();
            this._gameStarted = true;
        }
    }

    private freezeGame() {
        this.freezeKeys();
        this._p5Object.noLoop();

    }

    private freezeKeys() {//freezing keys on keyboard.
        console.log("freezing the buttons");
        this._p5Object.keyReleased = undefined;
        this._p5Object.keyPressed = undefined;
    }

    private unfreezeKeys() {
        console.log("Unfreezing the buttons");
        this._p5Object.keyReleased = () => this.keyReleased(this._p5Object);
        this._p5Object.keyPressed = () => this.keyPressed(this._p5Object);
    }

    private unfreezeGame() {
        this.unfreezeKeys();
        this._p5Object.loop();
    }

    private pauseGame() {
        if (this._gameIsPaused) {
            this.unfreezeGame();
            console.log("Unpaused the game...");
            this._gameIsPaused = false;
            this.setTimer(); //should be done with setInterval & setTimeout in the future for ms precision.
        } else {
            console.log("Game paused...");
            this.freezeGame();
            this._pauseTimer = this._timer;
            clearInterval(this._timerObject);
            this._gameIsPaused = true;
        }
    }

    public gameButtonText() {
        let buttonText = "";
        if (!this._gameStarted) {
            buttonText = "Start";
        } else if (this._gameOver) buttonText = "Restart";
        else if (this._gameIsPaused) {
            buttonText = "Unpause";
        } else buttonText = "Pause";
        return buttonText;
    }

    public numberOfBulletsLeft() {//method to ngFor in html the number of bullets in the weapon
        return Array(this._weapon.getNumberOfBulletsLeft()).fill(0);
    }

    get gameStarted() {
        return this._gameStarted;
    }
    /**
     * Give the number of seconds since game has started
     * this._timer counts in milliseconds, divided by 1000 gives the seconds.
     */
    get timer() {
        return this._timer / 1000;
    }

    get mInterval() {
        return this._mInterval;
    }

    get dInterval() {
        return this._dInterval;
    }

    get weapon() {
        return this._weapon;
    }

    get hiscore() {
        return this._hiscore;
    }

    get bots() {
        // console.log("getting the bots.");
        return this._bots;
    }

    get numberOfKills() {
        return this._hiscore.kills;
    }

    get kills() {
        let numberOfDeaths: number;
        if (!this._gameStarted) numberOfDeaths = 0;
        else numberOfDeaths = this._numberOfBots - this._bots.length;
        return Array(numberOfDeaths).fill(0);
    }

    private restart() {
        //TODO add a html element that show for eg 3 seconds saying that a new round just started.
        clearInterval(this._moveIntervalTime);
        console.log(this._moveIntervalTime);//geef tijd in ms uit dit obj
        clearInterval(this._directionIntervalTimer);
        this.setDirectionInterval(500);
        this.setMovebotsInterval(200);
        this.initiateGameAttributes(this._p5Object);
        this.unfreezeKeys();
        console.log("RESTART");
        if (this._gameOver) {//volledige restart
            console.log("GAME-OVER restart");
            //this.setGameUp();
            this._gameOver = false;
            this._p5Object.loop();
            //  this.view.draw();
        } else clearInterval(this._timerObject);
        //TODO this.view.redraw() uitproberen

        this._timer = 0;
        this.setTimer();
        //clearInterval(this.timer2);
        this._hiscore.reset();
    }

    private setTimer() {
        this._timerObject = setInterval(() => {
            //print("Bots have moved");
            this._timer++;
        }, 1);
    }
    private setMovebotsInterval(interval) {
        this._moveIntervalTime = setInterval(() => {
            //print("Bots have moved");
            this.moveBots(this._p5Object);
        }, this._mInterval = interval);
    }

    private setDirectionInterval(interval) {
        this._directionIntervalTimer = setInterval(() => {
            this.changeDirectionBots();
        }, this._dInterval = interval)
    }

    private setGameUp() {
        const s = (p) => {
            // let song;
            // p.preload = () => {
            //   console.log('preload');
            //   song = p.loadSound('assets/music/Thunderstruck.mp3');
            // }

            p.setup = () => this.setup(p);
            //p.draw = () => this.draw(p);

        }
        this._p5Object = new p5(s);
    }

    private setup(p) {
        let canvas = p.createCanvas(800, 400);
        //  this.centerCanvas(p);
        canvas.parent('sketch-holder');
    }

    private initiateGameAttributes(p) {
        this._weapon = new Weapon("Glock", p.height / 2, p.width / 2, "");
        console.log("my weapon is a: " + this._weapon.name);
        this._player = new Player("Gilles", p.width / 2, p.height / 2, 5, 20, 20, 20, "", this._weapon);
        this._player.loadWeapon(); //fills the player's weapon with bullets.

        for (let i = 0; i < this._numberOfBots; i++) {
            /*x krijgt een waarde tussen 1 en max breedte -1 en y tussen 1 en max hoogte -1 */
            let name = "bot" + (i + 1);
            this._bots[i] = new Bot(
           /*x*/ Math.floor((Math.random() * (p.width - 1) + 1)),
           /*y*/ Math.floor((Math.random() * (p.height - 1)) + 1), name, this._directions[i % 4]);
            let bot = this._bots[i];
            console.log("New bot has been created.\nHis name is: " + bot.name + "\nHis position is x = "
                + bot.x + ", y = " + bot.y + "\nHis direction is: " + bot.direction);
        }
    }

    private gameOver() {
        clearInterval(this._timerObject);
        this._p5Object.noLoop();
        this.freezeKeys();
        console.log(this._hiscore.calcScore(this._timer));
        console.log("game over");
        this._hiscoreDataService.addNewHiscore(this._hiscore).subscribe(
            item => (this._bestHiscore = item),
            (error: HttpErrorResponse) => {
                this.errorMsg = `Error ${error.status} while adding hiscore to database: ${error.error}`;
            }
        );
        this._gameOver = true;
    }

    private draw(p) {
        p.background(51);
        //if arrow button is released => player.position = "", which does the default case in the switch in the move method (not moving)
        //if arrow button is pushed => player.position = N or E or W or S, depending on which arrow is pushed, thus moving the player
        //in that direction.
        let x = this._player.x;
        let y = this._player.y;
        this._player.move();
        if (!this.checkValidPosition(p, this._player.x, this._player.y)) {
            this._player.x = x; this._player.y = y
        }
        this._player.show(p);
        this._weapon.show(p);

        loop1:
        for (let i = 0; i < this._shotBullets.length; i++) {
            // this is bad: let bullet = bullets[i]; because you'll delete the previous bullet with the next bullet by reinitiating the attribute.
            /*
            *if you initiate the bullet's direction here the bullet will change from direction once the
            *the player's direction's been changed, making it dynamic. This could be a cool feature in the future
            *as to give the option of special ammunition.
            *Reason for this: in draw the loop keep's continueing, so the bullet will keep moving, but also
            *keep setting the direction to the player's direction
            */
            //bullet.direction = player.direction; 
            //
            let bullet = this._shotBullets[i];

            if (!this.checkValidPosition(this._p5Object, bullet.x, bullet.y)) {//if bullet is out of canvas
                this.deleteObjectFromArray(this._shotBullets, i, 1);
                console.log("bullet went out of canvas");
                if (this.isGameOver()) break loop1;
                else continue loop1;
            }

            for (let j = 0; j < this._bots.length; j++) {
                let bot = this._bots[j];
                if (bullet.hits(p, bot)) {
                    console.log("You shot " + bot.name + " .");
                    this._hiscore.kills++;
                    this._weapon.reload(1);//add 1 bullet after hitting a bot.
                    this.deleteObjectFromArray(this._bots, j, 1);
                    if (this._bots.length === 0) {
                        console.log("end of round!!!");
                        this._shotBullets = [];
                        this.endOfRound();
                        break loop1;
                    }
                    if (!this._weapon.canPersevere()) {//bullet can't shoot through a bot, if the weapon isn't stronger than a handgun.
                        this.deleteObjectFromArray(this._shotBullets, i, 1);
                        if (this.isGameOver()) break loop1;
                        else continue loop1;
                    }
                }
            }
            bullet.show(p);
            bullet.move();
        }
        for (let i = 0; i < this._bots.length; i++) {
            this._bots[i].show(p);
        }
    }

    private isGameOver() {
        if (this._weapon.isEmpty()) {
            console.log("empty weapon");
            this._shotBullets = [];
            this.gameOver();
            return true;
        }
        return false;
    }

    private deleteObjectFromArray(array: any[], startIndex, numberOfItemsToDelete: number): void {
        array.splice(startIndex, numberOfItemsToDelete);
    }

    private endOfRound() {
        console.log(`End of round ${this._hiscore.numberOfRounds}.`);
        this._hiscore.numberOfRounds++;
        if (this._hiscore.numberOfRounds < 5) {
            this._bots.forEach(bot => bot.radius * 0.9);
            this.setDirectionInterval(this._dInterval * 0.9);
        }
        this.setMovebotsInterval(this._mInterval * 0.9);
        this.initiateGameAttributes(this._p5Object);
    }

    private moveBots(p) {
        for (let i = 0; i < this._bots.length; i++) {
            let bot = this._bots[i];
            let x = bot.x;
            let y = bot.y;
            bot.direction = this.changeToPossibleDirection(p, bot);
            bot.move();
        }
    }

    private changeDirectionBots() {
        this.shuffle(this._bots);
        let counter = Math.floor(Math.random() * (this._bots.length + 1)); //Math.floor(_bots.length / 2);
        for (let i = 0; i < counter; i++) {
            this._bots[i].direction = this._directions[Math.floor(Math.random() * 8)];
        }
    }

    keyReleased(p) {
        if (p.key != ' ') {
            this._player.direction = "";
        }
    }

    keyPressed(p) {
        /** 
         * http://keycode.info/ for more key info.
        */
        switch (p.keyCode) {
            case 32: this.shoot(); break;
            case 90: this.shoot("N"); break;
            case 13: this.onGameButtonClick(); break;
            case 83: this.shoot("S"); break;
            case 68: this.shoot("E"); break;
            case 81: this.shoot("W"); break;
            case p.RIGHT_ARROW:
                this._player.direction = "E";
                break;
            case p.LEFT_ARROW:
                this._player.direction = "W";
                break;
            case p.UP_ARROW:
                this._player.direction = "N";
                break;
            case p.DOWN_ARROW:
                this._player.direction = "S";
                break;
            case p.DOWN_ARROW && p.RIGHT_ARROW:
            case p.RIGHT_ARROW && p.DOWN_ARROW:
                this._player.direction = "SE";
                break;
            case p.RIGHT_ARROW && p.UP_ARROW:
            case p.UP_ARROW && p.RIGHT_ARROW:
                this._player.direction = "NE";
                break;
            case p.LEFT_ARROW && p.DOWN_ARROW:
            case p.DOWN_ARROW && p.LEFT_ARROW:
                this._player.direction = "SW";
                break;
            case p.UP_ARROW && p.RIGHT_ARROW:
            case p.RIGHT_ARROW && p.UP_ARROW:
                this._player.direction = "NE";
                break;
            default:
                break;
        }
    }

    shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    /**
     * Checks with param p, which is the P5 object that contains all the information of the canvas,
     * if the coördinates x and y are valid/not outside of the canvas.
     * @param p 
     * @param x 
     * @param y 
     */
    checkValidPosition(p, x, y) {
        return (x >= 0 && x <= p.width && y >= 0 && y <= p.height); // if the position is in the canvas (x is 0, 1, 2, ..., until width and y from 0, -1, -2, ..., until height)
    }

    changeToPossibleDirection(p, bot) {
        let stepLength = bot.step;
        let x = bot.x;
        let y = bot.y;
        let closeToLeft = /*0 <= x &&*/ x <= stepLength;
        let closeToRight = (p.width - stepLength) <= x; //&& x <= width;
        let closeToTop = /* 0 <= y */ y <= stepLength;
        let closeToBottom = (p.height - stepLength) <= y;
        if (closeToLeft) {
            if (closeToTop)
                return /*newDirection =*/ "SE"; // bot has to move to south-eastern direction to not dissapear
            if (closeToBottom)
                return "NE";
            return "E";

        } else if (closeToTop) {
            if (closeToRight)
                return "SW";
            return "S";
        } else if (closeToBottom) {
            if (closeToRight)
                return "NW";
            return "N";
        } else if (closeToRight)
            return "W"; //Last possible bad position of a bot.
        else
            return bot.direction; //if bot's position isn't possible going to make it dissapear on the next move.
    }

    public shoot(direction?: string) {
        let bullet: Bullet = this._player.shoot();
        bullet.x = this._weapon.x;
        bullet.y = this._weapon.y;
        console.log("direction of shot: " + direction);

        if (!direction) {//no param, if player shoots with space button
            direction = "N";
            console.log("empty param when shooting");
        }
        bullet.direction = direction;
        this._weapon.setDir(direction);
        this._shotBullets.push(bullet);
        console.log("shot has been fired to direction: " + direction);
    }

}/*Einde component*/

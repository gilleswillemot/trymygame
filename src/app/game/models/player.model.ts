import { Weapon } from './weapon.model';
import { Bullet } from './bullet.model';

export class Player {
    constructor(private _name:string, private _x:number, private _y:number, private _step:number,
    private _xLength:number, private _yLength:number, private _cornerRounding:number, private _direction:string,
     private _weapon:Weapon){
        
    }

    
    show(c) {
        c.fill(255);
        c.rectMode(c.CENTER);
        c.rect(this.x, this.y, this.xLength,
            this.yLength, this.cornerRounding);
    };

    

    shoot(): Bullet{
       // return this.weapon.shoot();
    return this.weapon.shoot();
    };

    loadWeapon() {
      this.weapon.reload();
      console.log("Your weapon is stocked and loaded with " + this.weapon.getNumberOfBulletsLeft() + " bullets");
      
    };

    
    /*
        this.moveSideways = function (dir) {
            //if(dir === Math.abs(1)){
            this.x += dir * 5;
          //  else this.y += dir * 5;
        };
        this.moveVertical = function (dir) {
            //if(dir === Math.abs(1)){
           this.y += dir * 5;
        };    
    */


    move() {
        switch (this.direction) {
            case "SE": this.x += this.step; this.y += this.step; console.log("going South-Wast"); break;
            //case "S" //if it has to go down aka South
            case "SW": this.x -= this.step; this.y += this.step;  console.log("going South-West"); break;
            case "NE": this.x += this.step; this.y -= this.step;  console.log("going North-East"); break;
            case "NW": this.x -= this.step; this.y -= this.step;  console.log("going North-West"); break;
            case "N": this.y -= this.step;  console.log("going North"); break;
            case "E": this.x += this.step;  console.log("going East"); break;
            case "S": this.y += this.step;  console.log("going South, but not on a woman this time."); break;
            case "W": this.x -= this.step;  console.log("going West"); break;

            default: /*print("something went wrong with: " + this.name + ", which has direction: " + this.direction);*/
                break;
        }
        /*
         * If the new direction is the opposite of the direction that the player
         * was already walking (i.e. new direction is south and player was going East)
         * then the shape of the body of the player has to be inversed in order to make
         * it seem real and recognisable.
         
             if((direction === "E" || direction === "W"
                 &&( this.direction === "S" || this.direction === "N"))
                 || 
                (direction === "N" || direction === "S" && (this.direction === "E" || this.direction === "W"))
              ){   
          inverseBody(direction);}
          */   
          this.weapon.move(this.x, this.y);    
    };
    /*
     * Change the shape of the body of the player
     * so that it looks like he is running in a
     * different direction
     */
    inverseBody(direction) {
        if (this.x === 20) {
            this.x = 50;
            this.y = 20;
        } else {
            this.x = 20;
            this.y = 50;
        }
    };
//#region setters
set x(x){
    this._x=x;
}

set y(y){
    this._y = y;
}

set direction(direction:string){
    console.log(direction);
    this._direction = direction;
    this.weapon.setDir(this.direction);
}
//#endregion setters

//#region getters
    get name(){
        return this._name;
    }

    get x(){
        return this._x;
    }

    get y(){
        return this._y;
    }

    get step(){
        return this._step;
    }

    get xLength(){
        return this._xLength;
    }

    get yLength(){
        return this._yLength;
    }

    get cornerRounding(){
        return this._cornerRounding;
    }

    get direction(){
        return this._direction;
    }

    get weapon(){
        return this._weapon;
    }
//#endregion getters

}//Einde player class


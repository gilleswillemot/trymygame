import { Bullet } from './bullet.model';

enum WeaponType {
    Handgun = 1,
    Rifle,
    Sniper,
    Bazooka,
}

export class Weapon {
    
    constructor(private _type:string,  private _x:number, private _y:number, private _direction:string,
        private _weaponWidth?:number, private _weaponLength?:number, private _xLength?:number,
        private _yLength?:number, private _bullets?:Bullet[]){
        this._bullets = [];
        this._weaponLength = 20;
        this._weaponWidth = 4;
        this._xLength = this._weaponLength;
        this._yLength = this._weaponWidth;
       // this._type = "Glock";
    }

    get weaponType(){
        return WeaponType.Handgun;
    }

    public canPersevere(): boolean{
        return this.weaponType != WeaponType.Handgun;
    }

    get name(){
        return this._type;
    }

    /**
     * Future amillioration is to change the x or y with the weaponLength/2 in order to have the weapon in the middle of the player.
     * At the moment the weapon is always a bit off-center because it depends on x and y (the position and middle of the player)
     * as upper-left corner. By moving it (holding in account that the adaptations are synchrone with the direction) it could appear in the middle
     * of the player
     */
    show(c) {
        c.fill(100);
        /*
 *The default mode is rectMode(CORNER), which interprets the first two
 * parameters of rect() as the upper-left corner of the shape, while the
 * third and fourth parameters are its width and height.
        */
        c.rectMode(c.CORNER);
        c.rect(this.x, this.y, this.xLength, this.yLength);
    };


    public isEmpty(): boolean {
        return this.getNumberOfBulletsLeft() == 0;
    }

    shoot(): Bullet {
        if (this.isEmpty()) {
            console.log("Your weapon has no bullets left.");
        }
        else {
            console.log("*Bullet shot sound*");            
            return this.bullets.pop();
            
            /* This probably only works in sketch.js:  
             *             let shot = bullets.pop();
             *             shot.show();
               shot.move();
               */
        }
    };
    /*
    * Puts the weapon in the direction that the player is moving to.
    */
   setDir(direction) {
        this.direction = direction;
        switch (this.direction) {
            case "N": this.xLength = this.weaponWidth; this.yLength = this.weaponLength * -1; break;// *-1 to let it appear going north
            case "E": this.xLength = this.weaponLength; this.yLength = this.weaponWidth; break;
            case "S": this.xLength = this.weaponWidth; this.yLength = this.weaponLength; break;
            case "W": this.xLength = this.weaponLength * -1; this.yLength = this.weaponWidth; break;
            default: /*print("There went something wrong with moving your weapon.\nThe following direction didn't work: " + this.direction);*/
                break;
        }
    };

    get weaponLength(){
        return this._weaponLength;
    }

    get weaponWidth(){
        return this._weaponWidth;
    }

    get xLength(){
        return this._xLength;
    }

    set xLength(xLength){
        this._xLength = xLength;
    }
    get yLength(){
        return this._yLength;
    }

    set yLength(yLength){
        this._yLength = yLength;
    }


    get bullets(){
        return this._bullets;
    }

    get direction(){
        return this._direction;
    }

    set direction(dir:string){
        this._direction = dir;
    }

    get x(){
        return this._x;
    }

    get y(){
        return this._y;
    }

    set x(xCoordinate){
        this._x = xCoordinate;
    }

    set y(yCoordinate){
        this._y = yCoordinate;
    }

    getNumberOfBulletsLeft(){
        return this._bullets.length;
    }

move(x, y){
    this.x = x;
    this.y = y;
}

reload(){
    for (let i = 0; i < 12; i++) {
        this.bullets.push(new Bullet(`bullet ${i}`, ));
        //let bullets = this.weapon.bullets;
        //bullets[i] = new Bullet(`bullet ${i}`);
    }
}
}//Einde class Weapon
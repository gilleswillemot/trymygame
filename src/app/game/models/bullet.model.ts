export class Bullet {

constructor(private _name:string, private _x?: number, private _y?: number, private _xStep?:number, private _yStep?:number,
private _direction?: string, private _radius?:number){
    this._xStep = this._xStep ? this._xStep : 5;
    this._yStep = this._yStep ? this._yStep : 5;
    this._direction = "N";
    this._radius = 5;
}    

get name(){
    return this._name;
}

get x(){
    return this._x;
}

get direction(){
    return this._direction;
}

get y(){
    return this._y;
}

set direction(dir){
    this._direction = dir;
}
set x(x){
    this._x = x;
}

set y(y){
    this._y = y;
}
show(p) {
        p.noStroke();
        p.fill(20, 30, 200);
        p.ellipse(this._x, this._y, this._radius*2, this._radius*2);
    };

    /**
     * Checks if the bullet hits the bot.
     * If the distance of the center of the bot and the bullet
     * is smaller than the sum of the radius of the bot and the bullet, then they collided and we have a hit.
     * 
     */
hits(p, bot){
        let d = p.dist(this._x, this._y, bot.x, bot.y);
        if (d < this._radius + bot.radius){
            return true;
        } else{
            return false;
        }
    }

//TODO kijken of move van alle models niet kan gerecycled worden (code hergebruiken).
move() {
        switch (this._direction) {
            case "SE": this.x += this._xStep; this.y += this._yStep; break;
            //case "S" //if it has to go down aka South
            case "SW": this.x -= this._xStep; this.y += this._yStep; break;
            case "NE": this.x += this._xStep; this.y -= this._yStep; break;
            case "NW": this.x -= this._xStep; this.y -= this._yStep; break;
            case "N": this.y -= this._yStep; break;
            case "E": this.x += this._xStep; break;
            case "S": this.y += this._yStep; break;
            case "W": this.x -= this._xStep; break;
        }
    }

}//Einde bullet class

export class Bot{

constructor(private _x:number, private _y:number, private _name:string, private _dir:string,
private _xdir?:number, private _step?:number, private _radius?: number) {
    // direction example: "SE"; // "SE"=South East
    this._xdir = 0;
    this._step = 10;
    this._radius = 10;
}

//#region setters
set direction(dir){
    this._dir = dir;
}

set x(x){
    this._x=x;
}
set y(y){
    this._y = y;
}
set name(name){
    this._name = name;
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

get direction(){
    return this._dir;
}

get step(){
    return this._step;
}

get radius(){
    return this._radius;
}
//#endregion getters


    show(c) {
        c.fill(255, 0, 20);
        c.ellipse(this.x, this.y, this._radius*2, this._radius*2);
    };
    
    move() {
        /*
         * let num = Math.floor((Math.random()*2)); // 0 of 1
        *num *= Math.floor(Math.random()*2)==1?1:-1;//-1, 0 of 1
        */
      // let positions = [-1, 0, 1];
       //let positions = [-this._step, this._step];
       /*
       this.x+= positions[Math.floor(Math.random()*3)];       
       this.y+= positions[Math.floor(Math.random()*3)];
       */
      switch(this.direction){
          case "SE": this.x += this._step;  this.y+=this._step; break;
          //case "S" //if it has to go down aka South
          case "SW": this.x -= this._step; this.y+=this._step;break;
          case "NE": this.x += this._step; this.y-=this._step; break;
          case "NW": this.x -= this._step; this.y-=this._step;  break;
          case "N": this.y-=this._step;  break;
          case "E": this.x+=this._step; break;
          case "S": this.y+=this._step; break;
          case "W": this.x-=this._step; break;
          
            default: console.log("something went wrong with: "+this.name+ ", which has direction: "+this.direction);
                /*Auto debug position */
                let num1 = Math.floor(Math.random()*2)==1?1:-1;
                let num2 = Math.floor(Math.random()*2)==1?1:-1;
                
                this.x += num1*this._step; this.y += num2*this._step; // change position of x and y randomly
                break; 
      }/*
       this.x+= positions[Math.floor(Math.random()*2)];       
       this.y+= positions[Math.floor(Math.random()*2)];
       */
     //  print(this.name+ " moved, his position is now: x ="+ this.x+ ",\n y = "+ this.y);
    };

}//Eind Bot class


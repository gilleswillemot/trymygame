import { race } from "rxjs/operators/race";

export class Hiscore {

    private _id: string;
    // private _score: number;
    // private _numberOfRounds: number;
   // private _kills: number;

    static fromJSON(json: any): Hiscore {
        const hisc = new Hiscore(json.score, json.numberOfRounds, json.kills, json.username);
        hisc._date = new Date(json.date);
        hisc._id = json._id;
        return hisc;
    }

    constructor(private _score: number, private _numberOfRounds: number, private _kills: number, 
        private _username: string, private _date: Date = null/*, usedWeaponsList?: string[]*/) {
            this._date = _date ? _date : new Date();

        // this._usedWeaponsList = usedWeaponsList || new Array<string>();
    }

    public getFormattedDate(): string {
        //let date = new Date(dateString);
        let dateFormattedString = this._date.toLocaleString('nl-NL',
          { day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
          return dateFormattedString;
      }

    get id(): string {
        return this._id;
    }

    get score(): number {
        return this._score;
    }

    get date(): Date {
        return this._date;
    }

    set date(d: Date) {
        this._date = d;
    }

    get username(): string {
        return this._username;
    }

    set username(u: string) {
        this._username = u;
    }

    set score(score: number) {
        this._score = score;
    }

    set kills(kills: number){
        this._kills = kills;
    }

    get kills():number{
        return this._kills;
    }

    set numberOfRounds(rounds: number){
        this._numberOfRounds = rounds;
    }

    get numberOfRounds(): number {
        return this._numberOfRounds;
    }
    /*
    get usedWeaponsList(): string[] {
        return this._usedWeaponsList;
    }*/
    /* addUsedWeaponToList(weap: String) {
         this._usedWeaponsList.push(weap);
     }*/

     reset(){ //the game uses the hiscore object to hold on to the game info, this reset is a restart of the game
        if(!this._id){//if id is empty, its not persisted yet, so free to change attributes.
        console.log("hiscore will be resetted...");
         this._kills = 0;
         this._numberOfRounds = 1;
         this._score = 0;
         this._date = new Date();
        }
     }

     calcScore(timer){
            //TODO bring total number of bullets in minus & nmb of rounds
            //debugger;
            //    let subScore = Math.round((this.numberOfKills * 50 + ((this.round - 1) * 50))/this.timer * 10);
            this._score = Math.round(Math.floor(this._kills * 50 + ((this._numberOfRounds - 1) * 50)));// - (timer/this._numberOfRounds));
            this._score = this._score < 0 ? 0 : this._score;
            return this._score;
            // return this.numberOfKills * 100 * this.round - this.timer;//maybe put timer +1 because / 0 is not possible.
     }

    toJSON() {
        return {
            _id: this._id,
            score: this._score,
            numberOfRounds: this._numberOfRounds,
            kills: this._kills,
            username: this._username,
            date: this._date
        };
    }

}

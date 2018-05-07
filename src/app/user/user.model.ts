export class User {
 // private _creationDate: Date;
  private _id: string;

  constructor(
    private _username: string,
    private _password,
    private _email: string,
    private _firstname?: string,
    private _surname?: string,
    private _birthday?: Date, 
    private _creationDate?: Date) {
    this._creationDate = _creationDate ? _creationDate : new Date(); // aanmaak datum, bij creatie.
  }

  static fromJSON(json: any): User {
    const rec = new User(json.username, json.password, json.email, json.firstname, json.surname);
    rec._birthday = new Date(json.birthday);
    rec._creationDate = new Date(json.creationDate);
    rec._id = json._id;
    return rec;
  }

  get email() {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }

  get firstname() {
    return this._firstname;
  }

  get surname(): string {
    return this._surname;
  }

  get fullname(): string {
    if (this._firstname && this._surname) {
      let firstname = this._firstname.charAt(0).toUpperCase() + this._firstname.slice(1);
      let surname = this._surname.charAt(0).toUpperCase() + this._surname.slice(1);
      return firstname + " " + surname;
    }
    else return null
  }

  set password(password) {
    this._password = password;
  }

  get creationDate(): Date {
    return this._creationDate;
  }

  // set creationDate(date: Date) {
  //   this._creationDate = date;
  // }

  get id(): string {
    return this._id;
  }

  get username(): string {
    return this._username;
  }

  set username(username: string) {
    this._username = username;
  }

  dateFormat(date: Date): string { //eventueel in inteface met static method zodat deze method ook in class Hiscore kan gebruikt worden
    let dateFormattedString = date.toLocaleString('nl-NL',
      { day: 'numeric', month: 'numeric', year: 'numeric'/*, hour: '2-digit', minute: '2-digit' */});
    return dateFormattedString;
  }

  getBirthdayString(): string {
    return this.dateFormat(this._birthday);
  }

  getCreationDateString(): string {
    return this.dateFormat(this._creationDate);
  }

  get birthday(): Date {
    return this._birthday;
  }

  set birthday(birthday: Date) {
     this._birthday = birthday;
  }

  public toJSON() {
    return {
      email: this._email,
      username: this._username,
      creationDate: this._creationDate,
      firstname: this._firstname,
      surname: this._surname,
      password: this._password,
      birthday: this._birthday,
      _id: this.id
    }
  }
}
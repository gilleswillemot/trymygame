import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../user/authentication.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../user/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private _currentUser: User;

  constructor(private _authService: AuthenticationService) { }

  ngOnInit(): void {
    this._authService.getCurrentUser().subscribe(item => this._currentUser = item);
  }

  get email(): string {
    return this._currentUser.email;
  }

  get currentUser(): User {
    return this._currentUser;
  }

  // get surname(): string {
  //   return this._currentUser.surname;
  // }

  get fullname(): string {
    return this._currentUser.fullname;
  }

  get creationDate(): string {
    return `Your account was created on: ${this._currentUser.getCreationDateString()}`
  }

  get birthday(): string {
    return this._currentUser.getBirthdayString();
  }

  // get firstname(): string {
  //   return this._currentUser.firstname;
  // }

  get username(): string {
    // let username = "";
    // this._authService.user$.subscribe(item => { username = item; console.log(item); });
    // return username;
    return this._currentUser.username;
  }
}

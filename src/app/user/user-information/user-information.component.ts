import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators, FormControl, EmailValidator } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { User } from '../user.model';
import { Location } from '@angular/common';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/add/observable/of';

function passwordValidator(length: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    return control.value.length < length ? {
      'passwordTooShort':
        { requiredLength: length, actualLength: control.value.length }
    } : null;
  };
}

function comparePasswords(control: AbstractControl): { [key: string]: any } {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return password.value === confirmPassword.value ? null : { 'passwordsDiffer': true };
}

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent implements OnInit {

  public user: FormGroup;
  public errorMsg: string;
  private _currentUser: User;
  private ready: boolean = false;
  public showPasswordForm: boolean = false;
  public correctCurrentPassword: boolean = false;
  private now: Date = new Date();
  public birthday: Date = new Date(1992, 7, 16);
  birthdayModel = { year: this.birthday.getFullYear(), month: this.birthday.getMonth(), day: this.birthday.getDate() };
  public minDate: any = { year: this.now.getFullYear() - 100, month: this.now.getMonth() + 1 };
  public maxDate: any = { year: this.now.getFullYear(), month: this.now.getMonth() + 1 };
  //private _model: NgbDateStruct;
  //private _birthday: Date;
  // @ViewChild('dp') dp: any;
  // date: {year: number, month: number};

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private router: Router,
    private _location: Location) { }

  ngOnInit() {
    this.prepareFormGroup();
    if (this.authenticationService.token) { // als gebruiker is ingelogd.
      console.log("LOOGGGED IN");
      this.authenticationService.getCurrentUser().subscribe(item => {
        this._currentUser = item;
        this.loadUser(item);
        console.log("ready");
        this.ready = true;
      });
    } else {
      this.user.get('passwordGroup.currentPassword').disable();
      this.showPasswordForm = true;
      this.ready = true;
    }
    //this.dp.navigateTo();
  }

  // get model() {
  //   // this.fillModel();
  //   console.log(this._model);
  //   return this._model;
  // }

  changeDate(date): boolean {
    let now = new Date();
    console.log(date);
    console.log(this.user.value.birthday);
    if (now.getFullYear() - date.year < 4) {
      console.log("wrong date");
      this.user.controls['birthday'].setErrors({ 'wrongDate': true });
      return false;
    }
    // if(!date.day){
    //   this.user.controls['birthday'].setErrors({ 'noDaySelected': true });
    //   return false;
    // }
    console.log("correct date");
    this.user.controls['birthday'].setErrors(null);

    // if (date.year != this.user.value.birthday.year) this.user.value.birthday.year = date.year;
    // if (date.month != this.user.value.birthday.month) this.user.value.birthday.month = date.month;
    // if (date.day) this.user.value.birthday.day = date.day;
    return true;
  }

  validBirthday(): ValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any }> => {
      let birthday = control.value;

      // if (modelDate.getFullYear() >= now.getFullYear() && modelDate.getMonth() == now.getMonth() &&
      // modelDate.getDate() == (now.getDate() || yesterday.getDate())) {
      //  console.log("wrong date");
      //     user.birthday = null;
      // } else{
      //   console.log("u date");
      //   user.birthday = modelDate;
      // } 
      console.log(birthday);
      if ((this.maxDate.year - birthday.year) < 4) {
        console.log("wrong date");
        return Observable.of({ wrongDate: true });
      }
      else {
        console.log("correct date");
        return Observable.of(null);
      }
    }
  }

  prepareFormGroup() {
    this.user = this.fb.group({
      email: [/*this._currentUser ? this._currentUser.email : */'',
        [Validators.required, Validators.email], this.serverSideValidateEmail()],
      username: [/*this._currentUser ? this._currentUser.username : */'',
        [Validators.required, Validators.minLength(4)], this.serverSideValidateUsername()],
      passwordGroup: this.fb.group({
        currentPassword: ['', [Validators.required, passwordValidator(12)], this.serverSideCheckCurrentPassword()],
        password: ['', [Validators.required, passwordValidator(12)]],
        confirmPassword: ['', Validators.required]
      }, { validator: comparePasswords }),
      firstname: /*this._currentUser ? this._currentUser.username :*/ "",
      surname: /*this._currentUser ? this._currentUser.surname : */"",
      birthday: [this.returnValidBirthdayModel()/*, this.validBirthday()*/]
    });
  }

  returnValidBirthdayModel(date?: Date): any {
    let birthday;
    if (date) birthday = date;
    else {
      let now = new Date();
      birthday = new Date(now.getFullYear() - 4, now.getMonth(), now.getDate());
    }
    return { year: birthday.getFullYear(), month: birthday.getMonth() + 1, day: birthday.getDate() };
  }

  modelToDateFormat(model: any): Date {
    return new Date(model.year, model.month - 1, model.day);
  }

  loadUser(user: User) {
    // this.user.get('username').setValue(user.username);
    // this.user.controls['firstname'].setValue(user.firstname);

    this.user.patchValue({
      username: user.username ? user.username : "",
      email: user.email ? user.email : "",
      firstname: user.firstname ? user.firstname : "",
      surname: user.surname ? user.surname : "",
      birthday: this.returnValidBirthdayModel(user.birthday)
      //birthday: user.birthday ? user.birthday : "",
    });
    // this.user.get('passwordGroup.password').setValue(user.password);
    // this.user.get('passwordGroup.confirmPassword').setValue(user.password);
    this.user.get('passwordGroup').disable();
  }

  // fillModel() {
  //   let date = this.user.value.birthday;
  //   this._model = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
  // }

  public editPassword(): void {
    if (this.showPasswordForm) {
      this.user.get('passwordGroup').disable();
      this.showPasswordForm = false;
    } else {
      this.user.get('passwordGroup').enable();
      this.showPasswordForm = true;
    }
  }

  get currentUser(): User {
    return this._currentUser;
  }

  onSubmit() {
    let creationDate = this._currentUser ? this._currentUser.creationDate : null;
    let user = new User(
      this.user.value.username,
      this.passwordControl.value,
      this.user.value.email,
      this.user.value.firstname,
      this.user.value.surname,
      this.modelToDateFormat(this.user.value.birthday),
      creationDate);

    if (this._currentUser) { //update existing user data
      this.authenticationService.update(user)
        .subscribe(
          val => {
            console.log(val);
            if (val) {
              this.router.navigate(['/profile']);
            }
          },
          (error: HttpErrorResponse) => {
            this.errorMsg = `Error ${
              error.status
              } while trying to update profile information ${this.user.value.username}: ${
              error.error
              }`;
          }
        );
    } else { //new user

      this.authenticationService
        .register(user)
        .subscribe(
          val => {
            if (val) {
              this.authenticationService.getCurrentUser().subscribe(user => {
                console.log("current user: ");
                console.log(user);
                this.authenticationService.sendEmail(user);
              });
              this.router.navigate(['/homepage']);
            }
          },
          (error: HttpErrorResponse) => {
            this.errorMsg = `Error ${
              error.status
              } while trying to register user ${this.user.value.username}: ${
              error.error
              }`;
          }
        );
    }
  }

  get passwordControl(): FormControl {
    return <FormControl>this.user.get('passwordGroup').get('password');
  }

  get username(): string {
    return this.user.get("username").value;
  }

  serverSideValidateEmail(): ValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any }> => {
      let email = control.value;
      if (this._currentUser != null && this._currentUser.email == email) return Observable.of(null);

      return this.authenticationService
        .checkEmailAvailability(email)
        .pipe(
          map(available => {
            if (available) {
              return null;
            }
            return { emailAlreadyExists: true };
          })
        );
    };
  }

  serverSideValidateUsername(): ValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any }> => {
      let username = control.value;
      if (this._currentUser != null && this._currentUser.username == username) return Observable.of(null);

      return this.authenticationService
        .checkUserNameAvailability(username)
        .pipe(
          map(available => {
            if (available) {
              return null;
            }
            return { userAlreadyExists: true };
          })
        );
    };
  }

  serverSideCheckCurrentPassword(): ValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any }> => {
      return this.authenticationService
        .checkCorrectCurrentPassword(this._currentUser.username, control.value)
        .pipe(
          map(correct => {
            if (correct) {
              this.correctCurrentPassword = true;
              return null;
            }
            this.correctCurrentPassword = false;
            return { wrongPassword: true };
          })
        );
    };
  }
}









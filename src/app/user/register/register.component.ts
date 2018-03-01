import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';


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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: FormGroup;
  public errorMsg: string;

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.user = this.fb.group({
      // email: ['', [Validators.required],
      username: ['', [Validators.required],
       /* this.serverSideValidateEmail()*/],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, passwordValidator(12)]],
        confirmPassword: ['', Validators.required]
      }, { validator: comparePasswords }),
      // voornaam: ['', [Validators.required]],
      // familienaam: ['', [Validators.required]],
    });
  }

  get passwordControl(): FormControl {
    return <FormControl>this.user.get('passwordGroup').get('password');
  }

  //serverSideValidateEmail(): ValidatorFn {
  //  return (control: AbstractControl): Observable<{ [key: string]: any }> => {
  //    return this.authenticationService.checkEmailAvailability(control.value).map(available => {
  //      if (available) {
  //        return null;
  //      }
  //      return { userAlreadyExists: true };
  //    });
  //  };
  //}

  onSubmit() {
        this.authenticationService
          .register(/*this.user.value.email,*/ this.user.value.username, this.passwordControl.value/*,
            this.user.value.voornaam,
          this.user.value.familienaam*/)
          .subscribe(
            val => {
              if (val) {
                this.router.navigate(['/game']);
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


// function passwordValidator(length: number): ValidatorFn {
//   return (control: AbstractControl): { [key: string]: any } => {
//     return control.value.length < length
//       ? {
//           passwordTooShort: {
//             requiredLength: length,
//             actualLength: control.value.length
//           }
//         }
//       : null;
//   };
// }

// function comparePasswords(control: AbstractControl): { [key: string]: any } {
//   const password = control.get('password');
//   const confirmPassword = control.get('confirmPassword');
//   return password.value === confirmPassword.value
//     ? null
//     : { passwordsDiffer: true };
// }

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent implements OnInit {
//   public user: FormGroup;
//   public errorMsg: string;

//   get passwordControl(): FormControl {
//     return <FormControl>this.user.get('passwordGroup').get('password');
//   }

//   constructor(
//     private authenticationService: AuthenticationService,
//     private router: Router,
//     private fb: FormBuilder
//   ) {}

//   ngOnInit() {
//     this.user = this.fb.group({
//       username: [
//         '',
//         [Validators.required, Validators.minLength(4)],
//         this.serverSideValidateUsername()
//       ],
//       passwordGroup: this.fb.group(
//         {
//           password: ['', [Validators.required, passwordValidator(12)]],
//           confirmPassword: ['', Validators.required]
//         },
//         { validator: comparePasswords }
//       )
//     });
//   }

//   serverSideValidateUsername(): ValidatorFn {
//     return (control: AbstractControl): Observable<{ [key: string]: any }> => {
//       return this.authenticationService
//         .checkUserNameAvailability(control.value)
//         .pipe(
//           map(available => {
//             if (available) {
//               return null;
//             }
//             return { userAlreadyExists: true };
//           })
//         );
//     };
//   }

//   
// }
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { User } from '../user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: FormGroup;
  public errorMsg: string;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() { }

  registerNewUser(newUser: User) {
    this.authenticationService.register(newUser).subscribe(res => {
      if (res) {
        console.log("new user registered");
        this.authenticationService.getCurrentUser().subscribe(user => {
          console.log("current user: ");
          console.log(user);
          this.authenticationService.sendEmail(user);
        });
      }
    });
  }
}
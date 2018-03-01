import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../user/authentication.service';
import { Observable } from 'rxjs/Rx';
// import {p5} from '../p5.d';
// declare var p5: any;



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private authService: AuthenticationService,) { }

  ngOnInit() {
  }

  
  get currentUser(): Observable<string> {
    return this.authService.user$;
  }

  // setup(){
  //   createCanvas("test");
  // }
}

import { Component, OnInit } from '@angular/core';
declare var p5: any;


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    /*workaround verwijderen canvas: service aanmaken, injecteren in components, remove oproepen */ 
    let test = new p5().remove();
    console.log(test);
  }

}

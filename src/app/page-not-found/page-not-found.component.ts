import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  imageUrls: string[] = ["404.jpg", "404a.png", "404b.png"];
  imageIndex: number;

  constructor() { }

  ngOnInit() {
    this.imageIndex = Math.floor(Math.random() * this.imageUrls.length);
  }

  get imageUrl(){
    return this.imageUrls[this.imageIndex];
  }
}

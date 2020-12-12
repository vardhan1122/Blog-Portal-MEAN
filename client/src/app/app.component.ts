import { Component } from '@angular/core';

//Browser title service import
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Blog-MEAN";

  //create title
  constructor(private titleService:Title) {
    this.titleService.setTitle("BLOG-MEAN");
  }

}

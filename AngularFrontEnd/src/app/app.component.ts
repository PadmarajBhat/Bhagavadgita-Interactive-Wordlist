import { Component } from '@angular/core';
import { CommonService } from './service_files/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public commServ: CommonService) { }
  scrollUp() {
    console.log("scrollUp");
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}

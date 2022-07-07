import { Component } from '@angular/core';
import { CommonService } from './service_files/common.service';

import { NavigationEnd, Router } from '@angular/router';

declare const gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public commServ: CommonService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'G - ZFC7MML5MD', { 'page_path': event.urlAfterRedirects });
      }
    })
}
  scrollUp() {
    console.log("scrollUp");
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}

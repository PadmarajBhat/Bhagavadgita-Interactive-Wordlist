import { Component } from '@angular/core';
import { CommonService } from './service_files/common.service';

import { NavigationEnd, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { environment } from '../environments/environment';

declare const gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedIn = false;
  constructor(public commServ: CommonService, private router: Router, public auth: AngularFireAuth) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'G - ZFC7MML5MD', { 'page_path': event.urlAfterRedirects });
      }
    })

    if (environment.production) {
      this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((x) => {
        console.log("Login Completion : ", x);

        this.loggedIn = x.user ? x.user.emailVerified : this.loggedIn;
        if (this.loggedIn) {
          this.commServ.setUserDetails(x.additionalUserInfo)
        }
      });
    }
    else {

      this.loggedIn = true;
      this.commServ.setUserDetails({ 'profile': { 'name': "Padmaraj", 'email': "padmarajbhat@gmail.com" } })
    }

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

import { Component } from '@angular/core';
import { CommonService } from './service_files/common.service';

import { NavigationEnd, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

declare const gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedIn = false;
  disableButton = true;
  signInButtonText = "Loading...";
  margin_top = (window.innerWidth < 400) ? 50 : 10;
  constructor(public commServ: CommonService, private router: Router, public auth: AngularFireAuth) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'G - ZFC7MML5MD', { 'page_path': event.urlAfterRedirects });
      }
    })

    this.auth.getRedirectResult().then((result) => {
      if (result.user || firebase.auth().currentUser) {
        this.loggedIn = true;
        console.log("Login Reply : ", result, firebase.auth());
        //this.loggedIn = firebase.auth().currentUser?.emailVerified ? true : this.loggedIn;
        if (this.loggedIn) {
          this.commServ.setUserDetails(firebase.auth().currentUser)
        }
      }
      else {
        this.disableButton = false;
        this.signInButtonText = "Sign in with Google";
      }
    })
  }

  signIn() {
    this.disableButton = true;
    this.signInButtonText = "Loading...";
    this.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()).then((x) => {
      console.log("Login Completion : ", x);
    });

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

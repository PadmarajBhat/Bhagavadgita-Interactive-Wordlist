import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-take-atour',
  templateUrl: './take-atour.component.html',
  styleUrls: ['./take-atour.component.css']
})
export class TakeATourComponent implements OnInit {
  videoSource = "./assets/videos/Jay Shri Krishna - Made with Clipchamp.mp4";
  width = window.innerWidth > 400 ? window.innerWidth * .5 : window.innerWidth - window.innerWidth*.05;
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service_files/common.service';

@Component({
  selector: 'app-wordlist',
  templateUrl: './wordlist.component.html',
  styleUrls: ['./wordlist.component.css'],
})
export class WordlistComponent implements OnInit {
  gita_json: any;
  wordArray:String[] = [];

  constructor(private commServ: CommonService) {
    this.gita_json = this.commServ.gita_df;

    this.gita_json.map((row) => {
      row.words.forEach((word) => this.wordArray.push(word));
    });

    this.wordArray = [...new Set(this.wordArray)];
    this.wordArray.sort();
  }

  ngOnInit() {}
}

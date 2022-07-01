import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service_files/common.service';

@Component({
  selector: 'app-wordlist',
  templateUrl: './wordlist.component.html',
  styleUrls: ['./wordlist.component.css'],
})
export class WordlistComponent implements OnInit {
  gita_json: any;
  wordArray: String[] = [];

  //noOfCols = (window.innerWidth < 500) ? 2 : 7;
  noOfCols = (window.innerWidth / 200);
  letters: any[] = [];
  letterSelected: String = '';
    charGroupDict: {};

  constructor(private commServ: CommonService) {
    this.gita_json = this.commServ.gita_df ;

    this.gita_json.map((row) => {
      row.words.forEach((word) => this.wordArray.push(word));
    });

    this.wordArray = [...new Set(this.wordArray)];
    this.wordArray.sort();

    this.charGroupDict = {};
    console.log(this.wordArray);
    this.wordArray.forEach(word => {
      word = word.trim();
      //console.log("'"+word+"'", charGroupDict)
      this.charGroupDict[word.charCodeAt(0)] ? this.charGroupDict[word.charCodeAt(0)].push(word) : this.charGroupDict[word.charCodeAt(0)] = [word]
    })

    //anunasika in ka varg
    this.charGroupDict[2329] = this.wordArray.filter(word => word.includes(String.fromCharCode(2329)))
    console.log(this.charGroupDict);

    //anunasika in cha varg
    this.charGroupDict[2334] = this.wordArray.filter(word => word.includes(String.fromCharCode(2334)))

    // ta varg
    for (let charIndex = 2335; charIndex < 2340; charIndex++) {
      this.charGroupDict[charIndex] = this.wordArray.filter(word => word.includes(String.fromCharCode(charIndex)))
    }

    console.log(this.charGroupDict);
    Object.keys(this.charGroupDict).forEach(key => this.letters.push({ 'value': key, 'viewValue': String.fromCharCode(parseInt(key)) }))

    this.letterSelected = this.letters[0].value;
    this.wordArray = this.charGroupDict[parseInt(this.letterSelected.toString())]
  }

  ngOnInit() {
    
  }
  changeWordArray() {
    this.wordArray = this.charGroupDict[parseInt(this.letterSelected.toString())]

  }

  getDevanagariChar(code: String) {
    return String.fromCharCode(parseInt(code.toString()))
  }

  oneWordClick(word:String) {
    console.log("Initiating Search : ", word);
    this.commServ.search(word.toString());
  }
}

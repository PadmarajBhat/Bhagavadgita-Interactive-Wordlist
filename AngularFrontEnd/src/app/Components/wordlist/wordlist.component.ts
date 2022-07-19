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
  hasWordArray: String[] =[];

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

      if (this.charGroupDict[word.charCodeAt(0)]) {
        if ('startingWith' in this.charGroupDict[word.charCodeAt(0)]) {
          this.charGroupDict[word.charCodeAt(0)]['startingWith'].push(word)
        } else {
          this.charGroupDict[word.charCodeAt(0)]['startingWith'] = [word]
        }
      } else {
        this.charGroupDict[word.charCodeAt(0)] = { startingWith :[word],has:[]}
      }
    })

    //console.log("this.charGroupDict : ", this.charGroupDict);

    //anunasika in ka varg
    this.charGroupDict[2329] = { startingWith:[],has: this.wordArray.filter(word => word.includes(String.fromCharCode(2329))) }
    //console.log("this.charGroupDict : ",this.charGroupDict);

    //anunasika in cha varg
    this.charGroupDict[2334] = { startingWith:[], has: this.wordArray.filter(word => word.includes(String.fromCharCode(2334))) }

    // ta varg
    for (let charIndex = 2335; charIndex < 2340; charIndex++) {
      this.charGroupDict[charIndex] = { startingWith: [], has: this.wordArray.filter(word => word.includes(String.fromCharCode(charIndex))) }
    }


    console.log("this.charGroupDict : ",this.charGroupDict);

    //add words which HAS the alphabet

    Object.keys(this.charGroupDict).forEach(key =>
      this.charGroupDict[key]['has'] = this.wordArray.
        filter(
          (word: any) => (word.includes(String.fromCharCode(parseInt(key))) && parseInt(key) > 2325 &&
            (!(this.charGroupDict[key]['startingWith'].includes(word)))
          )
        )
    )
        
    console.log(this.charGroupDict);


    Object.keys(this.charGroupDict).forEach(key => this.letters.push({ 'value': key, 'viewValue': String.fromCharCode(parseInt(key)) }))

    this.letterSelected = this.letters[0].value;
    this.wordArray = this.charGroupDict[parseInt(this.letterSelected.toString())]['startingWith']
    this.hasWordArray = this.charGroupDict[parseInt(this.letterSelected.toString())]['has']
  }

  ngOnInit() {
    
  }
  changeWordArray() {
    this.wordArray = this.charGroupDict[parseInt(this.letterSelected.toString())]['startingWith']
    this.hasWordArray = this.charGroupDict[parseInt(this.letterSelected.toString())]['has']

  }

  getDevanagariChar(code: String) {
    return String.fromCharCode(parseInt(code.toString()))
  }

  oneWordClick(word:String) {
    console.log("Initiating Search : ", word);
    this.commServ.search(word.toString());
  }
}

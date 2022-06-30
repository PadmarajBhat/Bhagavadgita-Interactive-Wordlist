import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonService } from '../../service_files/common.service';

@Component({
  selector: 'app-wordcloud',
  templateUrl: './wordcloud.component.html',
  styleUrls: ['./wordcloud.component.css'],
})
export class WordcloudComponent implements OnInit {
  gita_Json: any;
  data: any[]= [];
  width = window.outerWidth;
  height = window.outerHeight;
  chapters = new FormControl();
  svg: any;
  layout: any;

  chapterList: string[] = [
    'Chapter 1',
    'Chapter 2',
    'Chapter 3',
    'Chapter 4',
    'Chapter 5',
    'Chapter 6',
    'Chapter 7',
    'Chapter 8',
    'Chapter 9',
    'Chapter 10',
    'Chapter 11',
    'Chapter 12',
    'Chapter 13',
    'Chapter 14',
    'Chapter 15',
    'Chapter 16',
    'Chapter 17',
    'Chapter 18',
  ];
  uvacha = new FormControl();

  uvachaList: string[] = ['श्रीभगवान', 'अर्जुन', 'सञ्जय', 'धृतराष्ट्र'];

  constructor(public commServ: CommonService) {
    this.gita_Json = this.commServ.gita_df;
    let context = this.commServ.getWordCloudContext();
    console.log(context);
    if (!context) {
      this.fetchD3DataArray(this.gita_Json);
    } else {
      this.data = context['data'];
      this.chapters = context['chapters'];
      this.uvacha = context.uvacha;
    }
  }

  ngOnInit() {
    console.log(this.data)}

  getUvachaList() {
    //console.log('what is form', this.chapters);
    if (this.chapters.value == null) {
      return this.uvachaList;
    } else {
      let selectedChapterUvachaList:String[] = [];
      for (let chapter of this.chapters.value) {
        this.gita_Json.forEach((row) => {
          if (row.chapter_number == chapter.split(' ')[1]) {
            selectedChapterUvachaList.push(row['uvacha']);
          }
        });
      }
      return [...new Set(selectedChapterUvachaList)];
    }
  }

  oneWordClick(event: any) {
    let context = {};
    context['chapters'] = this.chapters;
    context['uvacha'] = this.uvacha;
    context['searchString'] = event.word.text;
    context['data'] = this.data;
    this.commServ.setWordCloudContext(context);
    console.log('context saved : ', context);
    this.commServ.search(event.word.text);
  }

  assignWordMinMaxSize(wordObjectArray: any[]) {
    let countArray:String[] = [];
    wordObjectArray.forEach((wordObject) => countArray.push(wordObject.count));
    let countArrayMin: number = Number(countArray[countArray.length - 1]);
    let countArrayMax: number = Number(countArray[0]);
    let scaleToMin: number = 10;
    let scaleToMax:number = 100;
    let multiplyRatio: number =
      (scaleToMax - scaleToMin) /
      (countArrayMax - countArrayMin == 0 ? 1 : countArrayMax - countArrayMin);

    console.log(
      'Values: ',
      countArray,
      countArrayMin,
      countArrayMax,
      multiplyRatio
    );

    wordObjectArray.forEach(
      (wordObject) =>
      (wordObject.value =
          scaleToMin + (wordObject.count - countArrayMin) * multiplyRatio)
    );
    console.log('wordObjectArray', wordObjectArray);
    return wordObjectArray.slice(0);
  }

  fetchD3DataArray(filteredSlokas: any) {
    let wordArray:string[] = [];
    for (let row of filteredSlokas) {
      row.words.forEach((x) => wordArray.push(x));
    }
    let counts = {};
    for (let word of wordArray) {
      counts[word] = counts[word] ? counts[word] + 1 : 1;
    }

    let word2Array:any[] = [];
    Object.keys(counts).forEach((key) =>
      word2Array.push({ text: key, count: counts[key] })
    );
    word2Array.sort((a, b) => (a.count < b.count ? 1 : -1));

    this.data = this.assignWordMinMaxSize(word2Array);
  }

  reloadData(event: any) {
    console.log('Uvacha Changed', event);
    let filteredSlokas:any[] = [];
    for (let row of this.gita_Json) {
      if (this.chapters.value != null && this.chapters.value.length > 0) {
        for (let chapter of this.chapters.value) {
          if (this.uvacha.value != null && this.uvacha.value.length > 0) {
            for (let uvac of this.uvacha.value) {
              //console.log(chapter, uvac, row.uvacha, row.chapter_number);
              if (
                row.uvacha == uvac &&
                row.chapter_number == chapter.split(' ')[1]
              ) {
                filteredSlokas.push(row);
              }
            }
          } else {
            //all uvacha
            if (row.chapter_number == chapter.split(' ')[1]) {
              filteredSlokas.push(row);
            }
          }
        }
      } else {
        //all chapters
        //console.log('Row in reload data : ', row);

        if (this.uvacha.value != null && this.uvacha.value.length > 0) {
          for (let uvac of this.uvacha.value) {
            if (row.uvacha == uvac) {
              filteredSlokas.push(row);
            }
          }
        } else {
          filteredSlokas = this.gita_Json;
          break;
        }
      }
    }
    console.log('Reloaded Data : ', filteredSlokas);
    this.fetchD3DataArray(filteredSlokas);
  }


  d3Script() {
    /* <script>

    // List of words
    var myWords = [{ word: "Running", size: "10" }, { word: "Surfing", size: "20" }, { word: "Climbing", size: "50" }, { word: "Kiting", size: "30" }, { word: "Sailing", size: "20" }, { word: "Snowboarding", size: "60" }]

    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 10, bottom: 10, left: 10 },
      width = 450 - margin.left - margin.right,
      height = 450 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
    // Wordcloud features that are different from one word to the other must be here
    var layout = d3.layout.cloud()
      .size([width, height])
      .words(myWords.map(function (d) { return { text: d.word, size: d.size }; }))
      .padding(5)        //space between words
      .rotate(function () { return ~~(Math.random() * 2) * 90; })
      .fontSize(function (d) { return d.size; })      // font size of words
      .on("end", draw);
    layout.start();

    // This function takes the output of 'layout' above and draw the words
    // Wordcloud features that are THE SAME from one word to the other can be here
    function draw(words) {
      svg
        .append("g")
        .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
        .selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-size", function (d) { return d.size; })
        .style("fill", "#69b3a2")
        .attr("text-anchor", "middle")
        .style("font-family", "Impact")
        .attr("transform", function (d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function (d) { return d.text; });
    }
  </script> */
  }
}

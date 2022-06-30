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
    
  }

  ngOnInit() {
    console.log("ngOnInit",this.data);
    let context = this.commServ.getWordCloudContext();
    console.log("Context : ", context);
    if (context) {
        this.chapters = context['chapters'];
        this.uvacha = context.uvacha;
    }
    this.reloadData();
  }

  getUvachaList() {

    if (this.chapters.value == null || this.chapters.value.length < 1) {
      return this.uvachaList;
    }

    let chapterFilteredSlokas: any[] = this.getChapterFilteredSlokas();
    let selectedChapterUvachaList: String[] = [];
    chapterFilteredSlokas.forEach(sloka => selectedChapterUvachaList.push(sloka['uvacha']))
    return [...new Set(selectedChapterUvachaList)];
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
    let countArrayMin: number = Number(wordObjectArray[wordObjectArray.length - 1]['count']);
    let countArrayMax: number = Number(wordObjectArray[0]['count']);
    let scaleToMin: number = (countArrayMax - countArrayMin == 0)?30:10;
    let scaleToMax:number = 100;
    let multiplyRatio: number =
      (scaleToMax - scaleToMin) /
      (countArrayMax - countArrayMin == 0 ? 1 : countArrayMax - countArrayMin);

    console.log(
      'Values: ',
      wordObjectArray,
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

  saveContext() {
    let context = {};
    context['chapters'] = this.chapters;
    context['uvacha'] = this.uvacha;
    context['searchString'] = '';
    this.commServ.setWordCloudContext(context);
    console.log('context saved : ', context);
  }
  getChapterFilteredSlokas() {
    let chapterFilteredSloka: any[] = this.gita_Json;

    console.log("Chapters : ", this.chapters.value);
    console.log("Uvacha : ", this.uvacha.value);

    if (this.chapters.value != null && this.chapters.value.length > 0) {
      let chapterNumber: Number[] = [];
      this.chapters.value.forEach(x => chapterNumber.push(parseInt(x.split(' ')[1])))
      console.log("Chapter Selected : ", chapterNumber)
      chapterFilteredSloka = chapterFilteredSloka.filter(row => chapterNumber.includes(row['chapter_number']))
    }
    console.log("chapterFilteredSloka : ", chapterFilteredSloka);
    return chapterFilteredSloka;
  }
  reloadData() {
    this.saveContext();

    let chapterFilteredSloka:any[] = this.getChapterFilteredSlokas();    

    if (this.uvacha.value != null && this.uvacha.value.length > 0) {
      chapterFilteredSloka = chapterFilteredSloka.filter(row => this.uvacha.value.includes(row['uvacha']))
    }
    console.log("Final chapterFilteredSloka : ", chapterFilteredSloka);

    let wordCountDict: any = {};
    chapterFilteredSloka.map(row => {
      row.words.forEach((word:string) => {
          wordCountDict[word] = wordCountDict[word] ? wordCountDict[word] + 1 : 1;
      })
    })

    let word2Array: any[] = [];
    Object.keys(wordCountDict).forEach((key) =>
      word2Array.push({ text: key, count: wordCountDict[key] })
    );
    word2Array.sort((a, b) => (a.count < b.count ? 1 : -1));

    this.data = this.assignWordMinMaxSize(word2Array.slice(0,1000));

  }
  

}

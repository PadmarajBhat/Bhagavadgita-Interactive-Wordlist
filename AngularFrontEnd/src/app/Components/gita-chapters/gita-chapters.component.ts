import { elementSelectors } from '@angular/cdk/schematics';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonService } from '../../service_files/common.service';

@Component({
  selector: 'app-gita-chapters',
  templateUrl: './gita-chapters.component.html',
  styleUrls: ['./gita-chapters.component.css'],
})
export class GitaChaptersComponent implements OnInit {
  chapters = new FormControl();

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
  groupList: any;
  result: any;
  localContext: any;

  constructor(public commServe: CommonService) {
    this.groupList = this.commServe.gita_df;

    this.result = this.groupList.reduce(function (r, a) {
      r[a.chapter_number] = r[a.chapter_number] || [];
      r[a.chapter_number].push(a);
      return r;
    }, Object.create(null));

    console.log('Result :', this.result);

    this.localContext = this.commServe.getSlokaContext();
    console.log('Got context....:', this.localContext);

    if (this.localContext) {
      if (this.localContext['chapters_selected']) {
        this.chapters.setValue(this.localContext['chapters_selected']);
      } else {
        this.chapters.setValue([]);
      }
    }
  }

  ngOnInit() {
    console.log('ngOnInit called');
    // this.scroll();
  }
  ngAfterViewInit() {
    console.log('ngAfterViewInit called');
    this.scroll();
  }

  getSlokaLines(slokaContext: any) {
    let lines:string[] = [];
    let uvacha_list = [
      'धृतराष्ट्र उवाच',
      'सञ्जय उवाच',
      'अर्जुन उवाच',
      'श्री भगवानुवाच',
    ];
    for (let uvacha of uvacha_list) {
      if (slokaContext.text.includes(uvacha)) {
        lines.push(uvacha);
      }
    }

    slokaContext.cleansed_sloka
      .split('।')
      .slice(0, 2)
      .forEach((line) => lines.push(line));

    return lines;
  }
  oneWordClick(searchString: string, context: any) {
    context['chapters_selected'] = this.chapters.value;
    this.commServe.setSlokaContext(context);
    console.log('context saved : ', context);
    this.commServe.search(searchString);
  }

  scroll() {
    console.log('scroll started', this.localContext);
    if (this.localContext && this.localContext['chapters_selected']) {
      let idString =
        this.localContext.chapter_number + '.' + this.localContext.verse_number;
      console.log('idString : ', idString);
      let idElement = document.getElementById(idString);
      //console.log('idElement :', document, idElement);
      // idElement.scrollIntoView({
      //   behavior: 'smooth',
      //   block: 'start',
      //   //inline: 'nearest',
      //   top: idElement.offsetTop
      // });

      window.scroll({ top: idElement?.offsetTop, behavior: 'smooth' });
      console.log('scroll ended');
    }
  }
}

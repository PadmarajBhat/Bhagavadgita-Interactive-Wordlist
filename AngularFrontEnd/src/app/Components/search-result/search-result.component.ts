import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CommonService } from '../../service_files/common.service';

//import metaWordList from '../../json_files/json_master_meta_word_list.json';
//import gDfJson from '../../json_files/g_df.json';
import { SearchWordsService } from '../../service_files/search-words.service';

// export interface SearchContextInterface {
//   searched: boolean;
//   searchText: string;
//   found: boolean;
//   foundMetaWord: any;
// }

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
  uvacha_list = ['श्रीभगवान', 'सञ्जय', 'धृतराष्ट्र', 'अर्जुन'];
  // myControl = new FormControl('');
  // mWrodList = JSON.parse(metaWordList);
  // gJson = gDfJson;

  // randomText = `"<a href="">I am hyperlinked</a>"`;

  // searchContext: SearchContextInterface;

  // options: string[] = [];
  // filteredOptions: Observable<string[]>;
  constructor(public commServ: CommonService) {
    // this.searchContext = {
    //   searched: false,
    //   searchText: '',
    //   found: false,
    //   foundMetaWord: [],
    // };
    // this.options = this.searchService.getAllSlokaWords();
    // console.log(this.searchContext);
  }

  ngOnInit() {
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map((value) => this._filter(value || ''))
    // );
    // console.log('json : ', this.mWrodList, '\ng_df :', this.gJson);
    // //this.options = this.mWrodList.forEach((x)=>{x.word})
    // // this.mWrodList.forEach((x) => {
    // //   this.options.push(x.word);
    // //   if (x.t_word != 'NA') this.options.push(x.t_word);
    // // });
    // console.log(this.options);
  }
  // private _filter(value: string): string[] {
  //   //const filterValue = value.toLowerCase();
  //   this.searchContext.found = false;
  //   return this.options
  //     .filter((option) =>
  //       //option.toLowerCase().includes(filterValue)
  //       option.includes(value)
  //     )
  //     .slice(0, 50);
  // }

  // onSubmit(inputSearchText: string) {
  //   console.log('Input Value : ', inputSearchText);
  //   this.searchContext.searched = true;
  //   this.searchContext.searchText = inputSearchText;
  //   console.log(
  //     'New Search Result : ',
  //     this.searchService.getSearchResult(inputSearchText)
  //   );
  //   console.log(this.mWordList_search(this.searchContext.searchText));
  // }

  // getSlokaForMetaWord(mWord: any) {
  //   for (let u_s of mWord.uvacha_sloka_sort) {
  //     let listOfSlokas = [];
  //     for (let slokaNumber of u_s[1]) {
  //       listOfSlokas.push(this.getSlokaForSlokaNum(slokaNumber));
  //     }
  //     u_s.push(listOfSlokas);
  //   }

  //   return mWord;
  // }
  // mWordList_search(value: string) {
  //   for (let row of this.gJson) {
  //     if (row.text.includes(value)) {
  //       console.log(row);
  //     }
  //   }
  //   for (let mWord of this.mWrodList) {
  //     if (mWord.word == value || mWord.t_word == value) {
  //       this.searchContext.foundMetaWord = this.getSlokaForMetaWord(mWord);
  //       this.searchContext.searchText = mWord.word;
  //       this.searchContext.found = true;
  //       return mWord;
  //     }
  //   }
  //   this.searchContext.found = false;
  //   return {};
  // }
  ngAfterViewInit() {
    console.log('ngAfterViewInit at search');
  }
  onWordClick(searchString: string, event) {
    event.stopPropagation();
    console.log('onWordClick', searchString);
    this.commServ.search(searchString);
  }

  getUvachaResult(uvachaName: string) {
    return this.commServ
      .getSearchResult()
      .filter((row) => row.uvacha == uvachaName);
  }
  contentClicked(context: any) {
    console.log('Content Clicked', context);
    context['chapters_selected'] = ['Chapter ' + context.chapter_number];
    this.commServ.setSlokaContext(context);
    this.commServ.switchTo(2);
  }
}

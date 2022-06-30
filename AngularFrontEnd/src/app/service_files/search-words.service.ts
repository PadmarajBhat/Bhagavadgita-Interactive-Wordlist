import { Injectable } from '@angular/core';
import { ProcessDataService } from './process-data.service';


@Injectable()
export class SearchWordsService {
  gitaJson: any;
  searched = false;
  searchText = "";
  found = false;
  searchResult: any;

  constructor(processDataSer: ProcessDataService) {
    this.gitaJson = processDataSer.getGitaJson();
  }

 

  getSearchResult(searchText: string) {
    let slokaList = [];
    let tSlokaList = [];
    if (searchText.split(' ').length == 1) {
      slokaList = this.gitaJson.filter(
        (row) => row['words'].includes(searchText)
        //console.log('Searching row:', row['cleansed_sloka']);
      );
      //console.log('sloka list : ', searchText, slokaList);
      tSlokaList = this.gitaJson.filter((row) =>
        row['t_words'].includes(searchText)
      );
    } else {
      slokaList = this.gitaJson.filter(
        (row) => row['cleansed_sloka'].includes(searchText)
        //console.log('Searching row:', row['cleansed_sloka']);
      );
      //console.log('sloka list : ', searchText, slokaList);
      tSlokaList = this.gitaJson.filter((row) =>
        row['cleansed_t_sloka'].includes(searchText)
      );
    }

    let result = [...slokaList, ...tSlokaList];

    this.searchText = searchText;
    this.searchResult = [...new Set(result)];
    this.found = this.searchResult.length > 0 ? true : false;
    this.searched = true;
    console.log('search result : ', this.searchResult);
  }

  getSlokaForSlokaNum(number: string) {
    for (let row of this.gitaJson) {
      if (
        row.chapter_number == Number(number.split('.')[0]) &&
        row.verse_number == Number(number.split('.')[1])
      ) {
        console.log(number, row);
        return row.text;
      }
    }
    return '';
  }
}

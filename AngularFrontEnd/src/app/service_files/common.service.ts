import { Injectable } from '@angular/core';
import { Constants } from '../Interface_Files/constants.enum';
import { ChapterService } from './chapter.service';
import { ProcessDataService } from './process-data.service';
import { SearchWordsService } from './search-words.service';
import { WordcloudService } from './wordcloud.service';

@Injectable()
export class CommonService {
  componentIndicator: Number;
  gita_df: any;
  constructor(
    private searchService: SearchWordsService,
    private chapterService: ChapterService,
    private wordCloudService: WordcloudService,
    private processDataService: ProcessDataService
  ) {
    this.componentIndicator = Constants.WORD_LIST;
    this.gita_df = this.searchService.gitaJson;
  }

  switchTo(number: Constants) {
    this.componentIndicator = number;
    console.log('Switch To : ', number);
  }

  search(text: string) {
    this.searchService.getSearchResult(text);
    this.componentIndicator = Constants.SEARCH;
  }
  getAllSlokaWords() {
    return this.processDataService.getAllSlokaWords();
  }
  getSearchText() {
    return this.searchService.searchText;
  }
  setSlokaContext(context: any) {
    this.chapterService.setSlokaContext(context);
  }

  getSlokaContext() {
    return this.chapterService.getSlokaContext();
  }

  getSearchResult() {
    return this.searchService.searchResult;
  }
  getSearchFound() {
    return this.searchService.found;
  }

  setWordCloudContext(context:any) {
    this.wordCloudService.setWordCloudContext(context);
  }
  getWordCloudContext() {
    return this.wordCloudService.getWordCloudContext();
  }
}

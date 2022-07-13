import { Injectable } from '@angular/core';
import { Constants } from '../Interface_Files/constants.enum';
import { ChapterService } from './chapter.service';
import { ProcessDataService } from './process-data.service';
import { ProcessUserdataService } from './process-userdata.service';
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
    private processDataService: ProcessDataService,
    private processUserDataService: ProcessUserdataService
  ) {

    let defaultServiceToLaunch = [Constants.WORD_LIST, Constants.WORD_CLOUD, Constants.GITA_CHAPTERS]
    this.componentIndicator = defaultServiceToLaunch[Math.floor(Math.random() * defaultServiceToLaunch.length)];
    this.gita_df = this.searchService.gitaJson;
  }

  switchTo(number: Constants, buttonClicked?: Boolean) {

    if (number == Constants.GITA_CHAPTERS && buttonClicked) {
      let context = this.chapterService.getSlokaContext();
      if (context) {
        context['verse_number'] = 1;
        this.chapterService.setSlokaContext(context);
      }
      console.log("switchTo :", number, context);
    }

    this.componentIndicator = number;
    console.log('Switch To : ', number);

    this.processUserDataService.updateUserActivity(number)
  }

  search(text: string) {
    this.searchService.getSearchResult(text);
    this.componentIndicator = Constants.SEARCH;
    this.processUserDataService.updateUserActivity(Constants.SEARCH, text);
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

  setBellCounter() {
    this.processUserDataService.setBellCounter();
  }
}

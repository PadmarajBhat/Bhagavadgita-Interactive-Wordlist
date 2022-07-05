import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service_files/common.service';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
  uvacha_list = ['श्रीभगवान', 'सञ्जय', 'धृतराष्ट्र', 'अर्जुन'];

  constructor(public commServ: CommonService) {

  }

  ngOnInit() {
  }
  
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

  getSearchIndexArrayResult(searchIndexArray, wordStartIndex, wordEndIndex) {

    let result: any[] = [];

    result = searchIndexArray.filter(indexObject => 
      //word is overlapping searched word
      ((indexObject.startIndex <= wordStartIndex) && (wordStartIndex < indexObject.endIndex))
        || ((indexObject.startIndex <= wordEndIndex) && (wordEndIndex < indexObject.endIndex))

        //word is smaller than searched word
        || ((indexObject.startIndex <= wordStartIndex) && (wordEndIndex < indexObject.endIndex))

        //word is bigger than searched word
        || ((wordStartIndex <= indexObject.startIndex) && (indexObject.endIndex <= wordEndIndex))

    )
    
    return result.length>0?true:false
  }

  getHighlightArray(searchIndexArray:any[], traceIndex:number, wordArray: String) {
    let assignIndex = traceIndex;
    let wordStructArray: any[] = [];

    wordArray.split(" ").forEach(word => {
      word = word.replaceAll('\n', '').replaceAll(' ', '')
      wordStructArray.push(
        {
          'word': word,
          /* 
           * */
          'highlight': this.getSearchIndexArrayResult(searchIndexArray, assignIndex, assignIndex + word.length)
            ? true : false,

          'indexStart': assignIndex,
          'indexEnd': assignIndex + word.length
        })
       // console.log(word, startIndex, assignIndex, assignIndex + word.length + 1, endIndex)
      assignIndex += word.length + 1;
      //console.log(word, startIndex, assignIndex,  assignIndex + word.length + 1, endIndex)
    })

    //console.log(wordArray, wordStructArray, searchIndexArray)
    return wordStructArray
  }

  returnWordStructureArray(sloka:String, lines:any[]) {
    let searchText = this.commServ.getSearchText();

    let searchIndexArray: any[] = [];
    let loopindex = -2;
    while (loopindex != -1) {
      loopindex = sloka.indexOf(searchText, loopindex + 1);
      searchIndexArray.push({
        'startIndex': loopindex,
        'endIndex': loopindex == -1 ? -1 : loopindex + searchText.length
      })
    }

    let wordStructArray: any[] = [];
    wordStructArray.push(this.getHighlightArray(searchIndexArray, 0, lines[0]))
    wordStructArray.push(this.getHighlightArray(searchIndexArray, lines[0].length, lines[1]))
    return wordStructArray
  }

  getSlokaHighlightWords(item: any) {
    //console.log("What is in : ", sloka)
    let sloka = item['cleansed_sloka']
    //console.log("What is in : ", item, sloka);

    let lines = sloka.split('।').slice(0, 2);
    
    let slokaWordArray = this.returnWordStructureArray(sloka, lines);

    /*.......................5.28............caused issue to below code ......*/
    //if (item['cleansed_t_sloka']) {
    //  console.log(item);
    //  sloka = item['cleansed_t_sloka'];
    //  lines = sloka.split('\n').slice(0, 2);

    //  let t_slokaWordArray = this.returnWordStructureArray(sloka, lines);

    //  console.log(t_slokaWordArray)
    //}
    //else {console.log(item) }
    
    
    return slokaWordArray
  }
}

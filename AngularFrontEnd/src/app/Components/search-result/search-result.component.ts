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

  getSlokaHighlightWords(sloka: String) {
    if (sloka.includes('ज्ञानमावृत्य') ){
      console.log("What is in : ", sloka)
    }
    let lines = sloka.split('।').slice(0, 2);

    let startIndex = sloka.indexOf(this.commServ.getSearchText());
    let endIndex = startIndex + this.commServ.getSearchText().length;
    //console.log("Indexes : ", startIndex, endIndex, lines);

    let assignIndex = 0;
    let wordStructArray: any[] = [];

    lines[0].split(" ").forEach(word => {
      word = word.replaceAll('\n', '').replaceAll(' ', '')
      wordStructArray.push(
        {
          'word': word,
          /* 
           * */
          'highlight':
            //word is overlapping searched word
            ((startIndex <= assignIndex) && (assignIndex < endIndex))
              || ((startIndex <= assignIndex + word.length) && (assignIndex + word.length < endIndex))

              //word is smaller than searched word
              || ((startIndex <= assignIndex) && (assignIndex + word.length < endIndex))

              //word is bigger than searched word
              || ((assignIndex <= startIndex) && (endIndex <= assignIndex + word.length)) ? true : false,

          'indexStart': assignIndex,
          'indexEnd': assignIndex + word.length
        })
      if (word == 'ज्ञानमावृत्य') {
        console.log(word, startIndex, assignIndex, assignIndex + word.length + 1, endIndex)
      }
      assignIndex += word.length + 1;
      //console.log(word, startIndex, assignIndex,  assignIndex + word.length + 1, endIndex)
    })

    let wordStructArray2: any[] = [];

    //+1 for '|'
    //assignIndex += 1

    lines[1].split(" ").forEach(word => {
      word = word.replaceAll('\n', '').replaceAll(' ', '')

      wordStructArray2.push(
        {
          'word': word,
          'highlight': //word is overlapping searched word
            ((startIndex <= assignIndex) && (assignIndex < endIndex))
              || ((startIndex <= assignIndex + word.length) && (assignIndex + word.length < endIndex))

              //word is smaller than searched word
              || ((startIndex <= assignIndex) && (assignIndex + word.length < endIndex))

              //word is bigger than searched word
              || ((assignIndex <= startIndex) && (endIndex <= assignIndex + word.length)) ? true : false,
          'indexStart': assignIndex,
          'indexEnd': assignIndex + word.length
        })
      if (word == 'ज्ञानमावृत्य') {
        console.log(word, startIndex, assignIndex, assignIndex + word.length + 1, endIndex)
      }
      assignIndex += word.length + 1;
    })

    //console.log("Display Array : ", [wordStructArray, wordStructArray2])
    return [wordStructArray, wordStructArray2]
  }
}

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
}

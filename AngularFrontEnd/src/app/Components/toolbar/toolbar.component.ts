import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CommonService } from '../../service_files/common.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  myControl = new FormControl('');
  options: String[] = [];
  filteredOptions: Observable<String[]>;

  constructor(public commServ: CommonService) {
    this.options = this.commServ.getAllSlokaWords();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  ngOnInit() {
    
  }
  private _filter(value: string): String[] {
    const filterValue = value.toLowerCase();
    this.commServ.search(filterValue);
    return this.options
      .filter((option) => option.toLowerCase().includes(filterValue))
      .slice(0, 50);
  }
  onSearchSubmit(searchString: string) {
    console.log('calling service ', searchString);
    this.commServ.search(searchString);
  }
}

import { Component, OnInit } from '@angular/core';
import { FbaseService } from '../../../service_files/fbase.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogWindowComponent } from './dialog-window/dialog-window.component';
import { CommonService } from '../../../service_files/common.service';


@Component({
  selector: 'app-bell-component',
  templateUrl: './bell-component.component.html',
  styleUrls: ['./bell-component.component.css']
})
export class BellComponentComponent implements OnInit {
  counter: number = 0;
  constructor(public fbase: FbaseService, public dialog: MatDialog, private commService: CommonService) {
    fbase.getCounter().subscribe((data) => { console.log("Data at buttong :", data); this.counter = data.count });
    
  }

  ngOnInit(): void {

  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogWindowComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  incrementCounter() {
    this.fbase.setCounter(++this.counter);
    this.openDialog();

    this.commService.setBellCounter();
  }

}

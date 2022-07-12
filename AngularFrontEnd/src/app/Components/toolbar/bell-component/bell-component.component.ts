import { Component, OnInit } from '@angular/core';
import { FbaseService } from '../../../service_files/fbase.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogWindowComponent } from './dialog-window/dialog-window.component';


@Component({
  selector: 'app-bell-component',
  templateUrl: './bell-component.component.html',
  styleUrls: ['./bell-component.component.css']
})
export class BellComponentComponent implements OnInit {
  counter: number = 0;
  constructor(public fbase: FbaseService, public dialog: MatDialog) {
    fbase.getCounter().subscribe((data) => { console.log("Data at buttong :", data.data().count); this.counter = data.data().count });

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
  }

}

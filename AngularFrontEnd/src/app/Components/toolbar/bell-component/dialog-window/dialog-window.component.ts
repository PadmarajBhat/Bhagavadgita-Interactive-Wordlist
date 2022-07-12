import { Component, OnInit } from '@angular/core';
import { allowedNodeEnvironmentFlags } from 'process';
import { CommonService } from '../../../../service_files/common.service';

@Component({
  selector: 'app-dialog-window',
  templateUrl: './dialog-window.component.html',
  styleUrls: ['./dialog-window.component.css']
})
export class DialogWindowComponent implements OnInit {

  constructor(cs: CommonService) {
    let allSlokas = cs.gita_df;
    //console.log(allSlokas.filter(x => x.uvacha = "arjun"), allSlokas);

    let dummy:String[] = [];
    cs.gita_df.forEach((x) => dummy.push(x.uvacha))
    console.log("Dummy : ", [...new Set(dummy)]);
  }

  ngOnInit(): void {
  }

}

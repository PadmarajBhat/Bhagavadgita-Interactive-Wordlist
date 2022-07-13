import { Component, OnInit } from '@angular/core';
import { allowedNodeEnvironmentFlags } from 'process';
import { CommonService } from '../../../../service_files/common.service';
import { FbaseService } from '../../../../service_files/fbase.service';

@Component({
  selector: 'app-dialog-window',
  templateUrl: './dialog-window.component.html',
  styleUrls: ['./dialog-window.component.css']
})
export class DialogWindowComponent implements OnInit {
  sloka: any;
  image: any;
  constructor(cs: CommonService, fbservice: FbaseService) {
    let allSlokas = cs.gita_df;

    let sriKrishnaSlokas = allSlokas.filter((x) => x.uvacha == "श्रीभगवान")
    //console.log("sriKrishnaSlokas : ", sriKrishnaSlokas, allSlokas)

    this.sloka = sriKrishnaSlokas[Math.floor(Math.random() * sriKrishnaSlokas.length)]
    //console.log("sriKrishnaSlokas : ", sriKrishnaSlokas, allSlokas, this.sloka)
    let imageList = fbservice.getImageList()
    this.image = imageList[Math.floor(Math.random() * imageList.length)];
  }

  ngOnInit(): void {
  }

}

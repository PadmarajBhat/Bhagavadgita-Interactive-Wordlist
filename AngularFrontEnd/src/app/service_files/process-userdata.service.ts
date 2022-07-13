import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FbaseService } from './fbase.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessUserdataService {
  myIpDetails = {};
  myIpHistory: any = {};
  myDbId: string = '';
  constructor(private http: HttpClient, private fbService: FbaseService) {
    this.http.get<any>('https://geolocation-db.com/json/').subscribe(
      (data) => {
        console.log("ip details : ", data); this.myIpDetails = data; this.getUserHistory();
      })

    
  }

  getUserHistory() {
    this.fbService.getIpDetails(this.myIpDetails['IPv4']).then(data => {
      if (data.docs[0]) {
        this.myIpHistory = data.docs[0].data(); this.myDbId = data.docs[0].id;
      } else {
        this.myIpHistory = this.myIpDetails;
      }
       console.log("getUserDocId : ", this.myIpHistory, this.myDbId)
    });
  }
  updateUserHistory() {
    this.fbService.updateIpDetails(this.myDbId, this.myIpHistory)
      .then(doc => {
        if (doc) {
          console.log("Db Update : ", doc);
          doc.get().then((data) => {
            console.log("Db Update Data: ", data);
            this.myIpHistory = data.data(); this.myDbId = data.id; console.log("New Loaded : ", this.myIpHistory, this.myDbId)
          })
        }
      }).catch((error) => { console.log("DB Update error : ", error); this.myDbId = ''; this.updateUserHistory() })
  
    //addedDocument.then((data:any) => {
    //  console.log("updateUserHistory : ", data);
    //  if (data) {
    //    this.myIpHistory = data.docs[0].data(); this.myDbId = data.docs[0].id;
    //  }
    //})
  }

  setBellCounter() {

    this.myIpHistory['bellCounter'] = ('bellCounter' in this.myIpHistory) ? ++this.myIpHistory['bellCounter'] : 0;
    this.updateUserHistory();
  }

  updateUserActivity(activity: number, searchString?: String) {
    let activityMapper = { 1: "Search", 2: "Chapters", 3: "Word List", 4: "Word Cloud" };
    let activityData = {
      activity: activityMapper[activity],
      time: new Date(),
      searchString: searchString ? searchString : ''
    };

    if ('activityList' in this.myIpHistory) {
      this.myIpHistory['activityList'].push(activityData);
    } else {
      this.myIpHistory['activityList'] = [activityData]

    }

    this.updateUserHistory();
  }

}

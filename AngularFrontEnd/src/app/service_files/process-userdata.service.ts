import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FbaseService } from './fbase.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessUserdataService {
  myData: any = {};
  myIpDetails: any = {};
  myDbId: string = '';
  constructor(private http: HttpClient, private fbService: FbaseService) {
    this.http.get<any>('https://geolocation-db.com/json/').subscribe(
      (data) => {
        data['time'] = new Date();
        console.log("ip details : ", data); this.myIpDetails = data;
        //this.getUserHistory();
      })

    //this.myData['locationList']
  }

  getUserHistory() {
    
    this.fbService.getUserDetails(this.myData.emailId).then(data => {
      if (data.docs[0]) {
        this.myData = data.docs[0].data(); this.myDbId = data.docs[0].id;
        //} else {
        //  this.myData['locationList'] = this.myIpDetails;
        //}
      }
      ('locationList' in this.myData) ?
        this.myData['locationList'].push(this.myIpDetails) :
        this.myData['locationList'] = [this.myIpDetails];
       console.log("getUserDocId : ", this.myData, this.myDbId)
    });
  }
  updateUserDocument() {
    this.fbService.updateUserDoc(this.myDbId, this.myData)
      .then(doc => {
        if (doc) {
          console.log("Documented Added : ", doc);
          doc.get().then((data) => {
            console.log("Documented Added Data: ", data);
            this.myData = data.data(); this.myDbId = data.id; console.log("New Loaded : ", this.myData, this.myDbId)
          })
        }
      }).catch((error) => { console.log("DB Update error : ", error); this.myDbId = ''; this.updateUserDocument() })
  
    //addedDocument.then((data:any) => {
    //  console.log("updateUserHistory : ", data);
    //  if (data) {
    //    this.myData = data.docs[0].data(); this.myDbId = data.docs[0].id;
    //  }
    //})
  }

  setBellCounter() {

    this.myData['bellCounter'] = ('bellCounter' in this.myData) ? ++this.myData['bellCounter'] : 1;
    this.updateUserDocument();
  }

  updateUserActivity(activity: number, searchString?: String) {
    let activityMapper = { 1: "Search", 2: "Chapters", 3: "Word List", 4: "Word Cloud" };
    let activityData = {
      activity: activityMapper[activity],
      time: new Date(),
      searchString: searchString ? searchString : ''
    };

    if ('activityList' in this.myData) {
      this.myData['activityList'].push(activityData);
    } else {
      this.myData['activityList'] = [activityData]

    }

    this.updateUserDocument();
  }

  setUserDetails(userDetails: any) {
    this.myData['emailId'] = userDetails.email;
    this.myData['name'] = userDetails.name;
    this.getUserHistory();
    //this.updateUserDocument(); //cause 2 entries as getUserHistory is not completed
  }
  updateUserDetailsInFeedback(userFeedback: any) {
    userFeedback['time']=new Date();
    ('feedBack' in this.myData) ? this.myData['feedBack'].push(userFeedback) : this.myData['feedBack'] = [userFeedback];
    this.updateUserDocument();

    userFeedback['loginIdDetails'] = {
      name: this.myData.name, emailId: this.myData.emailId
    };
    return userFeedback;
  }
}

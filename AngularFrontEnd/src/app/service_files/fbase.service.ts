import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { error } from 'console';


@Injectable({
  providedIn: 'root'
})
export class FbaseService {
  gCounter: any;
  imageList: any[] = [];
  constructor(public db: AngularFirestore, private storage: AngularFireStorage) {
     this.gCounter = db.collection('Counter').doc('count').valueChanges();

    console.log("fbase:gCounter : ", this.gCounter);

    this.storage.ref('/Counts/').listAll().subscribe((data) => { data.items.forEach(x => this.imageList.push( x.getDownloadURL())) })
    console.log("imageList : ", this.imageList);
  }


  getIpDetails(ipv4:String) {

    let userDetailsRef = this.db.collection('UserDetails');
    return userDetailsRef.ref.where('IPv4','==',ipv4).get()
    

  }
  updateIpDetails(docId: string, document: any) {

    console.log("updateIpDetails : ", docId, document)
    if (docId == '') {
      return this.db.collection('UserDetails').add(document);
    }

    return this.db.collection('UserDetails').doc(docId).update(document)
        

  }

  getImageList() {
    return this.imageList;
  }

  getCounter() {
    console.log("returning : ", this.gCounter);

    return this.gCounter;
  }
  setCounter(countValue: number) {
    console.log("Setting new value : ", countValue);
    //let counter:number = 0;
    //this.gCounter.subscribe((data) => { counter = data.count; console.log("Data at buttong :", data,++counter); });
    this.db.collection('Counter').doc('count').update({ count: countValue });
  }

  addFeedbackDB(userFeedabck: any) {
    this.db.collection('Feedback').add(userFeedabck).then((doc) => {console.log("Added Feedback : ", doc) })
  }
}

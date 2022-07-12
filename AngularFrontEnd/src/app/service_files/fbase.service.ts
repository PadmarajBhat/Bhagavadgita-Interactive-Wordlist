import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { count } from 'console';

@Injectable({
  providedIn: 'root'
})
export class FbaseService {
  gCounter: any;
  constructor(public db: AngularFirestore) {
    //this.gCounter = db.collection('Counter').doc('count').get().subscribe({

    //  next(x) {
    //    let counter;
    //    console.log("Copying counter value :", x.data());
    //    counter = x.data()
    //    //this.gCounter = counter.count;

    //    console.log("Counter Value read : ", counter);


    //  }

    //});

    this.gCounter = db.collection('Counter').doc('count').get();

    console.log("fbase:gCounter : ", this.gCounter);
  }

  getCounter() {
    console.log("returning : ", this.gCounter);

    return this.gCounter;
  }
  setCounter(countValue: number) {
    console.log("Setting new value : ", countValue);
    this.db.collection('Counter').doc('count').update({count:countValue});
  }
}

import { Injectable } from '@angular/core';
import {AngularFireDatabaseModule,AngularFireList,AngularFireDatabase} from '@angular/fire/database';
import {AngularFirestoreModule} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private af:AngularFireDatabase) { }

  jobList:AngularFireList<any>;
  userKey;

  
  getJobs(){
    // this.jobList=this.af.list('Jobs/d9HYSJHLtjQr5f1WZz6bOZbErSQ2');
    // debugger;
    this.userKey=localStorage.getItem("UID");
    // this.jobList=this.af.list('Jobs/'+userKey);
    this.jobList=this.af.list('Jobs/');

    // return this.jobList.snapshotChanges();
    return this.jobList.snapshotChanges();
    
    }
}

import { Injectable } from '@angular/core';
import {AngularFireDatabaseModule,AngularFireList,AngularFireDatabase} from '@angular/fire/database';
import {AngularFirestoreModule} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private af:AngularFireDatabase) { }

  jobList:AngularFireList<any>;


  
  getJobs(){
    // this.jobList=this.af.list('Jobs/d9HYSJHLtjQr5f1WZz6bOZbErSQ2');
    this.jobList=this.af.list('Jobs/4dlKL56ZItOrV1qxkDNHTuZXGy12');
    return this.jobList.snapshotChanges();
    
    }
}

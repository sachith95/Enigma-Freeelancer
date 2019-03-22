import { Injectable,OnInit } from '@angular/core';
import {AngularFireDatabaseModule,AngularFireList,AngularFireDatabase} from '@angular/fire/database';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorage,AngularFireUploadTask} from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class JobCreationService {

  constructor(private af:AngularFireDatabase,private afStorage: AngularFireStorage) { }
  jobGroups: any;
  jobGroupList:AngularFireList<any>;
  jobList:AngularFireList<any>;
  ref;
  task: AngularFireUploadTask;

  ngOnInit(){
   
  }

  upload(file) {
    debugger;
    


  const randomId = Math.random().toString(36).substring(2);

  this.ref = this.afStorage.ref(randomId);

  this.task = this.afStorage.upload('/images/userImages/4dlKL56ZI...NHTuZXGy18/'+randomId,file );  
  }
  getJobGroups(){
    return this.af.list('Group').snapshotChanges();  
    }

  getJobCategories(jobGroupId){
      return this.af.list('Category/'+jobGroupId+'/').snapshotChanges();  
    }

  getJobs(){
      // this.jobList=this.af.list('Jobs/d9HYSJHLtjQr5f1WZz6bOZbErSQ2');
      this.jobList=this.af.list('Jobs/4dlKL56ZItOrV1qxkDNHTuZXGy12');

      
      return this.jobList.snapshotChanges();
      
      }
  postJob(Job){
debugger;
    var currentDate = new Date();
    var timestamp = currentDate.getTime();
    var keyVal='job_'+timestamp;
    // this.jobList.push({

    //   group:Job.JobGroupID,
    //   category:Job.JobCategoryID,
    //   postedDate:timestamp,
    //   dueDate:Job.DueDate,
    //   timeStamp:timestamp,
    //   title:Job.JobTitle,
    //   charge:Job.Charge,
    //   description:Job.Description
    // });


    this.af.object('Jobs/4dlKL56ZItOrV1qxkDNHTuZXGy12/'+keyVal).update({
      
      //$key:keyVal,
      group:Job.JobGroupID,
      category:Job.JobCategoryID,
      postedDate:timestamp,
      dueDate:Job.DueDate,
      timeStamp:timestamp,
      title:Job.JobTitle,
      charge:Job.Charge,
      description:Job.Description
    })
    }
}
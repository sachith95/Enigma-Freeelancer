import { Injectable,OnInit } from '@angular/core';
import {AngularFireDatabaseModule,AngularFireList,AngularFireDatabase} from '@angular/fire/database';
import {AngularFirestoreModule} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class JobCreationService {

  constructor(private af:AngularFireDatabase) { }
  jobGroups: any;
  jobGroupList:AngularFireList<any>;
  jobList:AngularFireList<any>;


  ngOnInit(){
   
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
    this.jobList.push({

      group:Job.JobGroupID,
      category:Job.JobCategoryID,
      postedDate:timestamp,
      dueDate:Job.DueDate,
      timeStamp:timestamp,
      title:Job.JobTitle,
      charge:Job.Charge,
      description:Job.Description

      // group:'1',
      // category:'1',
      // postedDate:'2019-02-16',
      // dueDate:'2019-02-19',
      // timeStamp:'sdssdsd',
      // title:'dsdsdssdsdsdsd',
      // charge:'2055'
    });
    
    }
}
import { Injectable,OnInit } from '@angular/core';
import {AngularFireDatabaseModule,AngularFireList,AngularFireDatabase} from '@angular/fire/database';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorage,AngularFireUploadTask} from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobCreationService {

  constructor(private af:AngularFireDatabase,private afStorage: AngularFireStorage) { }
  jobGroups: any;
  jobGroupList:AngularFireList<any>;
  jobList:AngularFireList<any>;
  ref;
  userKey;
  task:AngularFireUploadTask

  ngOnInit(){
    
  //  this.userKey="4dlKL56ZItOrV1qxkDNHTuZXGy12";
  this.userKey=localStorage.getItem("UID");
  }

  upload(file) {
    var downloadURL
    
    var path='images/userImages/';
    var timeStamp = new Date().getTime();
    if(file!=undefined)
    {
        const randomId = Math.random().toString(36).substring(2);
        var fullPath=path+'/'+this.userKey+'/';
        const ref = this.afStorage.ref(fullPath).child(timeStamp.toString());  
        ref.put(file).then(function(snapshot){
          snapshot.ref.getDownloadURL().then(function(url){
            URL=url;
            return URL;
          });
        }).catch((error) =>{
          console.log("Error","There was an error!!! " + error);
        });
   

        
        
  
    }

  }
  getJobGroups(){
    return this.af.list('Group').snapshotChanges();  
    }

  getJobCategories(jobGroupId){
      return this.af.list('Category/'+jobGroupId+'/').snapshotChanges();  
    }

  getJobs(){
      // this.jobList=this.af.list('Jobs/d9HYSJHLtjQr5f1WZz6bOZbErSQ2');
      this.jobList=this.af.list('Jobs/'+this.userKey);

      
      return this.jobList.snapshotChanges();
      
      }
  postJob(Job){
    var rtVal=true;
    this.userKey=localStorage.getItem("UID");
    if(this.userKey!=undefined)
    {
        debugger;
        var currentDate = new Date();
        var timestamp = currentDate.getTime();
        var keyVal='job_'+timestamp;
        this.af.object('Jobs/'+this.userKey+'/'+keyVal).update({
          
          //$key:keyVal,
          group:Job.JobGroupID,
          category:Job.JobCategoryID,
          postedDate:timestamp,
          dueDate:Job.DueDate,
          timeStamp:timestamp,
          title:Job.JobTitle,
          charge:Job.Charge,
          description:Job.Description,
          postPic:Job.ImgLink
        }).catch((error) =>{
          rtVal= false;
        });

    }else{
      rtVal=false
    }
    return rtVal;
  }
}
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { JobCreationService  } from '../../services/job-creation/job-creation.service';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {MatDatepickerModule} from '@angular/material'
import {JobCreation} from '../../Intefafaces/jobCreation/job-creation';
import {AngularFireStorage,AngularFireUploadTask} from '@angular/fire/storage';
declare var $: any;
@Component({
  selector: 'app-job-creation',
  templateUrl: './job-creation.component.html',
  styleUrls: ['./job-creation.component.scss']
})
export class JobCreationComponent implements OnInit {

  model;
  jobGroups: any;
  jobCategories: any;
  selectedJobGroup:any;
  jobList:JobCreation[];
  jobCats = {
    categoryID: "",
    categoryName: "",
    categoryPic: ""
  }
  jobCatsList=[];
  imgSrc;
  userKey;

  constructor(private service:JobCreationService,private afStorage: AngularFireStorage) { }
  JobDetailForm = new FormGroup({
    createdUserName: new FormControl(),
    JobGroupID: new FormControl('-1', Validators.required),
    JobCategoryID: new FormControl('-1', Validators.required),
    CategoryName: new FormControl('', Validators.required),
    DueDate: new FormControl('', Validators.required),
    JobTitle: new FormControl('', Validators.required),
    Charge: new FormControl('', Validators.required),
    Description: new FormControl('', Validators.required),
    Img: new FormControl('', Validators.required),
    ImgLink: new FormControl('', Validators.required),
  });

  ngOnInit() {
    // this.userKey="izDGwZoiYUVSzksEsYFZkNepsc33";

    this.userKey=localStorage.getItem("UID");
    this.getJobGroups();
    this.service.getJobs();
  }

 choseFile($event){
   
   if ($event.target.files && $event.target.files[0]) {
    const file = $event.target.files[0];

    const reader = new FileReader();
    reader.onload = e => this.imgSrc = reader.result;

    reader.readAsDataURL(file);
    this.JobDetailForm.controls['Img'].setValue($event.target.files[0]);
    this.upload();
    
    }
 }
 upload() {
  debugger
  var path='images/userImages/';
  var timeStamp = new Date().getTime();
  var file=this.JobDetailForm.controls['Img'].value;
  if(file!=undefined)
  {
      const randomId = Math.random().toString(36).substring(2);
      var fullPath=path+'/'+this.userKey+'/';
      const ref = this.afStorage.ref(fullPath).child(timeStamp.toString());  
      ref.put(file).then(function(snapshot){
        snapshot.ref.getDownloadURL().then(function(url){
          // debugger
          localStorage.setItem("jobImg",url);
        });
      }).catch((error) =>{
        console.log("Error","There was an error!!! " + error);
      });

  }

  // var url
  // url=this.service.upload(file);

     
    
 

}
  getJobGroups(){
    this.service.getJobGroups().subscribe(
      res=>{
        this.jobGroups= res.map(
          res=>{
            return{
              ...res.payload.val()
            }
          }
        )
      }
    )
  }

  getJobList(groupId){
    this.jobList
  }
  SelectedCat(categoryName){
    var val=event.target['options'][event.target['options'].selectedIndex].text;
    this.JobDetailForm.controls['CategoryName'].setValue(val);
  }

  getJobCategories(groupId){

    // this.service.getJobCategories(groupId).subscribe(
    //   res=>{
    //     this.jobCategories= res.map(
    //       res=>{
    //         return{
    //           ...res.payload.val()
    //         }
    //       }
    //     )
    //   }
    // )


    this.jobCatsList=[];
    this.service.getJobCategories(groupId).subscribe(
      res => {
        res.map((data) => {

          this.jobCats = {
            categoryID: "",
            categoryName: "",
            categoryPic: ""
          }
          this.jobCats.categoryID = data.payload.child("categoryID").val();
          this.jobCats.categoryName = data.payload.child("categoryName").val();
          this.jobCats.categoryPic = data.payload.child("categoryPic").val();  
          this.jobCatsList.push(this.jobCats);
         
        }
        )
        console.log(this.jobCatsList);      
      }
      
    )
  }


  public getSelectedGroup(): void {

    this.selectedJobGroup = this.JobDetailForm.controls['JobGroupID'].value;
    this.jobCategories={};
    if(this.selectedJobGroup!=-'1')
    {
      this.getJobCategories(this.selectedJobGroup);
    }
    this.JobDetailForm.controls['JobCategoryID'].setValue(-1);
   
  }

  public postJob(): void {
    this.upload();
  
  }
  
  public postJobs(): void {
    this.JobDetailForm.controls['ImgLink'].setValue(localStorage.getItem("jobImg"));
    if(this.service.postJob(this.JobDetailForm.value)!=false){
      this.clearFields();
    }
  }
  public clearFields(){
    this.JobDetailForm.controls['JobGroupID'].setValue(-1);
    this.JobDetailForm.controls['JobCategoryID'].setValue(-1);
    this.JobDetailForm.controls['CategoryName'].setValue('');
    this.JobDetailForm.controls['DueDate'].setValue('');
    this.JobDetailForm.controls['JobTitle'].setValue('');
    this.JobDetailForm.controls['Charge'].setValue('');
    this.JobDetailForm.controls['Description'].setValue('');
    this.JobDetailForm.controls['Img'].setValue('');
    this.JobDetailForm.controls['ImgLink'].setValue('');
    this.imgSrc="";
  }

}

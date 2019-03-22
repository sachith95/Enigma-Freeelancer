import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home/home.service';

import { JobCreation } from '../../Intefafaces/jobCreation/job-creation';
import { Action } from 'rxjs/internal/scheduler/Action';
import { DatabaseSnapshot } from '@angular/fire/database';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { JobCreationService } from '../../services/job-creation/job-creation.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tileGroupes: any[];
  jobList: JobCreation[];
  newJobList = [];
  newJob = {
    JobGroupID: "",
    JobCategoryID: "",
    DueDate: "",
    JobTitle: "",
    Charge: "",
    Description: "",
  }
  fireJobList = [];
  jobList1 = [];
  constructor(private service: HomeService, private JobCreationService: JobCreationService) {

  }
  JobDetailForm = new FormGroup({
    createdUserName: new FormControl(),
    JobGroupID: new FormControl('-1', Validators.required),
    JobCategoryID: new FormControl('-1', Validators.required),
    DueDate: new FormControl('', Validators.required),
    JobTitle: new FormControl('', Validators.required),
    Charge: new FormControl('', Validators.required),
    Description: new FormControl('', Validators.required),

  });

  jobGroups: any;
  jobCategories: any;
  jobCats = {
    categoryID: "",
    categoryName: "",
    categoryPic: ""
  }
  jobCatsList=[];
  selectedJobGroup: any;
  selectedJobCategory: any;
  ngOnInit() {
    this.getJobLists(-1, -1);
    this.getJobGroups();
    this.JobCreationService.getJobs();
  }

  getJobGroups() {
    // debugger
    // this.jobGroups.push("Select a Category")
    this.JobCreationService.getJobGroups().subscribe(
      res => {
        this.jobGroups = res.map(
          res => {
            return {
              ...res.payload.val()
            }
          }
        )
      }
    )
  }




  getJobCategories(groupId) {
    // debugger;
    // this.JobCreationService.getJobCategories(groupId).subscribe(
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
    this.JobCreationService.getJobCategories(groupId).subscribe(
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
  public selectedGroup(): void {
    // debugger;
    this.selectedJobGroup = this.JobDetailForm.controls['JobGroupID'].value;
   
    this.jobCategories = [];
    if (this.selectedJobGroup != -'1') {
      this.getJobCategories(this.selectedJobGroup);
    }
    this.JobDetailForm.controls['JobCategoryID'].setValue(-1);
    this.selectedJobCategory = this.JobDetailForm.controls['JobCategoryID'].value;
    this.getJobLists(this.selectedJobGroup, this.selectedJobCategory)
  }
  public selectedCategory(): void {
    // debugger;
    this.selectedJobGroup = this.JobDetailForm.controls['JobGroupID'].value;
    this.selectedJobCategory = this.JobDetailForm.controls['JobCategoryID'].value;
    this.jobCategories = [];
    this.getJobLists(this.selectedJobGroup, this.selectedJobCategory)
    
  }
  getJobLists(grpId, catId) {

     //debugger
    // this.service.getJobs().subscribe(
    //   res=>{
    //     this.tileGroupes= res.map(
    //       res=>{
    //         return{
    //           ...res.payload.val()
    //         }
    //       }
    //     )
    //   }
    // )
    // this.newJobList=null;
    this.newJobList=[];

    if(grpId==-1)
    {
      this.service.getJobs().subscribe(
        datajoblist => {
  
          // console.log(datajoblist);
          datajoblist.map((jobs) => {
            if (jobs.payload.hasChildren) {
  
              this.jobList = jobs.payload.val()
              jobs.payload.forEach((job) => {
               
                    this.newJob = {
                      JobGroupID: "",
                      JobCategoryID: "",
                      DueDate: "",
                      JobTitle: "",
                      Charge: "",
                      Description: "",
                    }
                    this.newJob.JobTitle = job.child("title").val();
                    this.newJob.JobGroupID = job.child("group").val();
                    this.newJob.JobCategoryID = job.child("category").val();
                    this.newJob.Charge = job.child("charge").val();
                    this.newJob.Description = job.child("description").val();
                    this.newJob.DueDate = job.child("duedate").val();
                    this.newJobList.push(this.newJob)
                return false;
              })
             
  
            }
          }
          )
        }
      )

    }
    else if(catId==-1)
    {
      this.service.getJobs().subscribe(
        datajoblist => {
  
          // console.log(datajoblist);
          datajoblist.map((jobs) => {
            if (jobs.payload.hasChildren) {
  
              this.jobList = jobs.payload.val()
              jobs.payload.forEach((job) => {
               
               
                  if (job.child("group").val() == grpId ) {
                    this.newJob = {
                      JobGroupID: "",
                      JobCategoryID: "",
                      DueDate: "",
                      JobTitle: "",
                      Charge: "",
                      Description: "",
                    }
                    this.newJob.JobTitle = job.child("title").val();
                    this.newJob.JobGroupID = job.child("group").val();
                    this.newJob.JobCategoryID = job.child("category").val();
                    this.newJob.Charge = job.child("charge").val();
                    this.newJob.Description = job.child("description").val();
                    this.newJob.DueDate = job.child("duedate").val();
                    this.newJobList.push(this.newJob)
                  }
                return false;
              })
              
  
            }
          }
          )
        }
      )
    }
    else
    {
      this.service.getJobs().subscribe(
        datajoblist => {
  
          // console.log(datajoblist);
          datajoblist.map((jobs) => {
            if (jobs.payload.hasChildren) {
  
              this.jobList = jobs.payload.val()
              jobs.payload.forEach((job) => {
               
               
                  if (job.child("group").val() == grpId && job.child("category").val() == catId) {
                    this.newJob = {
                      JobGroupID: "",
                      JobCategoryID: "",
                      DueDate: "",
                      JobTitle: "",
                      Charge: "",
                      Description: "",
                    }
                    this.newJob.JobTitle = job.child("title").val();
                    this.newJob.JobGroupID = job.child("group").val();
                    this.newJob.JobCategoryID = job.child("category").val();
                    this.newJob.Charge = job.child("charge").val();
                    this.newJob.Description = job.child("description").val();
                    this.newJob.DueDate = job.child("duedate").val();
                    this.newJobList.push(this.newJob)
                  }
                return false;
              })
             
  
            }
          }
          )
        }
      )
    }
   



  }

}

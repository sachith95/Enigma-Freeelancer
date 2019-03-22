import { Component, OnInit } from '@angular/core';
import { MyGigsService } from '../../services/my-gigs/my-gigs.service';

import { JobCreation } from '../../Intefafaces/jobCreation/job-creation';
import { Action } from 'rxjs/internal/scheduler/Action';
import { DatabaseSnapshot } from '@angular/fire/database';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { JobCreationService } from '../../services/job-creation/job-creation.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-my-gigs',
  templateUrl: './my-gigs.component.html',
  styleUrls: ['./my-gigs.component.scss']
})
export class MyGigsComponent implements OnInit {
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
    postPic: "",
    categoryName: "",
  }
  fireJobList = [];
  jobList1 = [];
  constructor(private service: MyGigsService) { }
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
    this.getJobLists();
  }

   
  getJobLists() {

    debugger
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


      this.service.getJobs().subscribe(
        datajoblist => {
  
          // console.log(datajoblist);
          datajoblist.map((jobs) => {
            if (jobs.payload.hasChildren) {
  
              this.jobList = jobs.payload.val()
              
               
                    this.newJob = {
                      JobGroupID: "",
                      JobCategoryID: "",
                      DueDate: "",
                      JobTitle: "",
                      Charge: "",
                      Description: "",
                      postPic: "",
                      categoryName: "",
                    }
                    this.newJob.JobTitle = jobs.payload.child("title").val();
                    this.newJob.JobGroupID = jobs.payload.child("group").val();
                    this.newJob.JobCategoryID = jobs.payload.child("category").val();
                    this.newJob.Charge = jobs.payload.child("charge").val();
                    this.newJob.Description = jobs.payload.child("description").val();
                    this.newJob.DueDate = jobs.payload.child("duedate").val();
                    this.newJob.postPic = jobs.payload.child("postPic").val();
                    this.newJob.categoryName = jobs.payload.child("categoryName").val();
                    this.newJobList.push(this.newJob)
            }
          }
          )
        }
      )
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { JobCreationService  } from '../../services/job-creation/job-creation.service';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {MatDatepickerModule} from '@angular/material/datepicker'
declare var $: any;
@Component({
  selector: 'app-job-creation',
  templateUrl: './job-creation.component.html',
  styleUrls: ['./job-creation.component.scss']
})
export class JobCreationComponent implements OnInit {




  constructor(private service:JobCreationService) { }
  JobDetailForm = new FormGroup({
    createdUserName: new FormControl(),
    JobGroupID: new FormControl('', Validators.required),
    JobCategoryID: new FormControl('', Validators.required),
    DueDate: new FormControl('', Validators.required),
    JobTitle: new FormControl('', Validators.required),
    Charge: new FormControl('', Validators.required),
    Description: new FormControl('', Validators.required),

  });

  jobGroups: any;
  jobCategories: any;
  selectedJobGroup:any;
  ngOnInit() {
  
    this.getJobGroups();
    this.service.getJobs();
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
  
  getJobCategories(groupId){

    this.service.getJobCategories(groupId).subscribe(
      res=>{
        this.jobCategories= res.map(
          res=>{
            return{
              ...res.payload.val()
            }
          }
        )
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
   
  }

  public postJob(): void {
    
    this.service.postJob(this.JobDetailForm.value);
  }
}

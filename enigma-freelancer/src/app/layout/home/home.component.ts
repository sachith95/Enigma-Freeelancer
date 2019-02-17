import { Component, OnInit } from '@angular/core';
import { HomeService  } from '../../services/home/home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tileGroupes: any[];
  constructor(private service:HomeService) { 
    
  }

  ngOnInit() {
    this.getJobGroups();
  }

  getJobGroups(){

    this.service.getJobs().subscribe(
      res=>{
        this.tileGroupes= res.map(
          res=>{
            return{
              ...res.payload.val()
            }
          }
        )
      }
    )
  }

}

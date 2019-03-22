import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import {  ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  id: string;
  name:string;
  email: any;
  address: any;
  occupation: any;
  aboutMe: any;
  country: any;
  ContactNo: any;
  birthday: any;
  profilePicture: any;
  constructor(private firebaseService:FirebaseService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.id = params.get('userId');   

   });
    this.firebaseService.getUserData(this.id).once("value", (snapshot) => {
        
     this.name = snapshot.val().name; 
     this.email= snapshot.val().email ;
     this.address= snapshot.val().address ;
     this.occupation= snapshot.val().occupation ;
     this.aboutMe= snapshot.val().aboutMe ;
     this.country= snapshot.val().country ;
     this.ContactNo= snapshot.val().contactNo ;
     this.birthday= snapshot.val().birthday ;
     this.profilePicture = snapshot.val().profilePic; 
    console.log(this.name);
    });
  }
 


}

import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import * as firebase from 'firebase';
import { ReactiveFormsModule } from "@angular/forms";
import { AngularFireDatabase } from '@angular/fire/database';
import { UserModule } from './user.module';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userName: string;
  firstName: string;
  lastName: string;
  aboutMe: string;
  country: string;
  birthday: string;
  occupation: string;
  email: string;
  contactNo: string;
  websiteURL: string;
  profilePic: string;
  skills: string;
  editUserForm: FormGroup;
  // user:UserModule = new UserModule();
  object;
  constructor(public firebaseService: FirebaseService,
    private db: AngularFireDatabase,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) {

  }

  ngOnInit() {
    this.createForm();
    this.getuser();

  }



  getuser() {
    this.firebaseService.getUser().once("value", (snapshot) => {
      debugger
      console.log('valeu', snapshot.val());

      this.editUserForm.patchValue({ firstName: snapshot.val().firstName });
      //   //  this.user.firstName = snapshot.val().firstName;
      //     userobject={
      //    firstName : snapshot.val().firstName,
      //    lastName : snapshot.val().lastName,
      //    occupation : snapshot.val().occupation,
      //     aboutMe : snapshot.val().aboutMe,
      //     country : snapshot.val().country,
      //     birthday : snapshot.val().birthday,
      //     ContactNo : snapshot.val().ContactNo,
      //     websiteURL : snapshot.val().websiteURL};
    }, function (error) {
      debugger
      console.log("error" + error.code);
    });
  }

  getData() {
    this.firebaseService.getUser();
    //console.log(this.object+"ds");
    var firstNames;
    //  firebase.database().ref('Users/' + firebase.auth().currentUser.uid).once("value").then(function(snapshot){
    //   console.log( 'valeu',snapshot.val());

    //    firstNames = snapshot.val().firstName;
    //   //  this.lastName = snapshot.val().lastName,
    //   //  this.occupation = snapshot.val().occupation,
    //   //  this.aboutMe = snapshot.val().aboutMe,
    //   //  this.country = snapshot.val().country,
    //   //  this.birthday = snapshot.val().birthday,
    //   //  this.ContactNo = snapshot.val().ContactNo,
    //   //  this.websiteURL = snapshot.val().websiteURL
    //    console.log( 'valeudddd',firstNames);

    // },function(error){
    //   console.log("error"+error.code);
    // })
    // console.log("error"+ this.user.firstName);

    this.editUserForm.patchValue({ firstName: firstNames });
    this.editUserForm.patchValue({ LastName: "TEST" });

  }

  createForm() {
    this.editUserForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      aboutMe: new FormControl(''),
      country: new FormControl(''),
      birthday: new FormControl(''),
      occupation: new FormControl(''),
      contactNo: new FormControl(''),
      websiteURL: new FormControl(''),
      profilePic: new FormControl('test'),
      skills: new FormControl('')
    });

  }

  onFormSubmit(): void {
    console.log('Name:' + this.editUserForm.get('firstName').value);
    this.firstName = this.editUserForm.get('firstName').value;
    this.lastName = this.editUserForm.get('lastName').value;
    this.aboutMe = this.editUserForm.get('aboutMe').value;
    this.country = this.editUserForm.get('country').value;
    this.birthday = this.editUserForm.get('birthday').value;
    this.occupation = this.editUserForm.get('occupation').value;
    this.contactNo = this.editUserForm.get('contactNo').value;
    this.websiteURL = this.editUserForm.get('websiteURL').value;
    this.skills = this.editUserForm.get('skills').value;
    this.editUser();
  }

  editUser(): void {
    this.firebaseService.writeUserData(this.firstName, this.lastName, this.aboutMe, this.country, this.birthday, this.occupation, this.contactNo, this.websiteURL, this.profilePic, this.skills);
  }

  readUser(): void {

  }

}

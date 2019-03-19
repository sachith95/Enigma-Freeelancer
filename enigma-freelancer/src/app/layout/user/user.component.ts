import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import * as firebase from 'firebase';
import { ReactiveFormsModule } from "@angular/forms";
import { AngularFireDatabase } from '@angular/fire/database';
import { UserModule } from './user.module';


class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userName: string;
  name: string;
  address: string;
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
  selectedFile: ImageSnippet;
  public imagePath;
  imgURL: any;
  public message: string;
  file: File;
 
  preview(files) {
    if (files.length === 0)
      return;
     this.file= files[0];
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }
  constructor(public firebaseService: FirebaseService,
              private db: AngularFireDatabase,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    this.getuser();

  }
   processFile() {
   
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, this.file);

      this.firebaseService.uploadImage(this.selectedFile.file);
    });

    reader.readAsDataURL(this.file);
  }


  getuser() {
    this.firebaseService.getUser().once("value", (snapshot) => {
      this.editUserForm.patchValue({ name: snapshot.val().name });
      this.editUserForm.patchValue({ email: snapshot.val().email });
      this.editUserForm.patchValue({ address: snapshot.val().address });
      this.editUserForm.patchValue({ occupation: snapshot.val().occupation });
      this.editUserForm.patchValue({ aboutMe: snapshot.val().aboutMe });
      this.editUserForm.patchValue({ country: snapshot.val().country });
      this.editUserForm.patchValue({ ContactNo: snapshot.val().contactNo });
      this.editUserForm.patchValue({ birthday: snapshot.val().birthday });
    }, function (error) {
      console.log("error" + error.code);
    });
  }

  createForm() {
    this.editUserForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      address: new FormControl(''),
      aboutMe: new FormControl(''),
      country: new FormControl(''),
      birthday: new FormControl(''),
      occupation: new FormControl(''),
      contactNo: new FormControl(''),
      profilePic: new FormControl('test'),
      skills: new FormControl('')
    });

  }

  onFormSubmit(): void {
    this.name = this.editUserForm.get('name').value;
    this.email = this.editUserForm.get('email').value;
    this.address = this.editUserForm.get('address').value;
    this.aboutMe = this.editUserForm.get('aboutMe').value;
    this.country = this.editUserForm.get('country').value;
    this.birthday = this.editUserForm.get('birthday').value;
    this.occupation = this.editUserForm.get('occupation').value;
    this.contactNo = this.editUserForm.get('contactNo').value;
    this.skills = this.editUserForm.get('skills').value;
    this.editUser();
  }

  editUser(): void {
    this.firebaseService.writeUserData(this.name, this.email, this.address,this.aboutMe, this.country, this.birthday, this.occupation, this.contactNo, this.profilePic, this.skills);
  }

}

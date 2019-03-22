import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from './auth.service';
import * as firebase from 'firebase';
import { UserComponent } from '../layout/user/user.component';
import { FormGroup, FormControl } from '@angular/forms';
import { UserModule } from '../layout/user/user.module';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import * as $ from 'jquery';
import {MatSnackBar} from '@angular/material';
let timeStamp;

let picUrl = null;

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  userId: string = firebase.auth().currentUser.uid;
  constructor(public db: AngularFireDatabase, private http: Http,private snackBar: MatSnackBar ) {
    
   }
   openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  uploadImage(image: File): any {
    debugger
    const formData = new FormData();
    timeStamp = new Date().getTime();
    formData.append('image', image);
    firebase.storage().ref('images/' + 'userImages/').child(this.userId).child(timeStamp.toString()).put(image).then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {
      uploadSnapshot.ref.getDownloadURL().then((downloadURL) => {
        let updates = {};
        picUrl = downloadURL;
        updates['profilePic'] = picUrl;
        firebase.database().ref('Users/' + this.userId).update(updates), function (error) {
          if (error) {
            this.showError("Somthing went wrong", "Error");
          } else {
            this.showSuccess("Data saved successfullly!!", 'Notification');
          }
        };
        console.log(downloadURL);
      })
    })

  }

  deleteUser(userKey) {
    //  return this.db.list('Users').doc(userKey).delete();
  }

  getUser() {
    return firebase.database().ref('Users/' + this.userId);
  }
  getUserData(userkey) {
    return firebase.database().ref('Users/' + userkey);
  }
  getUserslocations() {
    return firebase.database().ref('Geolocation/');
  }

  searchUsers(searchValue) {
    // return this.db.list('Users',ref => ref.where('nameToSearch', '>=', searchValue)
    //  .where('nameToSearch', '<=', searchValue + '\uf8ff'))
    // .snapshotChanges()
  }

  searchUsersByAge(value) {
    // return this.db.list('Users',ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }


  createUser(value, avatar) {
    return this.db.list('Users').push({
      name: value.name,
      nameToSearch: value.name.toLowerCase(),
      surname: value.surname,
      age: parseInt(value.age),
      avatar: avatar
    });
  }
  writeUserType(type) {
    firebase.database().ref('Users/' + this.userId + '/type').set({
      type: type
    }, function (error) {
      if (error) {
        
      } else {
     
      }
    });
  }
  writeUserData(Name, Email, Address, aboutMe, country, birthday, occupation, ContactNo, skills, profilePic) {
    firebase.database().ref('Users/' + this.userId).set({
      name: Name,
      email: Email,
      address: Address,
      aboutMe: aboutMe,
      country: country,
      birthday: birthday,
      occupation: occupation,
      contactNo: ContactNo,
      profilePic: profilePic

    }, (error) => {
      if (error) {
        this.openSnackBar("test","tes");
      } else {
         this.openSnackBar("test","tes");
        // this.showSuccess("Data saved successfullly!!",'Notification');
      }
    });
    this.writeUserSkills(skills)
  }
  writeUserSkills(skills) {
    firebase.database().ref('Users/' + this.userId + '/skills').set({
      skills: skills
    }, (error) => {
      if (error) {
        
      } else {
       
      }
    });
  }

  writeGeoLocationData(Latitude, Longitude, name, occupation, type) {
    firebase.database().ref('Geolocation/' + this.userId).set({
      latitude: Latitude,
      longitude: Longitude,
      name: name,
      occupation: occupation,
      type: type
    }, function (error) {
      if (error) {
      
      } else {
       
      }
    });
  }
}
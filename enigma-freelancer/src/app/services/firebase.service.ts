import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from './auth.service';
import * as firebase from 'firebase';
import { UserComponent } from '../layout/user/user.component';
import { FormGroup, FormControl } from '@angular/forms';
import { UserModule } from '../layout/user/user.module';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
//import { ToastrService } from 'ngx-toastr';


let timeStamp ;

let picUrl = null;

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  userId:string =  firebase.auth().currentUser.uid ;

  constructor(public db: AngularFireDatabase,private http: Http) {}


  uploadImage(image: File): any {
    debugger
    const formData = new FormData();
    timeStamp = new Date().getTime();
    formData.append('image', image);
     firebase.storage().ref('images/' + 'userImages/').child(this.userId).child(timeStamp.toString()).put(image).then((uploadSnapshot: firebase.storage.UploadTaskSnapshot)=>{
      uploadSnapshot.ref.getDownloadURL().then((downloadURL) => {
        let updates = {}; 
        picUrl = downloadURL;
         updates['profilePic'] = picUrl;
         firebase.database().ref('Users/'+this.userId).update(updates),function(error){
          if(error){
            alert("somthing gone wrong!.");
          }else{
            alert("Data saved succesfuuly");
          }
        };
         console.log(downloadURL);
    })
     })
       
 }
 
  deleteUser(userKey){
  //  return this.db.list('Users').doc(userKey).delete();
  }

  getUser(){
   return firebase.database().ref('Users/' + this.userId);
  }
  getUserslocations(){
    return firebase.database().ref('Geolocation/');
   }

  searchUsers(searchValue){
   // return this.db.list('Users',ref => ref.where('nameToSearch', '>=', searchValue)
    //  .where('nameToSearch', '<=', searchValue + '\uf8ff'))
     // .snapshotChanges()
  }

  searchUsersByAge(value){
   // return this.db.list('Users',ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }


  createUser(value, avatar){
    return this.db.list('Users').push({
      name: value.name,
      nameToSearch: value.name.toLowerCase(),
      surname: value.surname,
      age: parseInt(value.age),
      avatar: avatar
    });
  }
  writeUserType(type) {
    firebase.database().ref('Users/' + this.userId+'/type').set({
      type:type
    },function(error){
      if(error){
        alert("somthing gone wrong!.");
      }else{
        alert("Data saved succesfuuly");
      }
    });
  }
   writeUserData(Name,Email,Address,aboutMe,country,birthday,occupation,ContactNo,skills,profilePic) {
    firebase.database().ref('Users/' + this.userId).set({
      name: Name,
      email :Email,
      address :Address,
      aboutMe:aboutMe,
      country:country,
      birthday:birthday,
      occupation:occupation,
      contactNo:ContactNo,
      profilePic:profilePic
     
    },function(error){
      if(error){
        alert("somthing gone wrong!.");
      }else{
        alert("Data saved succesfuuly");
      }
    });
    this.writeUserSkills(skills)
  }
  writeUserSkills(skills) {
    firebase.database().ref('Users/' + this.userId+'/skills').set({
      skills:skills
    },function(error){
      if(error){
        alert("somthing gone wrong!.");
      }else{
        alert("Data saved succesfuuly");
      }
    });
  }

  writeGeoLocationData(Latitude , Longitude) {
    firebase.database().ref('Geolocation/' + this.userId).set({
      latitude: Latitude,
      longitude: Longitude

    },function(error){
      if(error){
        alert("somthing gone wrong!.");
      }else{
        alert("Data saved succesfuuly");
      }
    });
  }
}
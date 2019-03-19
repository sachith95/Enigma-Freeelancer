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
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  userId:string =  firebase.auth().currentUser.uid ;

  constructor(public db: AngularFireDatabase,private http: Http) {}


  uploadImage(image: File): any {
    const formData = new FormData();
    timeStamp = new Date().getTime();
    formData.append('image', image);

    return firebase.storage().ref('images/' + 'userImages/').child(this.userId).child(timeStamp.toString()).put(image);
  }
  
  

  deleteUser(userKey){
  //  return this.db.list('Users').doc(userKey).delete();
  }

  getUser(){
   return firebase.database().ref('Users/' + this.userId);
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
   writeUserData(Name,Email,Address,aboutMe,country,birthday,occupation,ContactNo,profilePic,skills) {
    firebase.database().ref('Users/' + this.userId).set({
      name: Name,
      email :Email,
      address :Address,
      aboutMe:aboutMe,
      country:country,
      birthday:birthday,
      occupation:occupation,
      contactNo:ContactNo
     // profilePic:profilePic,
     
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
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from './auth.service';
import * as firebase from 'firebase';
import { UserComponent } from '../layout/user/user.component';
import { FormGroup, FormControl } from '@angular/forms';
import { UserModule } from '../layout/user/user.module';
//import { ToastrService } from 'ngx-toastr';

var userobject; 
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
   userId:string =  firebase.auth().currentUser.uid ;
  constructor(public db: AngularFireDatabase) {}
 // user:UserModule;

 

  updateUser(userKey, value){
   // value.nameToSearch = value.name.toLowerCase();
  ///  return this.db.list('Users').doc(userKey).set(value);
  }

  deleteUser(userKey){
  //  return this.db.list('Users').doc(userKey).delete();
  }

  getUser(){
   // this.user= new UserModule();
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
   writeUserData(firstName,lastName,aboutMe,country,birthday,occupation,ContactNo,websiteURL,profilePic,skills) {
    firebase.database().ref('Users/' + this.userId).set({
      firstName: firstName,
      lastName :lastName,
      aboutMe:aboutMe,
      country:country,
      birthday:birthday,
      occupation:occupation,
      ContactNo:ContactNo,
      websiteURL:websiteURL,
     // profilePic:profilePic,
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

import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireList, AngularFireDatabase, AngularFireObject, AngularFireAction } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserCreationService {

  constructor(private af: AngularFireDatabase) { }
  jobGroups: any;
  jobGroupList: AngularFireList<any>;
  userList: AngularFireList<any>;
  addUserList: AngularFireList<any>;
  angularObj:AngularFireObject<any>;

  ngOnInit() {

  }


  postUser(Job) {
    debugger;

    this.angularObj = this.af.object('Users/'+localStorage.getItem("UID")+'');

    this.angularObj.update({
      "email": Job.email,
      "Password": Job.password,
      "user": Job.name,
      "contactNo": Job.contactNo

    });
    
    // this.angularObj.set({
    //   "user": "uname",
    //   "Password": "pw"
    // });
    /*
    debugger;
    this.userList.({
      "user": "uname",
      "Password": "pw"
    });
    debugger;*/

  }
}
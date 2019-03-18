import { Injectable } from '@angular/core';
import { AngularFireModule, FirebaseApp } from '@angular/fire';

import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuthModule, } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

import { ValueTransformer } from '@angular/compiler/src/util';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService { 
  user: Observable<firebase.User>;
  authenticated: boolean = false
  responsce: any;
  constructor(private af: AngularFireAuth,
    private db: AngularFireDatabase, ) {
    this.af.authState.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = af.authState;
          this.authenticated = true;
        }
      }
    )
  }

  login(email, pw) {
 
    this.af.auth.signInWithEmailAndPassword(email, pw).then(value => {
      console.log('Success!', value);
      this.responsce = value;
    })
      .catch(err => {
        console.log('Error', err.mesage);
        this.responsce = err.mesage
      })

    return this.responsce;
  }

  SignUp(email, pw) {
    debugger
    this.af.auth.createUserAndRetrieveDataWithEmailAndPassword(email, pw).then(value => {
      console.log('Success!', value);
      this.responsce = value;
    })
      .catch(err => {
        console.log('Error', err.mesage);
        this.responsce = err.mesage
      })

    return this.responsce;
  }

  doRegister(email,password){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogin(email,password){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doFacebookLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.af.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }

  doGoogleLogin(){
    debugger;
    return new Promise<any>((resolve, reject) => {
      debugger;
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.af.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }


  logout() {
    this.af.auth.signOut();
  }





}

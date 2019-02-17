import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { routerTransition } from '../router.animations';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    LoginForm = new FormGroup({
        Email: new FormControl('', Validators.required),
        Password: new FormControl('', Validators.required),
      });

      loginForm: FormGroup;

      email:any;
      password:any;

    constructor(
        public AuthService:AuthService,
        private translate: TranslateService,
        public router: Router
        // ,
        // private fb: FormBuilder
        ) {
            this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
            this.translate.setDefaultLang('en');
            const browserLang = this.translate.getBrowserLang();
            this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');
    }

    errorMessage:any;
    successMessage:any;

    ngOnInit() {
        //this.createForm();
    }

    // createForm() {
    //     this.loginForm = this.fb.group({
    //       email: ['', Validators.required ],
    //       password: ['',Validators.required]
    //     });
    //   }




    tryLogin(value){
        debugger;

        //this.router.navigate(['/dashboard']);
        
        this.email = (<HTMLInputElement>document.getElementById('txtEmail')).value;
        this.password = (<HTMLInputElement>document.getElementById('txtPassword')).value;

        this.AuthService.doLogin(this.email,this.password)
        .then(res => {
            debugger;
          this.router.navigate(['/dashboard']);
        }, err => {
            debugger;
          console.log(err);
          this.errorMessage = err.message;
        })
    }


    tryRegister(value){
        
    this.AuthService.doRegister(this.email,this.password)
        .then(res => {
          console.log(res);
          this.errorMessage = "";
          this.successMessage = "Your account has been created";
        }, err => {
          console.log(err);
          this.errorMessage = err.message;
          this.successMessage = "";
        })
    }

    doRegister(value){
        return new Promise<any>((resolve, reject) => {
          firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
          .then(res => {
            resolve(res);
          }, err => reject(err))
        })
    }

    login(){
        debugger;
        var  Email = this.LoginForm.controls['Email'].value;
        var  PW = this.LoginForm.controls['Password'].value;
        this.AuthService.login(Email,PW);
    }

    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
    }

    tryFacebookLogin(){
      debugger;
      this.AuthService.doFacebookLogin()
      .then(res => {
        debugger;
        this.router.navigate(['/dashboard']);
      })
    }

    tryGoogleLogin(){
      debugger;
      this.AuthService.doGoogleLogin()
      .then(res => {
        debugger;
        this.router.navigate(['/dashboard']);
      })
    }

}



import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { TranslateService } from '@ngx-translate/core';

import { AuthService } from '../services/auth.service';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    constructor(
        private translate: TranslateService,
        public AuthService: AuthService,
        // private fb: FormBuilder,
        public router: Router
        ) {

        //this.createForm();
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');
    }

    registerForm: FormGroup;
    errorMessage: string = '';
    successMessage: string = '';

    SignUpForm = new FormGroup({
        Name: new FormControl('', Validators.required),
        Email: new FormControl('', Validators.required),
        Password: new FormControl('', Validators.required),
        RePassword: new FormControl('', Validators.required),
    
    
      });

      email:any;
      password:any;

    ngOnInit() {}

    // createForm() {
    //     this.registerForm = this.fb.group({
    //       email: ['', Validators.required ],
    //       password: ['',Validators.required]
    //     });
    //   }

    tryRegister(value){
        debugger;

        this.email = (<HTMLInputElement>document.getElementById('txtEmail')).value;
        this.password = (<HTMLInputElement>document.getElementById('txtPassword')).value;

        this.AuthService.doRegister(this.email,this.password)
        .then(res => {
            debugger;
            console.log(res);
            this.errorMessage = "";
            this.successMessage = "Your account has been created";
            this.router.navigate(['/login']);
            
        }, err => {
            debugger;
            console.log(err);
            this.errorMessage = err.message;
            this.successMessage = "";
        })
      }


}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { LoginModule } from 'src/app/login/login.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SignupRoutingModule,
    LoginModule
  ],
  declarations: [SignupComponent]
})
export class SignupModule { }

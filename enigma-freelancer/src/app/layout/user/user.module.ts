import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { PageHeaderModule } from './../../shared'  ;
import * as $ from 'jquery';
import { FirebaseService } from 'src/app/services/firebase.service';
@NgModule({
    imports: [CommonModule, UserRoutingModule, PageHeaderModule,FormsModule],
    declarations: [UserComponent]
})
export class UserModule {
  
}

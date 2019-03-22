import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import {  DashboardModule} from './dashboard/dashboard.module';
import { JobCreationComponent } from './job-creation/job-creation.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { MapViewComponent } from './map-view/map-view.component';
import { NotifierModule } from 'angular-notifier';
import { FirebaseService } from '../services/firebase.service';
import { ProfilesComponent } from './profiles/profiles.component';


@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule,
        DashboardModule,
        ReactiveFormsModule,
        FormsModule,
        NotifierModule
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent,JobCreationComponent,HomeComponent, UserComponent, MapViewComponent, ProfilesComponent]
})
export class LayoutModule {}

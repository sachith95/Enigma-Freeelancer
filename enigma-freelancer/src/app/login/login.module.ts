import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {DashboardModule} from 'src/app/layout/dashboard/dashboard.module';


@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        LoginRoutingModule,
        DashboardModule],
    declarations: [LoginComponent]
})
export class LoginModule {}

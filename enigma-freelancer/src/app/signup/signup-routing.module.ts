import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup.component';
import { LoginComponent } from 'src/app/login/login.component';
const routes: Routes = [
    {
        path: '', component: SignupComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SignupRoutingModule {
}

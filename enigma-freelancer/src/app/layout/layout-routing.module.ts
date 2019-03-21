import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../shared';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JobCreationComponent } from './job-creation/job-creation.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { MapViewComponent } from './map-view/map-view.component';


const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix'  },
            { 
                path: 'dashboard', 
                component: DashboardComponent
            },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule'},
            // { path: 'forms', loadChildren: './form/form.module#FormModule' },
            // { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            // { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            // { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },
            { path: 'map', loadChildren: './map/map.module#MapModule' },
            { path: 'Job', component: JobCreationComponent },
            { path: 'Home', component: HomeComponent },
            { path: 'User', component: UserComponent },
            { path: 'mapView', component: MapViewComponent },
            
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlankPageRoutingModule } from './blank-page-routing.module';
import { BlankPageComponent } from './blank-page.component';
import {MatCardModule,MatButtonModule} from '@angular/material';

@NgModule({
    imports: [CommonModule, BlankPageRoutingModule,  MatCardModule,MatButtonModule],
    declarations: [BlankPageComponent]
})
export class BlankPageModule {}

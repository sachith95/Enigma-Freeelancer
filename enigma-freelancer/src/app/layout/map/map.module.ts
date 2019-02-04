import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './map.component';
import { PageHeaderModule } from './../../shared'  ;
import * as $ from 'jquery';
@NgModule({
    imports: [CommonModule, MapRoutingModule, PageHeaderModule],
    declarations: [MapComponent]
})
export class MapModule {}

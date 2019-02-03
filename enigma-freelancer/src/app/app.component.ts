<<<<<<< HEAD
import {Component, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> origin/master

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
<<<<<<< HEAD
export class AppComponent {
  title = 'enigma-freelancer';
    // Set our map properties
    mapCenter = [-122.4194, 37.7749];
    basemapType = 'satellite';
    mapZoomLevel = 12;
  
    // See app.component.html
    mapLoadedEvent(status: boolean) {
      console.log('The map loaded: ' + status);
    }
    @ViewChild('sidenav') sidenav: MatSidenav;

=======
export class AppComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {
    }
>>>>>>> origin/master
}

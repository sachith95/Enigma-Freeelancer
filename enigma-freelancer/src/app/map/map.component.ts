import { Component, OnInit,  Input, Output, EventEmitter ,ViewChild, ElementRef } from '@angular/core';
import { loadModules } from 'esri-loader';
//import * as esri from 'arcgis-js-api';
import esri = __esri;

@Component({
  selector: 'app-map',
  template: `<div #mapViewNode></div>`,
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {


   //private vars
   private  _zoom = 10;
   private  _center = [0.1278, 51.5074];
   private _basemap = 'streets';

   @Input()
   set zoom(zoom: number) {
     this._zoom = zoom;
   }
 
   get zoom(): number {
     return this._zoom;
   }
 
   @Input()
   set center(center: any[]) {
     this._center = center;
   }
 
   get center(): any[] {
     return this._center;
   }
 
   @Input()
   set basemap(basemap: string) {
     this._basemap = basemap;
   }
 
   get basemap(): string {
     return this._basemap;
   }

   @Output() mapLoaded = new EventEmitter<boolean>();
  constructor() { }

   // this is needed to be able to create the MapView at the DOM element in this component
   @ViewChild('mapViewNode') private mapViewEl: ElementRef;
  ngOnInit() {
    loadModules([
      'esri/Map',
      'esri/views/MapView'
    ]).then(([EsriMap, EsriMapView])=>{

      // Set type for Map constructor properties
      const mapProperties: esri.MapProperties = {
        basemap: this._basemap
      };

      let map: esri.Map = new EsriMap(mapProperties);

       // Set type for MapView constructor properties
       const mapViewProperties: esri.MapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: this._center,
        zoom: this._zoom,
        map: map
      };

      let mapView: esri.MapView = new EsriMapView(mapViewProperties);

      mapView.when(() => {
        // All the resources in the MapView and the map have loaded. Now execute additional processes
        this.mapLoaded.emit(true);
      }, err => {
        console.error(err);
      });
    })
    .catch(err => {
      console.error(err);

    });

  }

}

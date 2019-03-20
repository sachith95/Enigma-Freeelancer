import { Component, OnInit,  Input, Output, EventEmitter , ViewChild, ElementRef } from '@angular/core';
import { loadModules } from 'esri-loader';
import { routerTransition } from './../../router.animations';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ActivatedRoute } from '@angular/router';
import esri = __esri;
import { Form, FormGroup, FormControl } from '@angular/forms';
declare var $: any;

let latitude= 0.0;
let longitude =0.0;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  animations: [routerTransition()]
})


export class MapComponent implements OnInit {
  name: string;
  job: string;
  UserForm: FormGroup;
   constructor(public firebaseService: FirebaseService,private route: ActivatedRoute) { }

    private id:number;
    private sub:any;
  selectedType: Number = 0;
  userId;
  jobType;
  empoyeer;
  employee;
  zip;

   @Output() 
   mapLoaded = new EventEmitter<boolean>();

   // this is needed to be able to create the MapView at the DOM element in this component
   @ViewChild('mapViewNode') private mapViewEl: ElementRef;
  setSelectedType(event) {
    this.selectedType = event.target.value;
    console.log('select type', this.selectedType);
  }
  search ()  {

    if ( this.zip.match(/\d{5}/) === null ){
      alert('please enter a five-digit zip');
      return;
    }
    //map.centerAt(new Point(-118.15, 33.80, new SpatialReference({wkid: 4326})));

  }
  saveMapPosition(){
    this.firebaseService.writeGeoLocationData(latitude , longitude);

  }
   public AddFeature(x: Number, y: Number) {
    const  url = 'https://services9.arcgis.com/8DxVBkEZX2pin6L9/arcgis/rest/services/enigmafreelancer/FeatureServer/0/addFeatures';
    if (this.selectedType = 1) {
      this.empoyeer = false;
      this.employee = true;
    } else if (this.selectedType = 2) {
      this.empoyeer = true;
      this.employee = false;
    }
    const feature = {
      'geometry': { 'x': x, 'y': y},
      'attributes': {
        'userid': this.userId,
        'jobtype': this.jobType,
        'employeer': this.empoyeer,
        'employee': this.employee
      },
      'spatialReference': {
        'wkid': '4326'
      }
    };
    $.post(url, {
      features: JSON.stringify([feature]),
      f: 'json'
    })
      .done(function (results: any) {
        console.log(results);
      })
      .fail(function (error: any) {
        console.log(error);
      });
  }
  createForm() {
    this.UserForm = new FormGroup({
      name: new FormControl(''),  
      occupation: new FormControl('')
    });

  }
    ngOnInit() {
      this.createForm();
      this.route.queryParamMap.subscribe(params => {
        this.id = +params.get('id'); // (+) converts string 'id' to a number
        this.name = params.get('name');
        this.job = params.get('job');
      
        console.log( this.job);
       
        // In a real app: dispatch action to load the details here.
     });

     this.UserForm.patchValue({ name:this.name });
     this.UserForm.patchValue({ occupation:this.job });
    loadModules([
      'esri/Map',
      'esri/views/MapView', 'esri/widgets/Search',
      'esri/layers/FeatureLayer',
      'esri/Graphic',
      'esri/layers/GraphicsLayer',
      'esri/widgets/Expand',
      'esri/widgets/FeatureForm',
      'esri/widgets/FeatureTemplates',
      'esri/PopupTemplate',
      'esri/widgets/Locate',
      'esri/core/watchUtils',
      'esri/request',
      'esri/tasks/Locator',
      'esri/support/actions/ActionButton',
     'esri/widgets/BasemapGallery',
     'esri/widgets/Legend',
     'esri/symbols/PictureMarkerSymbol'
    ]).then(([EsriMap, EsriMapView, Search, FeatureLayer, Graphic,GraphicsLayer, Expand,
      FeatureForm, FeatureTemplates, PopupTemplate, Locate, watchUtils, esriRequest, Locator, ActionButton, BasemapGallery, Legend,PictureMarkerSymbol]) => {
       const AddAttributeAction = new ActionButton({
        title: 'Add Position',
        id: 'add-addtribute',
        className: 'esri-icon-zoom-out-magnifying-glass',
        image: './../add.png'
       });

      const featureLayer = new FeatureLayer({
          url: 'https://services9.arcgis.com/8DxVBkEZX2pin6L9/arcgis/rest/services/enigmafreelancer/FeatureServer',
          outFields: ['*'],
          popupEnabled: true,
          id: 'incidentsLayer',
          popupTemplate: {
            title: '{userid}',
            actions: [{
              id: 'find-brewery',
              image: 'beer.png',
              title: 'Brewery Info'
            }],
            content: [{
              type: 'fields',
              fieldInfos: [{
                fieldName: 'userid'
              }, {
                fieldName: 'jobtype',
                label: 'address'
              }]
            }]
          }
        });
      
      // Set type for Map constructor properties
      const mapProperties: esri.MapProperties = {
        basemap: 'streets',
        layers : featureLayer
      };

      const map: esri.Map = new EsriMap(mapProperties);

       // Set type for MapView constructor properties
       const mapViewProperties: esri.MapViewProperties = {
        container: 'viewDiv',
        center:  [-122.4194, 37.7749],
        zoom: 12,
        map: map
      };

      const mapView: esri.MapView = new EsriMapView(mapViewProperties);


      mapView.when(() => {
        // All the resources in the MapView and the map have loaded. Now execute additional processes
        this.mapLoaded.emit(true);
        const searchWidget = new Search({
         view: mapView
        //  sceneView : mapView

      });
      const basemapWidet = new BasemapGallery({
        view: mapView
      });
      const graphicsLayer = new GraphicsLayer({id:'pointLayer'});
      map.add(graphicsLayer);
      const bgExpand = new Expand({
        view: mapView,
        content: basemapWidet,
        expandTooltip: 'change Basemap',
        expandIconClass: 'esri-icon-basemap'
     });
     const legend = new Legend({
      view: mapView,
      layerInfos: [{
        layer: featureLayer,
        title: 'Legends'
      }]
      });

      mapView.popup.autoOpenEnabled = false;
      mapView.on('click', function(event) {

        // Get the coordinates of the click on the view
        const lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
        const lon = Math.round(event.mapPoint.longitude * 1000) / 1000;
        console.log('EVENTss', event);
        mapView.popup.on('trigger-action', function(event) {
          // Execute the measureThis() function if the measure-this action is clicked
          if (event.action.id === 'add-addtribute') {
          //  AddFeature(10, 5);
          }
        });
        // Display the popup
        // Execute a reverse geocode using the clicked location
        locatorTask.locationToAddress(event.mapPoint).then(function(
          response) {
          // If an address is successfully found, show it in the popup's content
          mapView.popup.content = response.address;
        }).catch(function(error) {
          // If the promise fails and no result is found, show a generic message
          mapView.popup.content =
            'No address was found for this location';
        });
      });

      watchUtils.whenTrue(mapView, 'stationary', function() {
        // Get the new center of the view only when view is stationary.
        if (mapView.center) {
          const info = '<br> <span> the view center changed. </span> x: ' +
          mapView.center.x.toFixed(2) + ' y: ' + mapView.center.y.toFixed(2);
        }
  
        // Get the new extent of the view only when view is stationary.
        if (mapView.extent) {
          const info = '<br> <span> the view extent changed: </span>' +
            '<br> xmin:' + mapView.extent.xmin.toFixed(2) + ' xmax: ' +
            mapView.extent.xmax.toFixed(
              2) +
            '<br> ymin:' + mapView.extent.ymin.toFixed(2) + ' ymax: ' +
            mapView.extent.ymax.toFixed(
              2);
          console.log(info);
        
          var markerSymbol = {
            type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
            color: [226, 119, 40],
            outline: { // autocasts as new SimpleLineSymbol()
              color: [255, 255, 255],
              width: 2
            }
          };
 
          mapView.on("drag", function(evt) {
         //   evt.stopPropagation();
            var screenPoint = {
                x: evt.x,
                y: evt.y
            };
            var point = {
              type: "point", // autocasts as new Point()
              longitude:  mapView.center.longitude,
              latitude: mapView.center.latitude
            };
            latitude =  mapView.center.longitude;
            longitude = mapView.center.latitude;
            var pointGraphic = new Graphic({
              geometry: point,
              symbol: markerSymbol
            });
            graphicsLayer.removeAll ();
            graphicsLayer.graphics.add(pointGraphic)
            console.log(evt.action);
      
        
        });
          var symbol =  {
            type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
            url: "https://static.arcgis.com/images/Symbols/Shapes/BlackStarLargeB.png",
            width: "64px",
            height: "64px",
            xoffset: mapView.center.x,
            yoffset: mapView.center.y
          };
        }
  
      });
        const locateBtn = new Locate({
          view: mapView
        });
        locateBtn.locate().then(function(locateEvent: { coords: { latitude: Number; longitude: Number; }; Position: { coords: any; }; }) {
          console.log('EVENT', locateEvent);
          console.log('EVENTss', locateEvent.coords.latitude);
          console.log('EVENTssc', locateEvent.Position.coords);
         // AddFeature(locateEvent.coords.latitude, locateEvent.coords.longitude);
        });

      mapView.ui.add(searchWidget, {
        position: 'top-right',
        index: 0
       });
       mapView.ui.add(legend, {
        position: 'bottom-left',
        index: 0
       });
      mapView.ui.add(locateBtn, {
        position: 'top-left',
        index : 1
      });
     mapView.ui.add(bgExpand, {
       position: 'bottom-right',
       index : 1
     });

      const locatorTask = new Locator({
        url: 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer'
      });




      }, (err: any) => {
        console.error(err);
      });
    })
    .catch(err => {
      console.error(err);

    });

  }
}

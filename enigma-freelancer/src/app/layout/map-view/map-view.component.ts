import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { loadModules } from 'esri-loader';
import esri = __esri;
import * as firebase from 'firebase';

let sceneView: esri.SceneView
let mapView: esri.MapView
let map: esri.Map;
@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {

  constructor(public firebaseService:FirebaseService) { }
 occupation:string;
 name:string;
 type:string;

  
  ngOnInit() {

    loadModules([ 'esri/Map',
      'esri/views/MapView', 'esri/views/SceneView',"esri/geometry/Point", "esri/Graphic",
       'esri/layers/GraphicsLayer','esri/widgets/Search', 'esri/widgets/BasemapGallery', 'esri/widgets/Expand', 'esri/widgets/Locate', "esri/PopupTemplate",     
    ]).then(([EsriMap, EsriMapView,EsriSceneView,Point,Graphic,GraphicsLayer,Search,BasemapGallery,Expand,Locate,PopupTemplate])=>{
      var point;
      var pointGraphic;
      var occupation:string;
      var aboutME:string;
      var template;
      const mapProperties: esri.MapProperties = {
        basemap: 'streets'
      };

      map  = new EsriMap(mapProperties);
      const mapViewProperties: esri.MapViewProperties = {
        container: 'viewDiv',
        center:  [79.88484820080117, 7.169286812529219],
        zoom: 12,
        map: map
      };
 
      mapView  = new EsriSceneView(mapViewProperties);
      const basemapWidet = new BasemapGallery({
        view: mapView
      });
      const locateBtn = new Locate({
        view: mapView
      });
      
      const unit = "kilometers";
       const bgExpand = new Expand({
        view: mapView,
        content: basemapWidet,
        expandTooltip: 'change Basemap',
        expandIconClass: 'esri-icon-basemap'
       });
       const searchWidget = new Search({
        view: mapView
        });
       mapView.ui.add(searchWidget, {
        position: 'top-right',
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
       
           // Create a symbol for drawing the point
      var markerSymbol = {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        color: [226, 119, 40],
        outline: { // autocasts as new SimpleLineSymbol()
          color: [255, 255, 255],
          width: 2
        }
      };
      var markerSymbol1 = {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        color: [239, 5, 5],
        outline: { // autocasts as new SimpleLineSymbol()
          color: [255, 255, 255],
          width: 2
        }
      };
      var markerSymbol2 = {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        color: [5, 5, 239],
        outline: { // autocasts as new SimpleLineSymbol()
          color: [255, 255, 255],
          width: 2
        }
      };
  
      this.firebaseService.getUserslocations().once("value", (snapshot) => {
        console.log(snapshot);
        var allObjects = [];
        
      
     
     const graphicsLayer = new GraphicsLayer({id:'pointLayer'});
     map.add(graphicsLayer);

   
     
      
        snapshot.forEach(function(childSnapshot) {

          // key will be "ada" the first time and "alan" the second time
          var key = childSnapshot.key;
          // childData will be the actual contents of the child
          var childData = childSnapshot.val();
          console.log('key:',key);
          console.log(childData.latitude);
          console.log(childData.longitude)
           point = {
            type: "point", // autocasts as new Point()
            longitude:childData.latitude,
            latitude: childData.longitude
          };
          template = new PopupTemplate({
            title: "Hey i'm "+childData.name,
            content:"I am a"+childData.occupation
          });
         if(childData.type == "employee"){
          pointGraphic = new Graphic({
            geometry: point,
            symbol: markerSymbol,
            popupTemplate: template
          });
         }
         else if(childData.type == "employeer"){
          pointGraphic = new Graphic({
            geometry: point,
            symbol: markerSymbol1,
            popupTemplate: template
          });
         }
    else{
          pointGraphic = new Graphic({
            geometry: point,
            symbol: markerSymbol2,
            popupTemplate: template
          });
       }
          
          //allObjects.push (pointGraphic);
           graphicsLayer.add(pointGraphic);
         // mapView.graphics.add(pointGraphic);
      
      });
       map.add(graphicsLayer);
    
      });
    });

    

    }
  

}

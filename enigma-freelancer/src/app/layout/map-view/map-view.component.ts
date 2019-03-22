import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { loadModules } from 'esri-loader';
import esri = __esri;
import * as firebase from 'firebase';
import { Router } from '@angular/router';

let sceneView: esri.SceneView
let mapView: esri.MapView
let map: esri.Map;
@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {

  constructor(public firebaseService:FirebaseService, private router: Router) { }
 occupation:string;
 name:string;
 type:string;
 userid:any;

 nextPage(userId) {
  this.router.navigate(['/profile'], { queryParams: {userId:this.userid} });
}

  ngOnInit() {

    loadModules([ 'esri/Map', 'esri/widgets/Legend',
      'esri/views/MapView', 'esri/views/SceneView',"esri/geometry/Point", "esri/Graphic",'esri/layers/FeatureLayer',
       'esri/layers/GraphicsLayer','esri/widgets/Search', 'esri/widgets/BasemapGallery', 'esri/widgets/Expand', 'esri/widgets/Locate', "esri/PopupTemplate",     
    ]).then(([EsriMap,Legend, EsriMapView,EsriSceneView,Point,Graphic,FeatureLayer,GraphicsLayer,Search,BasemapGallery,Expand,Locate,PopupTemplate])=>{
      var point;
      var pointGraphic;
      var occupation:string;
      var aboutME:string;
      var template;
      const featureLayer = new FeatureLayer({
        url: 'https://services9.arcgis.com/8DxVBkEZX2pin6L9/ArcGIS/rest/services/enigmafreelancer/FeatureServer',
        
        outFields: ['*'],
        popupEnabled: true
      });
      const mapProperties: esri.MapProperties = {
        basemap: 'streets',
        layers : featureLayer
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
      const legend = new Legend({
        view: mapView,
        layerInfos: [{
          layer: featureLayer,
          title: 'Legends'
        }]
        });
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
        mapView.ui.add(legend, {
          position: 'bottom-left',
          index: 0
         });
        mapView.ui.add(bgExpand, {
        position: 'bottom-right',
        index : 1
        });
        var naviagateuser = {
          title: "View User",
          id: "view",
          class: "fas fa-user"
        };


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
  

      mapView.popup.on("trigger-action", (event)=> {
        // Execute the measureThis() function if the measure-this action is clicked
        if (event.action.id === "view") {
          this.userid = mapView.popup.selectedFeature.getAttribute('id');
          this.nextPage(this.userid);
        }
      });




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
            content:"I am a"+childData.occupation,
            actions:[naviagateuser]
          });

         if(childData.type == "employee"){
          pointGraphic = new Graphic({
            geometry: point,
            symbol: markerSymbol,
            popupTemplate: template
  
          });
         }
         else if(childData.type == "employer"){
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
       pointGraphic.setAttribute('id',key);
          //allObjects.push (pointGraphic);
           graphicsLayer.add(pointGraphic);
         // mapView.graphics.add(pointGraphic);
   //  console.log(pointGraphic.getAttribute('id'));
      });
       map.add(graphicsLayer);
       
      });
    });

    

    }
  

}

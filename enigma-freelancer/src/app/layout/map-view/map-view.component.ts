import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { loadModules } from 'esri-loader';
import esri = __esri;


let mapView: esri.MapView
let map: esri.Map;
@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {

  constructor(public firebaseService:FirebaseService) { }

  ngOnInit() {
    loadModules([ 'esri/Map',
      'esri/views/MapView',"esri/geometry/Point", "esri/Graphic",
       'esri/layers/GraphicsLayer','esri/widgets/Search', 'esri/widgets/BasemapGallery', 'esri/widgets/Expand', 'esri/widgets/Locate', "esri/PopupTemplate",     
    ]).then(([EsriMap, EsriMapView,Point,Graphic,GraphicsLayer,Search,BasemapGallery,Expand,Locate,PopupTemplate])=>{

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

      mapView  = new EsriMapView(mapViewProperties);
      const basemapWidet = new BasemapGallery({
        view: mapView
      });
      const locateBtn = new Locate({
        view: mapView
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
          console.log(childData.latitude);
          console.log(childData.longitude)
          var point = {
            type: "point", // autocasts as new Point()
            longitude:childData.latitude,
            latitude: childData.longitude
          };
          //  point = new Point ({
          //   longitude:childData.longitude,
          //   latitude: childData.latitude
          // });
          var pointGraphic = new Graphic({
            geometry: point,
            symbol: markerSymbol
          });
          //allObjects.push (pointGraphic);
           graphicsLayer.add(pointGraphic);
         // mapView.graphics.add(pointGraphic);
      
      });
       map.add(graphicsLayer);
      });
    });
    }
  

}

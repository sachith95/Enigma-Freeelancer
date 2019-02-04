import { Component, OnInit,  Input, Output, EventEmitter , ViewChild, ElementRef } from '@angular/core';
import { loadModules } from 'esri-loader';
import { routerTransition } from './../../router.animations';
import esri = __esri;
declare var $: any;


@Component({
  selector: 'app-map',
  template: `<div [@routerTransition]>
  <h1>TESTS</h1>
   <div #mapViewNode> <div id="viewDiv"
     (mapLoaded)="mapLoadedEvent($event)">
     </div>
     <div id="editArea" class="editArea-container">
    <div id="addFeatureDiv" style="display:block;">
      <h3 class="list-heading">Report Incidents</h3>
      <ul style="font-size: 13px; padding-left: 1.5em;">
        <li>Select template from the list</li>
        <li>Click on the map to create a new feature</li>
        <li>Update associated attribute data</li>
        <li>Click <i>Update Incident Info</i></li>
      </ul>
      <div id="addTemplatesDiv" style="background:#fff;"></div>
    </div>

    <div id="featureUpdateDiv" style="display:none; margin-top: 1em;">
      <h3 class="list-heading">Enter the incident information</h3>
      <div id="attributeArea">
        <div id="formDiv"></div>
        <input type="button" class="esri-button" value="Update incident info"
          id="btnUpdate">
      </div>
      <br />
      <div id="deleteArea">
        <input type="button" class="esri-button" value="Delete incident" id="btnDelete">
      </div>
    </div>

    <div id="updateInstructionDiv" style="text-align:center; display:block">
      <p class="or-wrap">
        <span class="or-text">Or</span>
      </p>
      <p id="selectHeader">Select an incident to edit or delete.</p>
    </div>
  </div>
</div>`,
  styleUrls: ['./map.component.css'],
  animations: [routerTransition()]
})
export class MapComponent implements OnInit {


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
    function AddFeature(x: Number, y: Number): void {
    const  url = 'https://services9.arcgis.com/8DxVBkEZX2pin6L9/arcgis/rest/services/enigmafreelancer/FeatureServer/addFeatures';
    //var url = "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Notes/FeatureServer/0/addFeatures";
    let feature = {
      'geometry': { 'x': 2, 'y': 52 },
      'attributes': {
        'note': 'Hello!',
        'name': 'Guus'
      },
      'spatialReference': {
        'wkid': '4326'
      }
    };
    $.post(url, {
      features: JSON.stringify([feature]),
      f: 'json'
    })
      .done(function (results) {
        console.log(results);
      })
      .fail(function (error) {
        console.log(error);
      });
  }
    loadModules([
      'esri/Map',
      'esri/views/MapView', 'esri/widgets/Search',
      'esri/layers/FeatureLayer',
      'esri/Graphic',
      'esri/widgets/Expand',
      'esri/widgets/FeatureForm',
      'esri/widgets/FeatureTemplates',
      'esri/PopupTemplate',
      'esri/widgets/Locate',
      'esri/core/watchUtils',
      'esri/request'
    ]).then(([EsriMap, EsriMapView, Search, FeatureLayer, Graphic, Expand,
      FeatureForm, FeatureTemplates, PopupTemplate, Locate, watchUtils, esriRequest]) => {

        let template = new PopupTemplate({
          title: 'Marriage in NY, Zip Code: {ZIP}',
          content: '<p>As of 2015, <b>{MARRIEDRATE}%</b> of the population in this zip code is married.</p>' +
              '<ul><li>{MARRIED_CY} people are married</li>' +
              '<li>{NEVMARR_CY} have never married</li>' +
              '<li>{DIVORCD_CY} are divorced</li></ul>',
          fieldInfos: [{
              fieldName: 'MARRIED_CY',
              format: {
                  digitSeparator: true,
                  places: 0
              }
          }, {
              fieldName: 'NEVMARR_CY',
              format: {
                  digitSeparator: true,
                  places: 0
              }
          }, {
              fieldName: 'DIVORCD_CY',
              format: {
                  digitSeparator: true,
                  places: 0
              }
          }]
      });

      const featureLayer = new FeatureLayer({
          url: 'https://services9.arcgis.com/8DxVBkEZX2pin6L9/arcgis/rest/services/enigmafreelancer/FeatureServer',
          outFields: ['*'],
          popupEnabled: true,
          id: 'incidentsLayer',
          popupTemplate: template
        });
      // Set type for Map constructor properties
      const mapProperties: esri.MapProperties = {
        basemap: this._basemap,
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
      

      let editFeature, highlight;

        let locateBtn = new Locate({
          view: mapView
        });
        locateBtn.locate().then(function(locateEvent) {
          console.log('EVENT', locateEvent.coords);
          console.log('EVENTss', locateEvent.coords.latitude);
          console.log('EVENTssc', locateEvent.Position.coords);
          AddFeature(locateEvent.coords.latitude,locateEvent.Position.coords);
        });

      mapView.ui.add(searchWidget, {
        position: 'top-left',
        index: 0
    });
    mapView.ui.add(locateBtn, {
      position: 'top-left',
      index : 1
    });
    const featureForm = new FeatureForm({
      container: 'formDiv',
      layer: featureLayer,
      fieldConfig: [
        {
          name: 'IncidentType',
          label: 'Choose incident type'
        },
        {
          name: 'IncidentDescription',
          label: 'Describe the problem'
        }
      ]
    });

    // Listen to the feature form's submit event.
    // Update feature attributes shown in the form.
    featureForm.on('submit', function() {
      if (editFeature) {
        // Grab updated attributes from the form.
        const updated = featureForm.getValues();

        // Loop through updated attributes and assign
        // the updated values to feature attributes.
        Object.keys(updated).forEach(function(name) {
          editFeature.attributes[name] = updated[name];
        });

        // Setup the applyEdits parameter with updates.
        const edits = {
          updateFeatures: [editFeature]
        };
        applyEditsToIncidents(edits);
        document.getElementById('viewDiv').style.cursor = 'auto';
      }
    });

    // Check if the user clicked on the existing feature
    selectExistingFeature();

    // The FeatureTemplates widget uses the 'addTemplatesDiv'
    // element to display feature templates from incidentsLayer
    const templates = new FeatureTemplates({
      container: 'addTemplatesDiv',
      layers: [featureLayer]
    });

    // Listen for when a template item is selected
    templates.on('select', function(evtTemplate) {

      // Access the template item's attributes from the event's
      // template prototype.
      var attributes = evtTemplate.template.prototype.attributes;
      unselectFeature();
      document.getElementById('viewDiv').style.cursor = 'crosshair';

      // With the selected template item, listen for the view's click event and create feature
      const handler = mapView.on('click', function(event) {
        // remove click event handler once user clicks on the view
        // to create a new feature
        handler.remove();
        event.stopPropagation();
        featureForm.feature = null;

        if (event.mapPoint) {
          var point = event.mapPoint.clone();
          point.z = undefined;
          point.hasZ = false;

          // Create a new feature using one of the selected
          // template items.
          editFeature = new Graphic({
            geometry: point,
            attributes: {
              'IncidentType': attributes.IncidentType
            }
          });

          // Setup the applyEdits parameter with adds.
          const edits = {
            addFeatures: [editFeature]
          };
          applyEditsToIncidents(edits);
          document.getElementById('viewDiv').style.cursor = 'auto';
        } else {
          console.error('event.mapPoint is not defined');
        }
      });
    });

    // Call FeatureLayer.applyEdits() with specified params.
    function applyEditsToIncidents(params) {
      // unselectFeature();
      featureLayer.applyEdits(params).then(function(editsResult) {
        // Get the objectId of the newly added feature.
        // Call selectFeature function to highlight the new feature.
        if (editsResult.addFeatureResults.length > 0 || editsResult.updateFeatureResults.length > 0) {
          unselectFeature();
          let objectId;
          if (editsResult.addFeatureResults.length > 0) {
            objectId = editsResult.addFeatureResults[0].objectId;
          } else {
            featureForm.feature = null;
            objectId = editsResult.updateFeatureResults[0].objectId;
          }
          selectFeature(objectId);
          if (addFeatureDiv.style.display === 'block') {
            toggleEditingDivs('none', 'block');
          }
        } else if (editsResult.deleteFeatureResults.length > 0) {
          toggleEditingDivs('block', 'none');
        }
      })
      .catch(function(error) {
          console.log('===============================================');
          console.error('[ applyEdits ] FAILURE: ', error.code, error.name,
            error.message);
          console.log('error = ', error);
        });
    }

    // Check if a user clicked on an incident feature.
    function selectExistingFeature() {
      mapView.on('click', function(event) {
        // clear previous feature selection
        unselectFeature();
        if (document.getElementById('viewDiv').style.cursor != 'crosshair') {
          mapView.hitTest(event).then(function(response) {
            // If a user clicks on an incident feature, select the feature.
            if (response.results.length === 0) {
              toggleEditingDivs('block', 'none');
            } else if (response.results[0].graphic && response.results[0].graphic.layer.id == 'incidentsLayer') {
              if (addFeatureDiv.style.display === 'block') {
                toggleEditingDivs('none', 'block');
              }
              selectFeature(response.results[0].graphic.attributes[featureLayer.objectIdField]);
            }
          });
        }
      });
    }

    // Highlights the clicked feature and display
    // the feature form with the incident's attributes.
    function selectFeature(objectId) {
      // query feature from the server
      featureLayer.queryFeatures({
        objectIds: [objectId],
        outFields: ['*'],
        returnGeometry: true
      }).then(function(results) {
        if (results.features.length > 0) {
          editFeature = results.features[0];

          // display the attributes of selected feature in the form
          featureForm.feature = editFeature;
          // highlight the feature on the view
   //       mapView.whenLayerView(editFeature.layer).then(function(layerView){
       //     highlight = layerView.highlight(editFeature);
      //   });
        }
      });
    }

    // Expand widget for the editArea div.
    const editExpand = new Expand({
      expandIconClass: 'esri-icon-edit',
      expandTooltip: 'Expand Edit',
      expanded: true,
      view: mapView,
      content: document.getElementById('editArea')
    });

    mapView.ui.add(editExpand, 'top-right');
    // input boxes for the attribute editing
    const addFeatureDiv = document.getElementById('addFeatureDiv');
    const attributeEditing = document.getElementById('featureUpdateDiv');

    // Controls visibility of addFeature or attributeEditing divs
    function toggleEditingDivs(addDiv, attributesDiv) {
      addFeatureDiv.style.display = addDiv;
      attributeEditing.style.display = attributesDiv;

      document.getElementById('updateInstructionDiv').style.display = addDiv;
    }

    // Remove the feature highlight and remove attributes
    // from the feature form.
    function unselectFeature() {
      if (highlight) {
        highlight.remove();
      }
    }

    // Update attributes of the selected feature.
    document.getElementById('btnUpdate').onclick = function() {
      // Fires feature form's submit event.
      featureForm.submit();
    }

    // Delete the selected feature. ApplyEdits is called
    // with the selected feature to be deleted.
    document.getElementById('btnDelete').onclick = function() {
      // setup the applyEdits parameter with deletes.
      const edits = {
        deleteFeatures: [editFeature]
      };
      applyEditsToIncidents(edits);
      document.getElementById('viewDiv').style.cursor = 'auto';
    }

    watchUtils.whenTrue(mapView, 'stationary', function() {
      // Get the new center of the view only when view is stationary.
      if (mapView.center) {
        var info = '<br> <span> the view center changed. </span> x: ' +
        mapView.center.x.toFixed(2) + ' y: ' + mapView.center.y.toFixed(2);
      }

      // Get the new extent of the view only when view is stationary.
      if (mapView.extent) {
        var info = '<br> <span> the view extent changed: </span>' +
          '<br> xmin:' + mapView.extent.xmin.toFixed(2) + ' xmax: ' +
          mapView.extent.xmax.toFixed(
            2) +
          '<br> ymin:' + mapView.extent.ymin.toFixed(2) + ' ymax: ' +
          mapView.extent.ymax.toFixed(
            2);
        console.log(info);
      }
    });


      }, err => {
        console.error(err);
      });
    })
    .catch(err => {
      console.error(err);

    });

  }
}

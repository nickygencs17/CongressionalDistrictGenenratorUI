import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'leaflet-providers';
import {Layer, tileLayer, geoJSON,latLng} from 'leaflet';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { StateService} from "../services/state.service";
import { StateIdService } from "../services/state-id.service";
import { Router } from '@angular/router';
import { UserService} from '../services/user.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  allDataFetched = false;
  id: string;

  lat = 0;
  lng = 0;


  layers: Layer[];
  layersControl: any;
  center: any;
  fitBounds: any;
  data: any;
  layerData: any;
  eagleState = false;
  congressional_request = false;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private location: Location,
              private state_service: StateService,
              private state_id_service: StateIdService,
              private router: Router,
              private userService: UserService) { }


  ngOnInit() {

    if(!this.userService.isLoggedIn()) {
      alert("Please login");
      this.router.navigate(['']);
    }

    this.id = this.route.snapshot.params['id'];
    this.state_id_service.state_id = this.id;
    if(this.id === 'IN' || this.id === 'AR' || this.id === 'WV'){
      this.eagleState = true;
    }

    this.state_service.getData()
      .subscribe(response => {
        this.data = response;
        this.lat = this.data.results['0'].geometry.location.lat;
        this.lng = this.data.results['0'].geometry.location.lng;
        this.center = [this.lat, this.lng];
        this.fitBounds = [[this.data.results['0'].geometry.viewport.northeast.lat, this.data.results['0'].geometry.viewport.northeast.lng],
          [this.data.results['0'].geometry.viewport.southwest.lat, this.data.results['0'].geometry.viewport.southwest.lng]];
        this.allDataFetched = true;

      });
    this.displayBoundaries('state');
  }


  displayBoundaries(type): void {

    let url = '';
    if(type === 'state') {
      this.congressional_request = false;
      url = '/assets/data/USA/' + this.id.toUpperCase() + '.geojson';
    }
    if(type === 'senate') {
      this.congressional_request = false;
      url = '/assets/data/' + this.id.toUpperCase()  + '/' + this.id.toUpperCase() + '_UPPER.geojson';
    }
    if(type === 'assembly') {
      this.congressional_request = false;
      url = '/assets/data/' + this.id.toUpperCase()  + '/' + this.id.toUpperCase() + '_LOWER.geojson'
    }
    if(type === 'precinct') {
      this.congressional_request = false;
      url = '/assets/data/' + this.id.toUpperCase()  + '/' + this.id.toUpperCase() + '_VDS.geojson'
    }
    if(type === 'congress') {
      if(this.eagleState) {
        this.congressional_request = true;
      }
      url = '/assets/data/' + this.id.toUpperCase()  + '/' + this.id.toUpperCase() + '_COMBINED_CONGRESS.geojson';
    }


    this.http.get<any>(url)
      .subscribe(geo1 => {
        let defaultBaseLayer = tileLayer.provider('OpenStreetMap.Mapnik');
        let defaultOverlay = geoJSON(geo1, {
          onEachFeature: function (feature, layer) {

            this.layerData = layer;
            let color = '';
            let val = Math.floor(Math.random() * 100) + 1;
            //TODO: change random color
            if(val%2==0){
              color = "#FF0000";
            }
            else {
              color = "#0000FF"
            }

            this.layerData.options.color = color;
            this.layerData.options.weight = 1;

            let popupContent = '';
            if (type === 'state') {
              popupContent = '<h1>name: ' + this.layerData.feature.properties.name + '</h1>';
            }
            if (type === 'senate') {
              popupContent = '<h1>name: ' + this.layerData.feature.properties.NAME + '</h1>';
            }
            if (type === 'assembly') {
              popupContent = '<h1>name: ' + this.layerData.feature.properties.NAME + '</h1>';
            }
            if (type === 'congress') {
              popupContent = '<h1>name: ' + this.layerData.feature.properties.district + '</h1>';
            }



            layer.bindPopup(popupContent);
            layer.on('mouseover', function (e) {
              this.openPopup();
            });
            layer.on('mouseout', function (e) {
              this.closePopup();
            });
          }
        });
        this.layers = [
          defaultBaseLayer,
          defaultOverlay
        ];
        this.layersControl = {
          baseLayers: {
            'OpenStreetMap Mapnik': defaultBaseLayer,
            'OpenStreetMap BlackAndWhite': tileLayer.provider('OpenStreetMap.BlackAndWhite')
          },
          overlays: {
            'Overlay One': defaultOverlay
          }
        };

      });
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'leaflet-providers';
import { geoJSON, Layer, tileLayer } from 'leaflet';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { StateService } from "../services/state.service";
import { StateIdService } from "../services/state-id.service";
import { UserService } from '../services/user.service';

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
  map = new Map();
  res_json: any;
  layers: Layer[];
  layersControl: any;
  center: any;
  fitBounds: any;
  data: any;
  layerData: any;
  eagleState = false;
  congressional_request = false;
  isLoadingResults = false;
  precinctCall = false;
  message = "Building GeoJson...";

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private location: Location,
              private state_service: StateService,
              private state_id_service: StateIdService,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    if (!this.userService.isLoggedIn()) {
      alert("Please login");
      this.router.navigate(['']);
    }
    this.id = this.route.snapshot.params['id'];
    this.state_id_service.state_id = this.id;
    if (this.id === 'IN' || this.id === 'AR' || this.id === 'WV') {
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
    this.isLoadingResults = true;
    let url = '';
    if (type === 'state') {
      this.congressional_request = false;
      url = '/assets/data/USA/' + this.id.toUpperCase() + '.geojson';
    }
    else if (type === 'senate') {
      this.congressional_request = false;
      url = '/assets/data/' + this.id.toUpperCase() + '/' + this.id.toUpperCase() + '_UPPER.geojson';
    }
    else if (type === 'assembly') {
      this.congressional_request = false;
      url = '/assets/data/' + this.id.toUpperCase() + '/' + this.id.toUpperCase() + '_LOWER.geojson';
    }
    else if (type === 'precinct') {
      this.precinctCall = true;
      this.congressional_request = true;
      url = '/assets/data/' + this.id.toUpperCase() + '/' + this.id.toUpperCase() + '_VDS.geojson';
    }
    else if (type === 'congress') {
      if (this.eagleState) {
        this.congressional_request = false;
      }
      url = '/assets/data/' + this.id.toUpperCase() + '/' + this.id.toUpperCase() + '_COMBINED_CONGRESS.geojson';
    }

    this.http.get<any>(url)
      .subscribe(geo1 => {
        let defaultBaseLayer = tileLayer.provider('OpenStreetMap.Mapnik');
        let defaultOverlay = geoJSON(geo1, {
          onEachFeature: (feature, layer) => {

            this.layerData = layer;
            this.layerData.options.weight = 0.7;

            let popupContent = '';

            if (type === 'state') {
              if (this.eagleState === true) {
                this.layerData.options.color = this.layerData.feature.properties.COLOR;
                popupContent =
                  '<p>name: ' + this.layerData.feature.properties.name + '</p>' +
                  '<p>gov: ' + this.layerData.feature.properties.REP + '</p>' +
                  '<p>number of congress districts: ' + this.layerData.feature.properties.NUMDISTRICTS + '</p>' +
                  '<p>population: ' + this.layerData.feature.properties.POP + '</p>' +
                  '<p>compactness: ' + this.layerData.feature.properties.COMPACTNESS + '</p>';
              }
              else {
                popupContent = '<h1>name: ' + this.layerData.feature.properties.name + '</h1>';
                this.layerData.options.color = 'grey';
              }
            }
            else if (type === 'senate') {
              popupContent =
                '<p>name: Senate District ' + this.layerData.feature.properties.NAME + '</p>' +
                '<p>rep: ' + this.layerData.feature.properties.REP + '</p>';
              this.layerData.options.color = this.layerData.feature.properties.COLOR;
            }
            else if (type === 'assembly') {
              popupContent =
                '<p>name: Assembly District ' + this.layerData.feature.properties.NAME + '</p>' +
                '<p>rep: ' + this.layerData.feature.properties.REP + '</p>';
              this.layerData.options.color = this.layerData.feature.properties.COLOR;
            }
            else if (type === 'congress') {
              popupContent = '<h1>name: ' + this.layerData.feature.properties.District + '</h1>'
                + '<p>compactness: ' + this.layerData.feature.properties.COMPACTNESS + '</p>'
                + '<p>population: ' + this.layerData.feature.properties.POPULATION + '</p>';

              this.layerData.options.color = this.layerData.feature.properties.COLOR;
            }
            else if (type === 'precinct') {
              popupContent =
                '<p>name: ' + this.layerData.feature.properties.NAME10 + '</p>' +
                '<p>compactness: ' + this.layerData.feature.properties.COMPACTNESS + '</p>' +
                '<p>geo_id: ' + this.layerData.feature.properties.GEOID10 + '</p>';

              if (this.map.size > 0) {
                if (this.map.has(this.layerData.feature.properties.GEOID10)) {
                  this.layerData.options.fillColor = this.map.get(this.layerData.feature.properties.GEOID10);
                  this.layerData.options.color = "black";
                  this.layerData.options.weight = 2;
                  this.layerData.options.opacity = 3;
                }
                else {
                  this.layerData.options.color = this.layerData.feature.properties.COLOR;
                }
              }
              else {
                this.layerData.options.color = this.layerData.feature.properties.COLOR;
              }

            }
            layer.bindPopup(popupContent);
            layer.on('click', function (e) {
              this.openPopup();
            });

          }
        });
        // noinspection TypeScriptValidateTypes
        this.layers = [
          defaultBaseLayer,
          defaultOverlay
        ];
        this.layersControl = {
          baseLayers: {
            'OpenStreetMap Color': defaultBaseLayer,
            'OpenStreetMap BlackAndWhite': tileLayer.provider('OpenStreetMap.BlackAndWhite')
          },
          overlays: {
            'Overlay One': defaultOverlay
          }
        };
        this.isLoadingResults = false;
      });
  }

  runAlgo(populationDeviation, ccoefficient, fcoefficient) {
    this.isLoadingResults = true;
    this.message = "Running Algorithm...";
    this.state_service.runAlgo(this.id, populationDeviation, ccoefficient, fcoefficient).subscribe((data) => {
        this.res_json = data;
        this.message = "Reading Moves...";
        for (var i = 0; i < this.res_json.entity.moves.length; i++) {
          this.map.set(this.res_json.entity.moves[i].geoId, this.res_json.entity.moves[i].colorChange);
        }
        this.message = "Building GeoJson...";
        this.displayBoundaries('precinct');
      },
      error => {
        alert('Username/Password Bad');
      });

  }

  resetMap() {
    this.map.clear();
    this.displayBoundaries('precinct');
  }

}

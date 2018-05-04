import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
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
import {forEach} from "@angular/router/src/utils/collection";
import {concat} from "rxjs/operator/concat";
import {DomSanitizer} from "@angular/platform-browser";

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
  new_layers: Layer[];
  new_layersControl: any;
  center: any;
  fitBounds: any;
  data: any;
  layerData: any;
  eagleState = false;
  congressional_request = false;
  isLoadingResults = false;
  precinctCall = false;
  message = "Building GeoJson...";
  list: string[] = [];
  showExcludedList = false;
  showRedistrict = false;
  congress = 0;
  cd_list: string[] = [];
  inState = false;
  wvState = false;
  arState = false;
  downloadJsonHref: any;


  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private location: Location,
              private state_service: StateService,
              private state_id_service: StateIdService,
              private router: Router,
              private userService: UserService,
              public zone: NgZone,
              private sanitizer: DomSanitizer) {
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
      if (this.id === 'IN') {
        this.congress = 9;
        this.inState = true;

      }
      else if(this.id === 'AR'){
        this.congress = 4;
        this.arState = true;
      }
      else if(this.id === 'WV') {
        this.congress = 3;
        this.wvState = true;
      }
    }
    for( var i = 1; i <(this.congress+1); i++){
      let cd = 'District ' + i.toString();
       this.cd_list.push(cd);
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
      this.precinctCall = false;
      this.congressional_request = false;
      this.showRedistrict = false;
      url = '/assets/data/USA/' + this.id.toUpperCase() + '.geojson';
    }
    else if (type === 'senate') {
      this.precinctCall = false;
      this.congressional_request = false;
      this.showRedistrict = false;
      url = '/assets/data/' + this.id.toUpperCase() + '/' + this.id.toUpperCase() + '_UPPER.geojson';
    }
    else if (type === 'assembly') {
      this.precinctCall = false;
      this.congressional_request = false;
      this.showRedistrict = false;
      url = '/assets/data/' + this.id.toUpperCase() + '/' + this.id.toUpperCase() + '_LOWER.geojson';
    }
    else if (type === 'precinct') {
      this.precinctCall = true;
      this.congressional_request = true;
      this.showRedistrict = false;
      url = '/assets/data/' + this.id.toUpperCase() + '/' + this.id.toUpperCase() + '_VDS.geojson';
    }
    else if (type === 'congress') {
      this.precinctCall = false;
      this.showRedistrict = false;
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
                  '<h1>Name: ' + this.layerData.feature.properties.name + '</h1>' +
                  '<p>Gov: ' + this.layerData.feature.properties.REP + '</p>' +
                  '<p>Number of congress districts: ' + this.layerData.feature.properties.NUMDISTRICTS + '</p>' +
                  '<p>Population: ' + this.layerData.feature.properties.POP + '</p>' +
                  '<p>Compactness: ' + this.layerData.feature.properties.COMPACTNESS + '</p>';
              }
              else {
                popupContent = '<h1>name: ' + this.layerData.feature.properties.name + '</h1>';
                this.layerData.options.color = 'grey';
              }
            }
            else if (type === 'senate') {
              popupContent =
                '<h1>Name: Senate District ' + this.layerData.feature.properties.NAME + '</h1>' +
                '<p>Rep: ' + this.layerData.feature.properties.REP + '</p>';
              this.layerData.options.color = this.layerData.feature.properties.COLOR;
            }
            else if (type === 'assembly') {
              popupContent =
                '<h1>Name: Assembly District ' + this.layerData.feature.properties.NAME + '</h1>' +
                '<p>Rep: ' + this.layerData.feature.properties.REP + '</p>';
              this.layerData.options.color = this.layerData.feature.properties.COLOR;
            }
            else if (type === 'congress') {
              popupContent = '<h1>Name: ' + this.layerData.feature.properties.District + '</h1>'
                + '<p>Compactness: ' + this.layerData.feature.properties.COMPACTNESS + '</p>'
                + '<p>Population: ' + this.layerData.feature.properties.POPULATION + '</p>'
                + '<p>White: ' + this.layerData.feature.properties.RACE_WHITE + '</p>'
                + '<p>Black: ' + this.layerData.feature.properties.RACE_BLACK + '</p>'
                + '<p>Hispanic: ' + this.layerData.feature.properties.RACE_HISPANIC + '</p>'
                + '<p>Asian: ' + this.layerData.feature.properties.RACE_ASIAN + '</p>'
                + '<p>Native: ' + this.layerData.feature.properties.RACE_NATIVE + '</p>'
                + '<p>Other: ' + this.layerData.feature.properties.RACE_OTHER+ '</p>';

              this.layerData.options.color = this.layerData.feature.properties.COLOR;
            }
            else if (type === 'precinct') {
                popupContent =
                  '<h1>Name: ' + this.layerData.feature.properties.NAME10 + '</h1>' +
                  '<p>Geo_ID: ' + this.layerData.feature.properties.GEOID10 + '</p>' +
                  '<p>Compactness: ' + this.layerData.feature.properties.COMPACTNESS + '</p>' +
                  '<p>Population: ' + this.layerData.feature.properties.POPULATION + '</p>' +
                  '<p>Democratic Leaning: ' + this.layerData.feature.properties.D_LEANING + '</p>' +
                  '<p>Republican Leaning: ' + this.layerData.feature.properties.R_LEANING + '</h1>' +
                  '<p>Congressional District: ' + this.layerData.feature.properties.CONGRESS_ID+ '</p>';

                this.layerData.options.color = this.layerData.feature.properties.COLOR;

              layer.on('click', () => {
                this.addToList(feature.properties.GEOID10);

              });
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

  addToList(geo_id) {

    this.zone.run(() => {
      this.showExcludedList = true;
      if(!this.list.includes(geo_id)){
        this.list.push(geo_id);
      }
      //this.displayBoundaries('precinct');
    });
  }
  removeItem(geo_id){
    console.log(geo_id);
    this.list = this.list.filter(item => item !== geo_id);
    //this.displayBoundaries('precinct');

  }


  runAlgo(populationDeviation, ccoefficient, fcoefficient) {

    let body = {
      state_id: this.id,
      population_deviation: populationDeviation,
      c_coefficient: ccoefficient,
      f_coefficient: fcoefficient,
      excluded_precinct_ids: this.list,
      included_districts_ids: this.cd_list
    }
    this.isLoadingResults = true;
    this.message = "Running Algorithm...";
    this.state_service.runAlgo(this.id,body).subscribe((data) => {
        this.res_json = data;
        console.log(this.res_json);
        this.message = "Reading Moves...";
        for (var i = 0; i < this.res_json.entity.moves.length; i++) {
          this.map.set(this.res_json.entity.moves[i].geoId, this.res_json.entity.moves[i].colorChange);
        }
        this.message = "Building GeoJson...";
        this.displayRedistrict();
      },
      error => {
        alert('Username/Password Bad');
      });

  }

  displayRedistrict(){
    console.log(this.map);
    let url  = '/assets/data/' + this.id.toUpperCase() + '/' + this.id.toUpperCase() + '_VDS.geojson';

    this.http.get<any>(url)
      .subscribe(geo1 => {
        let defaultBaseLayer = tileLayer.provider('OpenStreetMap.Mapnik');
        let defaultOverlay = geoJSON(geo1, {
          onEachFeature: (feature, layer) => {
            this.layerData = layer;
            this.layerData.options.weight = 0.7;

            if (this.map.size > 0) {
              if (this.map.has(this.layerData.feature.properties.GEOID10)) {
                this.layerData.options.fillColor = this.map.get(this.layerData.feature.properties.GEOID10);
                this.layerData.options.color = "black";
                this.layerData.options.weight = 2;
                this.layerData.options.opacity = 3;
              }
              else if(this.list.includes(this.layerData.feature.properties.GEOID10)) {
                console.log(this.list.includes(this.layerData.feature.properties.GEOID10));
                this.layerData.options.color = 'black';
                this.layerData.options.fillColor = 'black';
                this.layerData.options.weight = 2;
                this.layerData.options.opacity = 3;
              }
              else {
                this.layerData.options.color = this.layerData.feature.properties.COLOR;
              }
            } else {
              this.layerData.options.color = this.layerData.feature.properties.COLOR;
            }
            let popupContent =
              '<h1>Name: ' + this.layerData.feature.properties.NAME10 + '</h1>' +
              '<p>Geo_ID: ' + this.layerData.feature.properties.GEOID10 + '</p>' +
              '<p>Compactness: ' + this.layerData.feature.properties.COMPACTNESS + '</p>' +
              '<p>Population: ' + this.layerData.feature.properties.POPULATION + '</p>' +
              '<p>Democratic Leaning: ' + this.layerData.feature.properties.D_LEANING + '</p>' +
              '<p>Republican Leaning: ' + this.layerData.feature.properties.R_LEANING + '</h1>' +
              '<p>Congressional District: ' + this.layerData.feature.properties.CONGRESS_ID+ '</p>';

            layer.bindPopup(popupContent);
            layer.on('mouseover', function (e) {
              this.openPopup();
            });
            layer.on('mouseout', function (e) {
              this.closePopup();
            });


          }
        });
        // noinspection TypeScriptValidateTypes
        this.new_layers = [
          defaultBaseLayer,
          defaultOverlay
        ];
        this.new_layersControl = {
          baseLayers: {
            'OpenStreetMap Color': defaultBaseLayer,
            'OpenStreetMap BlackAndWhite': tileLayer.provider('OpenStreetMap.BlackAndWhite')
          },
          overlays: {
            'Overlay One': defaultOverlay
          }
        };
        this.isLoadingResults = false;
        this.showRedistrict = true;

      });

  }

  resetMap() {
    this.refreshCdList();
    this.clear();
    this.displayBoundaries('precinct');
  }

  clear(){
    this.map.clear();
    this.showRedistrict = false;
    while (this.list.length !== 0) {
      this.list.pop();
    }
  }

  removeCdItem(cd_id){
    this.cd_list = this.cd_list.filter(item => item !== cd_id);
    //this.displayBoundaries('precinct');
  }

  refreshCdList() {
    this.zone.run(() => {
      while (this.cd_list.length !== 0) {
        this.cd_list.pop();
      }
      //this.displayBoundaries('precinct');
    });
    for( var i = 1; i <(this.congress+1); i++){
      let cd = 'District ' + i.toString();
      this.cd_list.push(cd);
    }
  }




}


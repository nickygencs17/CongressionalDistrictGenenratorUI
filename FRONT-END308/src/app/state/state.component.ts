import {Component, NgZone, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'leaflet-providers';
import {geoJSON, Layer, tileLayer} from 'leaflet';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {StateService} from "../services/state.service";
import {StateIdService} from "../services/state-id.service";
import {UserService} from '../services/user.service';
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

  algo_id: string;

  post_cd_list: string[] = [];
  congressEcon: any[] = [];
  real_congress_request = false;
  algo_running =  false;
  algo_finished =  false;
  algo_started = false;
  paused = false;

  value: string;
  viewValue: string;
  compactness: number;
  populationdeviation: number;
  totalpopulation: number;
  numberofdistricts: number;
  polfairness: number;
  
  start_string: string;




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
      this.start_string = 'precinct';
      if (this.id === 'IN') {
        this.congress = 9;
        this.inState = true;
        this.value =  'IN';
        this.viewValue = 'Indiana';
        this.compactness = 0.662365;
        this.populationdeviation = 0.866725;
        this.totalpopulation = 6481299;
        this.numberofdistricts = 9;
        this.polfairness = 0.68396;

      }
      else if (this.id === 'AR') {
        this.congress = 4;
        this.arState = true;
        this.value = 'AR';
        this.viewValue = 'Arkansas';
        this.compactness = 0.440808;
        this.populationdeviation =3.00724;
        this.totalpopulation = 2914634;
        this.numberofdistricts = 4;
        this.polfairness = 0.60127;

      }
      else if (this.id === 'WV') {
        this.congress = 3;
        this.wvState = true;
        this.value ='WV';
        this.viewValue = 'West Virgina';
        this.compactness = 0.36649;
        this.populationdeviation = 0.3506;
        this.totalpopulation = 1852013;
        this.numberofdistricts = 3;
        this.polfairness = 0.605587;
      }
    }
    else {
      this.start_string = 'state';
    }
    for (var i = 1; i < (this.congress + 1); i++) {
      let cd = i.toString();
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
    this.displayBoundaries(this.start_string);
  }

  displayBoundaries(type): void {
    this.isLoadingResults = true;
    let url = '';
    if (type === 'state') {
      this.precinctCall = false;
      this.real_congress_request = false;
      this.congressional_request = false;
      this.showRedistrict = false;
      url = '/assets/data/USA/' + this.id.toUpperCase() + '.geojson';
    }
    else if (type === 'senate') {
      this.precinctCall = false;
      this.real_congress_request = false;
      this.congressional_request = false;
      this.showRedistrict = false;
      url = '/assets/data/' + this.id.toUpperCase() + '/' + this.id.toUpperCase() + '_UPPER.geojson';
    }
    else if (type === 'assembly') {
      this.precinctCall = false;
      this.real_congress_request = false;
      this.congressional_request = false;
      this.showRedistrict = false;
      url = '/assets/data/' + this.id.toUpperCase() + '/' + this.id.toUpperCase() + '_LOWER.geojson';
    }
    else if (type === 'precinct') {
      this.precinctCall = true;
      this.real_congress_request = false;
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
      this.real_congress_request = true;
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
                  '<h1>Name : ' + this.layerData.feature.properties.name + '</h1>' +
                  '<p>Governor : ' + this.layerData.feature.properties.REP + '</p>' +
                  '<p>Number of congress districts : ' + this.layerData.feature.properties.NUMDISTRICTS + '</p>' +
                  '<p>Population : ' + this.layerData.feature.properties.POP + '</p>' +
                  '<p>Compactness : ' + this.layerData.feature.properties.COMPACTNESS + '</p>';
              }
              else {
                popupContent = '<h1>name: ' + this.layerData.feature.properties.name + '</h1>';
                this.layerData.options.color = 'grey';
              }
            }
            else if (type === 'senate') {
              popupContent =
                '<h1>Name : State Senate District ' + this.layerData.feature.properties.NAME + '</h1>' +
                '<p>Representative : ' + this.layerData.feature.properties.REP + '</p>';
              this.layerData.options.color = this.layerData.feature.properties.COLOR;
            }
            else if (type === 'assembly') {
              popupContent =
                '<h1>Name : State House District ' + this.layerData.feature.properties.NAME + '</h1>' +
                '<p>Representative : ' + this.layerData.feature.properties.REP + '</p>';
              this.layerData.options.color = this.layerData.feature.properties.COLOR;
            }
            else if (type === 'congress') {
              popupContent = '<h1>Name : ' + this.layerData.feature.properties.District + '</h1>'
                + '<p>Compactness : ' + this.layerData.feature.properties.COMPACTNESS + '</p>'
                + '<p>Population : ' + this.layerData.feature.properties.POPULATION + '</p>'
                + '<p>White ratio : ' + this.layerData.feature.properties.RACE_WHITE + '</p>'
                + '<p>Black ratio : ' + this.layerData.feature.properties.RACE_BLACK + '</p>'
                + '<p>Hispanic ratio : ' + this.layerData.feature.properties.RACE_HISPANIC + '</p>'
                + '<p>Asian ratio : ' + this.layerData.feature.properties.RACE_ASIAN + '</p>'
                + '<p>Native ratio : ' + this.layerData.feature.properties.RACE_NATIVE + '</p>'
                + '<p>Other ratio : ' + this.layerData.feature.properties.RACE_OTHER + '</p>';

              let econObject = {
                name: this.layerData.feature.properties.District,
                gdp: this.layerData.feature.properties.GDP,
                poor: this.layerData.feature.properties.POPULATION_POOR,
                labor: this.layerData.feature.properties.LABOR_FORCE,
                rev: this.layerData.feature.properties.REVENUES,
                expenditure: this.layerData.feature.properties.EXPENDITURE
              };
              if (this.congressEcon.length < this.congress) {
                this.congressEcon.push(econObject);
              }


              this.congressEcon.sort((a, b) => {
                if (a.name < b.name) return -1;
                else if (a.name > b.name) return 1;
                else return 0;
              });


              this.layerData.options.color = this.layerData.feature.properties.COLOR;
            }
            else if (type === 'precinct') {
              popupContent =
                '<h1>Name : ' + this.layerData.feature.properties.NAME10 + '</h1>' +
                '<p>Geo_ID : ' + this.layerData.feature.properties.GEOID10 + '</p>' +
                '<p>Compactness : ' + this.layerData.feature.properties.COMPACTNESS + '</p>' +
                '<p>Population : ' + this.layerData.feature.properties.POPULATION + '</p>' +
                '<p>Democratic Leaning : ' + this.layerData.feature.properties.D_LEANING + '</p>' +
                '<p>Republican Leaning : ' + this.layerData.feature.properties.R_LEANING + '</h1>' +
                '<p>Congressional District : ' + this.layerData.feature.properties.CONGRESS_ID + '</p>';

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
      if (!this.list.includes(geo_id)) {
        this.list.push(geo_id);
      }
      //this.displayBoundaries('precinct');
    });
  }

  removeItem(geo_id) {
    this.list = this.list.filter(item => item !== geo_id);
    //this.displayBoundaries('precinct');

  }


  runAlgo(populationDeviation, ccoefficient, fcoefficient) {
    this.algo_started = true;
    this.algo_running  = true;

    this.cd_list.forEach((value) => {
      //this.post_cd_list.push()
      let valid_cd_id = this.id.toLocaleLowerCase()+'_cd_'+value;
      this.post_cd_list.push(valid_cd_id);

    });


    let body = {
      state_id: this.id,
      population_deviation: populationDeviation,
      c_coefficient: ccoefficient,
      f_coefficient: fcoefficient,
      excluded_precinct_ids: this.list,
      included_districts_ids: this.post_cd_list,
      moves: new Map()
    }
    this.isLoadingResults = true;
    this.state_service.redistrictAlgoObj = body;
    this.message = "Starting Algorithm...";
    this.state_service.runAlgo(this.id, body).subscribe((data) => {
        this.res_json = data;
        console.log(this.res_json.entity);
        this.algo_id = this.res_json.entity;
        this.state_service.algo_id = this.res_json.entity;
        this.state_service.algo_state = this.id;

        console.log(this.state_service.redistrictAlgoObj);
        console.log(this.state_service.algo_state);
        console.log(this.state_service.algo_id);

        this.router.navigate(['redistrict']);

      },
      error => {
        console.log(error);
        alert('Username/Password Bad');
      });

  }




  resetMap() {
    this.showRedistrict= false;
    this.refreshCdList();
    this.clear();
    this.showRedistrict= false;
    this.algo_running = false;
    this.displayBoundaries('precinct');
  }

  clear() {
    this.map.clear();
    this.showRedistrict = false;
    while (this.list.length !== 0) {
      this.list.pop();
    }
  }

  removeCdItem(cd_id) {
    this.cd_list = this.cd_list.filter(item => item !== cd_id);
  }

  refreshCdList() {
    this.zone.run(() => {
      while (this.cd_list.length !== 0) {
        this.cd_list.pop();
      }
    });
    for (var i = 1; i < (this.congress + 1); i++) {
      let cd = i.toString();
      this.cd_list.push(cd);
    }
  }


}


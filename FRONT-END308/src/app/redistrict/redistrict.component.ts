import {Component, NgZone, OnInit} from '@angular/core';
import {StateService} from "../services/state.service";
import {UserService} from "../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../services/post.service";
import {geoJSON, Layer, tileLayer} from "leaflet";
import {Location} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {StateIdService} from "../services/state-id.service";

@Component({
  selector: 'app-redistrict',
  templateUrl: './redistrict.component.html',
  styleUrls: ['./redistrict.component.css']
})
export class RedistrictComponent implements OnInit {


  currentUser:any;
  value: string;
  viewValue: string;
  compactness: number;
  isLoadingResults = true;
  populationdeviation: number;
  totalpopulation: number;
  numberofdistricts: number;
  polfairness: number;
  state_id: string;
  inState = false;
  wvState = false;
  arState = false;
  congress = 0;
  lat = 0;
  lng = 0;
  map = new Map();
  center: any;
  fitBounds: any;
  data: any;
  allDataFetched = false;
  layerData: any;
  new_layers: Layer[];
  new_layersControl: any;
  showRedistrict = false;
  message = "Building GeoJson...";
  list: string[] = [];
  algo_id: string;
  new_center: any;
  new_fitBounds: any;

  algo_running =  false;
  algo_finished =  false;
  algo_started = false;
  paused = false;
  res_json: any;
  algo_is_paused = false;

  new_compactness: number;
  newpopulationDeviation: number;
  want_to_show = false;
  compare = false;
  layersControl: any;
  layers:any;
  showMap = false;

  constructor( private http: HttpClient,
               private route: ActivatedRoute,
               private location: Location,
               private state_service: StateService,
               private router: Router,
               private userService: UserService,
               public zone: NgZone) { }

  ngOnInit() {
    this.currentUser = localStorage.getItem('currentUser');
    if (this.currentUser) {
      let userJson = JSON.parse(this.currentUser);
      this.currentUser = userJson.username;
    }
    else {
      alert("Please login");
      this.router.navigate(['']);
    }

    this.state_id = this.state_service.algo_state.toUpperCase();

      for (var i = 0; i < this.state_service.redistrictAlgoObj.moves.length; i++) {
        this.map.set(this.state_service.redistrictAlgoObj.moves[i].geoId, this.state_service.redistrictAlgoObj.moves[i].colorChange);
      }

    for(var i = 0; i<this.state_service.redistrictAlgoObj.excluded_precinct_ids.length; i++){
      this.list.push(this.state_service.redistrictAlgoObj.excluded_precinct_ids[i]);
    }



    if(this.state_service.algo_id === null){
      alert("Please select params");
      this.router.navigate(['']);
    }

    console.log(this.state_id);

    if (this.state_id === 'IN' || this.state_id  === 'AR' || this.state_id === 'WV') {
      if (this.state_id === 'IN') {
        this.congress = 9;
        this.inState = true;
        this.value = 'IN';
        this.viewValue = 'Indiana';
        this.compactness = 0.662365;
        this.populationdeviation = 0.866725;
        this.totalpopulation = 6481299;
        this.numberofdistricts = 9;
        this.polfairness = 0.68396;

      }
      else if (this.state_id === 'AR') {
        this.congress = 4;
        this.arState = true;
        this.value = 'AR';
        this.viewValue = 'Arkansas';
        this.compactness = 0.440808;
        this.populationdeviation = 3.00724;
        this.totalpopulation = 2914634;
        this.numberofdistricts = 4;
        this.polfairness = 0.60127;

      }
      else if (this.state_id === 'WV') {
        this.congress = 3;
        this.wvState = true;
        this.value = 'WV';
        this.viewValue = 'West Virgina';
        this.compactness = 0.36649;
        this.populationdeviation = 0.3506;
        this.totalpopulation = 1852013;
        this.numberofdistricts = 3;
        this.polfairness = 0.605587;
      }
    }
      this.state_service.getAlgoStateData(this.state_id)
        .subscribe(response => {

          console.log(response);
          this.data = response;
          this.lat = this.data.results['0'].geometry.location.lat;
          this.lng = this.data.results['0'].geometry.location.lng;
          this.center = [this.lat, this.lng];
          this.fitBounds = [[this.data.results['0'].geometry.viewport.northeast.lat, this.data.results['0'].geometry.viewport.northeast.lng],
            [this.data.results['0'].geometry.viewport.southwest.lat, this.data.results['0'].geometry.viewport.southwest.lng]];
          this.allDataFetched = true;
          this.displayBoundaries();

        });
      }


    displayBoundaries(): void {
      let url = '/assets/data/' + this.state_id.toUpperCase()  + '/' + this.state_id.toUpperCase()  + '_VDS.geojson';

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
                else if (this.list.includes(this.layerData.feature.properties.GEOID10)) {
                  this.layerData.options.color = 'red';
                  this.layerData.options.fillColor = 'black';
                  this.layerData.options.weight = 2;
                  this.layerData.options.fillOpacity = 3;
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
                '<p>Congressional District: ' + this.layerData.feature.properties.CONGRESS_ID + '</p>';

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

          //this.getUpdate(this.state_service.algo_id);
          this.isLoadingResults = false;
        });

  }


  getOrginalMap(){
    let url = '/assets/data/' + this.state_id.toUpperCase()  + '/' + this.state_id.toUpperCase()  + '_VDS.geojson';

    this.http.get<any>(url)
      .subscribe(geo1 => {
        let defaultBaseLayer = tileLayer.provider('OpenStreetMap.Mapnik');
        let defaultOverlay = geoJSON(geo1, {
          onEachFeature: (feature, layer) => {
            this.layerData = layer;
            this.layerData.options.weight = 0.7;

            this.layerData.options.color = this.layerData.feature.properties.COLOR;
            let popupContent =
              '<h1>Name: ' + this.layerData.feature.properties.NAME10 + '</h1>' +
              '<p>Geo_ID: ' + this.layerData.feature.properties.GEOID10 + '</p>' +
              '<p>Compactness: ' + this.layerData.feature.properties.COMPACTNESS + '</p>' +
              '<p>Population: ' + this.layerData.feature.properties.POPULATION + '</p>' +
              '<p>Democratic Leaning: ' + this.layerData.feature.properties.D_LEANING + '</p>' +
              '<p>Republican Leaning: ' + this.layerData.feature.properties.R_LEANING + '</h1>' +
              '<p>Congressional District: ' + this.layerData.feature.properties.CONGRESS_ID + '</p>';

            layer.bindPopup(popupContent);
            layer.on('mouseover', function (e) {
              this.openPopup();
            });
            layer.on('mouseout', function (e) {
              this.closePopup();
            });


          }
        });
        this.new_center = this.center;
        this.new_fitBounds= this.fitBounds;

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
        //this.getUpdate(this.state_service.algo_id);
        this.isLoadingResults = false;
        this.showMap= true;
      });

  }


  getUpdate(entity_id){

    this.state_service.getUpdate(entity_id)
      .subscribe((data) => {
          this.res_json = data;

          for (var i = 0; i < this.res_json.entity.moves.length; i++) {
            this.map.set(this.res_json.entity.moves[i].geoId, this.res_json.entity.moves[i].colorChange);
          }
          this.message = "Building GeoJson...";

          this.displayBoundaries();
          console.log(this.res_json.entity.finished);
          this.new_compactness =  this.res_json.entity.compactness;
          this.newpopulationDeviation = this.res_json.entity.populationDeviation;
          if(!this.res_json.entity.finished && (this.algo_is_paused == false)){
            console.log("gettingg update");
            this.getUpdate(entity_id);
          }
          else{
            this.algo_running  = false;
            this.algo_finished = true;
          }
        },
        error => {
          console.log(error);
          alert('Username/Password Bad');
        });


  }

  resetMap(){
    this.algo_is_paused = true;
    this.isLoadingResults = true;
    this.router.navigate(['/state', this.state_service.algo_state.toUpperCase()]);
  }

  play(){
      this.algo_is_paused = false;
      this.algo_running = true;
      this.getUpdate(this.state_service.algo_id);
  }

  pause(){

    this.algo_is_paused = true;
    this.algo_running = false;

  }
  save(){
    this.state_service.saveRedistrict(this.state_service.algo_id)
      .subscribe((data) => {
        this.res_json = data;

        if(this.res_json.status==200){
          alert('saved');
        }
      },
      error => {
        console.log(error);
        alert('Username/Password Bad');
      });
  }

  compareMap(){
    this.compare = !this.compare;
    if(this.compare == true){
      this.isLoadingResults = true;
      this.getOrginalMap();
    }

  }


}

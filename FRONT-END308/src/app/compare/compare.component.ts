import {Component, OnInit} from '@angular/core';
import {StateService} from "../services/state.service";
import {geoJSON, tileLayer} from "leaflet";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {


  compared = false;
  allDataFetched = false;
  display_maps = false;

  state_one:any;
  state_id_one: string;
  state_one_lat: any;
  state_one_lng: any;
  state_one_center: any;
  state_one_fit_bounds: any;
  state_one_data: any;
  state_one_layer:any;
  layers_one :any;
  layers_control_one:any;

  state_two:any;
  state_id_two: string;
  state_two_lat: any;
  state_two_lng: any;
  state_two_center: any;
  state_two_fit_bounds: any;
  state_two_data: any;
  state_two_layer:any;
  layers_two :any;
  layers_control_two:any;



  states = [
    {
      value: 'WV',
      viewValue: 'West Virgina',
      compactness:0.36649,
      populationdeviation:0.3506,
      totalpopulation:1852013,
      numberofdistricts:3,
      polfairness: 0.605587
    },
    {
      value: 'AR',
      viewValue: 'Arkansas',
      compactness:0.440808,
      populationdeviation:3.00724,
      totalpopulation:2914634,
      numberofdistricts:4,
      polfairness: 0.60127
    },
    {
      value: 'IN',
      viewValue: 'Indiana',
      compactness: 0.662365,
      populationdeviation: 0.866725,
      totalpopulation: 6481299,
      numberofdistricts: 9,
      polfairness: 0.68396
    }
  ];


  constructor(private state_service: StateService,
              private http: HttpClient) {
  }

  ngOnInit() {
  }

  changeStateOne(state_one) {
    console.log(state_one);
    this.state_one = state_one;
    this.state_id_one = state_one.value;
  }

  changeStateTwo(state_two) {
    console.log(state_two);
    this.state_two = state_two;
    this.state_id_two = state_two.value;
  }

  compare() {

    if (!this.state_id_one || !this.state_id_two || (this.state_id_one == this.state_id_two)) {
      alert('Please Select Two Different States');

    }

    this.state_service.getCompareData(this.state_id_one)
      .subscribe(response => {
        console.log(response);
        this.state_one_data = response;
        this.state_one_lat = this.state_one_data.results['0'].geometry.location.lat;
        this.state_one_lng = this.state_one_data.results['0'].geometry.location.lng;
        this.state_one_center = [this.state_one_lat, this.state_one_lng];
        this.state_one_fit_bounds = [[this.state_one_data.results['0'].geometry.viewport.northeast.lat, this.state_one_data.results['0'].geometry.viewport.northeast.lng],
          [this.state_one_data.results['0'].geometry.viewport.southwest.lat, this.state_one_data.results['0'].geometry.viewport.southwest.lng]];
        this.state_service.getCompareData(this.state_id_two)
          .subscribe(response => {
            console.log(response);
            this.state_two_data = response;
            this.state_two_lat = this.state_two_data.results['0'].geometry.location.lat;
            this.state_two_lng = this.state_two_data.results['0'].geometry.location.lng;
            this.state_two_center = [this.state_two_lat, this.state_two_lng];
            this.state_two_fit_bounds = [[this.state_two_data.results['0'].geometry.viewport.northeast.lat, this.state_two_data.results['0'].geometry.viewport.northeast.lng],
              [this.state_two_data.results['0'].geometry.viewport.southwest.lat, this.state_two_data.results['0'].geometry.viewport.southwest.lng]];
            this.allDataFetched = true;
            this.displayMaps();
          });
      });

    this.compared = true;
    console.log(this.state_id_two);
    console.log(this.state_id_one);
  }

  displayMaps() {
    let url_one = '/assets/data/' + this.state_id_one.toUpperCase() + '/' + this.state_id_one.toUpperCase() + '_COMBINED_CONGRESS.geojson';
    this.http.get<any>(url_one)
      .subscribe(geo1 => {
        let defaultBaseLayer = tileLayer.provider('OpenStreetMap.Mapnik');
        let defaultOverlay = geoJSON(geo1, {
          onEachFeature: (feature, layer) => {

            this.state_one_layer = layer;
            this.state_one_layer.options.weight = 0.7;
            this.state_one_layer.options.color = this.state_one_layer.feature.properties.COLOR;

            let popupContent = '<h1>Name: ' + this.state_one_layer.feature.properties.District + '</h1>'
                + '<p>Compactness: ' + this.state_one_layer.feature.properties.COMPACTNESS + '</p>'
                + '<p>Population: ' + this.state_one_layer.feature.properties.POPULATION + '</p>'
                + '<p>White: ' + this.state_one_layer.feature.properties.RACE_WHITE + '</p>'
                + '<p>Black: ' + this.state_one_layer.feature.properties.RACE_BLACK + '</p>'
                + '<p>Hispanic: ' + this.state_one_layer.feature.properties.RACE_HISPANIC + '</p>'
                + '<p>Asian: ' + this.state_one_layer.feature.properties.RACE_ASIAN + '</p>'
                + '<p>Native: ' + this.state_one_layer.feature.properties.RACE_NATIVE + '</p>'
                + '<p>Other: ' + this.state_one_layer.feature.properties.RACE_OTHER + '</p>';

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
        this.layers_one = [
          defaultBaseLayer,
          defaultOverlay
        ];

        this.layers_control_one = {
          baseLayers: {
            'OpenStreetMap Color': defaultBaseLayer,
            'OpenStreetMap BlackAndWhite': tileLayer.provider('OpenStreetMap.BlackAndWhite')
          },
          overlays: {
            'Overlay One': defaultOverlay
          }
        };
        this.displayMapTwo();
      });

  }

  displayMapTwo() {

    let url_two = '/assets/data/' + this.state_id_two.toUpperCase() + '/' + this.state_id_two.toUpperCase() + '_COMBINED_CONGRESS.geojson';
    this.http.get<any>(url_two)
      .subscribe(geo1 => {
        let defaultBaseLayer = tileLayer.provider('OpenStreetMap.Mapnik');
        let defaultOverlay = geoJSON(geo1, {
          onEachFeature: (feature, layer) => {

            this.state_two_layer = layer;
            this.state_two_layer.options.weight = 0.7;
            this.state_two_layer.options.color = this.state_two_layer.feature.properties.COLOR;

            let popupContent = '<h1>Name: ' + this.state_two_layer.feature.properties.District + '</h1>'
              + '<p>Compactness: ' + this.state_two_layer.feature.properties.COMPACTNESS + '</p>'
              + '<p>Population: ' + this.state_two_layer.feature.properties.POPULATION + '</p>'
              + '<p>White: ' + this.state_two_layer.feature.properties.RACE_WHITE + '</p>'
              + '<p>Black: ' + this.state_two_layer.feature.properties.RACE_BLACK + '</p>'
              + '<p>Hispanic: ' + this.state_two_layer.feature.properties.RACE_HISPANIC + '</p>'
              + '<p>Asian: ' + this.state_two_layer.feature.properties.RACE_ASIAN + '</p>'
              + '<p>Native: ' + this.state_two_layer.feature.properties.RACE_NATIVE + '</p>'
              + '<p>Other: ' + this.state_two_layer.feature.properties.RACE_OTHER + '</p>';

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
        this.layers_two = [
          defaultBaseLayer,
          defaultOverlay
        ];

        this.layers_control_two = {
          baseLayers: {
            'OpenStreetMap Color': defaultBaseLayer,
            'OpenStreetMap BlackAndWhite': tileLayer.provider('OpenStreetMap.BlackAndWhite')
          },
          overlays: {
            'Overlay One': defaultOverlay
          }
        };
        this.display_maps = true;
      });
  }
}

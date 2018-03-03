import { Component, OnInit } from '@angular/core';
import { StateService } from "../state.service";
import {tileLayer, geoJSON, Layer, latLng} from "leaflet";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { LeafletLayersDemoModel } from './layers-demo.model';


@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  public geo_json_data;

  constructor(private state_service:StateService, public http:HttpClient) {
    this.apply();
  }

  LAYER_OSM = {
    id: 'openstreetmap',
    name: 'Open Street Map',
    enabled: false,
    layer: tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Open Street Map'
    })
  };

  geoJSON = {
    id: 'geoJSON',
    name: 'Geo JSON Polygon',
    enabled: true,
    layer: geoJSON(
      ({
        type: 'Polygon',
        coordinates: [[
          [ -121.6, 46.87 ],
          [ -121.5, 46.87 ],
          [ -121.5, 46.93],
          [ -121.6, 46.87 ]
        ]]
      }) as any,
      { style: () => ({ color: '#ff7800' })})
  };


  model = new LeafletLayersDemoModel(
    [ this.LAYER_OSM],
    this.LAYER_OSM.id,
    [ this.geoJSON ]
  );

  layers: Layer[];
  layersControl = {
    baseLayers: {
      'Open Street Map': this.LAYER_OSM.layer
    },
    overlays: {
      GeoJSON: this.geoJSON.layer
    }
  };
  options = {
    zoom: 6,
    center: latLng(41.2033, -74.2179)
  };


  apply() {

    // Get the active base layer
    const baseLayer = this.model.baseLayers.find((l: any) => (l.id === this.model.baseLayer));

    // Get all the active overlay layers
    const newLayers = this.model.overlayLayers
      .filter((l: any) => l.enabled)
      .map((l: any) => l.layer);
    newLayers.unshift(baseLayer.layer);

    this.layers = newLayers;

    return false;
  }



  ngOnInit() {
    console.log(this.state_service.state_id);
    this.http.get('http://localhost:4200/assets/data/pa.geojson')
      .subscribe((data) => {
          this.geo_json_data = data;
          console.log(this.geo_json_data);
        },
        error => {
          console.log(error.text());
          alert('GEO JSON GET FAILED');
        });
  }







}

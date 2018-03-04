import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'leaflet-providers';
import {Layer, tileLayer, geoJSON, LayerOptions, latLng} from 'leaflet';
@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  public geo_json_data;


  layers: Layer[];
  layersControl: any;
  options = {
    zoom: 6,
    center: latLng(41.2033, -74.2179)
  };


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any>('/assets/data/pa.geojson')
      .subscribe(geo1 => {
        {
          let defaultBaseLayer = tileLayer.provider('OpenStreetMap.Mapnik');
          let defaultOverlay = geoJSON(geo1);
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
        }

      });
  }


}

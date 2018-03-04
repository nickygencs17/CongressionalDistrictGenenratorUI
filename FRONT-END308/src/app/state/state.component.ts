import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'leaflet-providers';
import { Layer, tileLayer, geoJSON, LayerOptions } from 'leaflet';
@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  public geo_json_data;


  layers: Layer[];
  layersControl: any;
  center = [59.9386300, 30.3141300];
  fitBounds = [[60.2448369, 29.6998985], [59.6337832, 30.254172]];

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

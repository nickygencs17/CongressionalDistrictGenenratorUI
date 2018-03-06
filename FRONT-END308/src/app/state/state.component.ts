import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'leaflet-providers';
import {Layer, tileLayer, geoJSON,latLng} from 'leaflet';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { StateService} from "../state.service";

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {


  id: string;

  goBack(): void {
    this.location.back();
  }
  lat = this.state_service.lat;
  lng = this.state_service.lng;


  layers: Layer[];
  layersControl: any;
   options = {
     zoom: 4,
     center: latLng(37.0902, -95.7129)
    }


  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private location: Location,
              public state_service:StateService) { }


  ngOnInit() {
     console.log("here");
    console.log(this.state_service);

    this.id = this.route.snapshot.params['id'];
    this.http.get<any>('/assets/data/USA/' + this.id.toUpperCase() + '.geojson')
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

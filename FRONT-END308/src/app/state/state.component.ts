import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'leaflet-providers';
import {Layer, tileLayer, geoJSON,latLng} from 'leaflet';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { StateService} from "../state.service";
import {StateIdService} from "../state-id.service";

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  allDataFetched = false;
  id: string;

  goBack(): void {
    this.location.back();
  }
  lat = 0;
  lng = 0;


  layers: Layer[];
  layersControl: any;
  center: any;
  fitBounds: any;
  data: any;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private location: Location,
              private state_service:StateService,
              private state_id_service:StateIdService) { }


  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.state_id_service.state_id=this.id;
    this.state_service.getData()
      .subscribe(response => {
        this.data=response;
        this.lat = this.data.results["0"].geometry.location.lat;
        this.lng = this.data.results["0"].geometry.location.lng;
        this.center = [this.lat, this.lng];
        this.fitBounds = [[this.data.results["0"].geometry.viewport.northeast.lat, this.data.results["0"].geometry.viewport.northeast.lng],
          [this.data.results["0"].geometry.viewport.southwest.lat, this.data.results["0"].geometry.viewport.southwest.lng]];
        this.allDataFetched = true;

      })


    // // this.id = this.route.snapshot.params['id'];
    // // console.log(this.id);
    // // this.http.get<any>('http://www.datasciencetoolkit.org/maps/api/geocode/json?sensor=false&address=' + this.id +',US')
    // //   .subscribe(data => {
    // //     console.log(data);
    //     this.lat = data.results["0"].geometry.location.lat;
    //     this.lng = data.results["0"].geometry.location.lng;
    //     this.center = [this.lat, this.lng];
    //     this.fitBounds = [[data.results["0"].geometry.viewport.northeast.lat, data.results["0"].geometry.viewport.northeast.lng],
    //       [data.results["0"].geometry.viewport.southwest.lat, data.results["0"].geometry.viewport.southwest.lng]];
    //     this.allDataFetched = true;
    // //
    // //   });




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

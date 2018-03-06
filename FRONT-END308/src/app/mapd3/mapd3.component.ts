import {Component, OnDestroy, OnInit} from '@angular/core';
import { UsMapService } from '../us-map.service';
import { Router } from "@angular/router";
import { StateService } from "../state.service";
import {latLng} from "leaflet";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-mapd3',
  templateUrl: './mapd3.component.html',
  styleUrls: ['./mapd3.component.css']
})
export class Mapd3Component implements OnInit, OnDestroy {

  public stateId;
  public lat;
  public lng;

  constructor(public router: Router, private usMapService: UsMapService, private state_service: StateService, private http: HttpClient) { }
  coordinates: object;

  ngOnInit() {
    this.usMapService.getUsMapCoordinates().then(data => this.coordinates = data);
  }

  onUsMapClick(state){
    console.log(state);
    this.stateId=state;

  }

  ngOnDestroy(): void {
    console.log(this.stateId);
    this.http.get<any>('http://www.datasciencetoolkit.org/maps/api/geocode/json?sensor=false&address=' + this.stateId +',US')
      .subscribe(data => {
        console.log(data);
        this.state_service.lat = data.results["0"].geometry.location.lat;
        this.state_service.lng = data.results["0"].geometry.location.lng;
        console.log(this.state_service.lat);
        console.log(this.state_service.lng);
      });

  }



}

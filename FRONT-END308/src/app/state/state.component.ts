import { Component, OnInit } from '@angular/core';
import { StateService } from "../state.service";
import {latLng, polygon, tileLayer} from "leaflet";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  public geo_json_data;

  constructor(private state_service:StateService, public http:HttpClient) { }

  ngOnInit() {
    console.log(this.state_service.state_id);
    this.http.get('new.json')
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

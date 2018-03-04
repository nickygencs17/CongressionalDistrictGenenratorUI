import {Component, OnDestroy, OnInit} from '@angular/core';
import { UsMapService } from '../us-map.service';
import { Router } from "@angular/router";
import { StateService } from "../state.service";

@Component({
  selector: 'app-mapd3',
  templateUrl: './mapd3.component.html',
  styleUrls: ['./mapd3.component.css']
})
export class Mapd3Component implements OnInit, OnDestroy {

  public stateId;
  ngOnDestroy() {
      this.state_service.state_id = this.stateId;
  }


  constructor(public router: Router, private usMapService: UsMapService, private state_service: StateService) { }
  coordinates: object;

  ngOnInit() {
    this.usMapService.getUsMapCoordinates().then(data => this.coordinates = data);
  }

  onUsMapClick(state){
    this.stateId = state;
    this.router.navigate(['state']);
  }
}

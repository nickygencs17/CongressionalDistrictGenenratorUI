import {Component, OnDestroy, OnInit} from '@angular/core';
import { UsMapService } from '../services/us-map.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit{

  public stateId;
  public lat;
  public lng;

  constructor(private usMapService: UsMapService) { }
  coordinates: object;

  ngOnInit() {
    this.usMapService.getUsMapCoordinates().then(data => this.coordinates = data);
  }

  onUsMapClick(state){
    this.stateId = state;

  }



}

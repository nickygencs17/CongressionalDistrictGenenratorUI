import {Component, OnInit} from '@angular/core';
import {UsMapService} from '../services/us-map.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  public stateId;
  public lat;
  public lng;
  coordinates: object;

  constructor(private usMapService: UsMapService) {
  }

  ngOnInit() {
    this.usMapService.getUsMapCoordinates().then(data => this.coordinates = data);
  }

  onUsMapClick(state) {
    this.stateId = state;

  }


}

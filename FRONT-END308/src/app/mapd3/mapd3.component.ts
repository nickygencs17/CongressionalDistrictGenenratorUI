import { Component, OnInit} from '@angular/core';
import { UsMapService } from '../us-map.service';

@Component({
  selector: 'app-mapd3',
  templateUrl: './mapd3.component.html',
  styleUrls: ['./mapd3.component.css']
})
export class Mapd3Component implements OnInit {


  constructor(private usMapService: UsMapService) { }
  coordinates: object;

  ngOnInit() {
    this.usMapService.getUsMapCoordinates().then(data => this.coordinates = data);
  }

  onUsMapClick(state){
    console.log(state);
  }
}

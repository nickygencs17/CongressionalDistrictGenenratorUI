import { Component, OnInit } from '@angular/core';
import {circle, latLng, marker, polygon, tileLayer} from "leaflet";

@Component({
  selector: 'app-ny',
  templateUrl: './ny.component.html',
  styleUrls: ['./ny.component.css']
})
export class NyComponent implements OnInit {


  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 75, attribution: '...' })
    ],
    zoom: 6,
    center: latLng(43.2994, -74.2179)
  };

  layers = [
    circle([ 46.95, -80], { radius: 50000 }),
    polygon([[ 45.2994, -70.2179 ], [ 43.2994, -74.2179 ], [ 42.2994, -80.2179 ]]),
    marker([ 46.879966, -121.726909 ])
  ];

  constructor() { }

  ngOnInit() {

  }

}

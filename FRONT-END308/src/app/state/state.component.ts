import { Component, OnInit } from '@angular/core';
import { StateService } from "../state.service";

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  constructor(private state_service:StateService) { }

  ngOnInit() {
    console.log(this.state_service.state_id);
  }

}

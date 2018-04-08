import { Injectable } from '@angular/core';
// Import HttpClient class
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute} from "@angular/router";
import {StateIdService} from "./state-id.service";


@Injectable()
export class StateService {

  // Inject HttpClient class
  constructor(private http: HttpClient,
              private state_id_service:StateIdService) { }


  getData() {

    // Set the callback value to 'JSONP_CALLBACK' in your request URL
    const url = 'http://www.datasciencetoolkit.org/maps/api/geocode/json?sensor=false&address='+this.state_id_service.state_id+',US';

    // Pass the key for your callback (in this case 'callback')
    // as the second argument to the jsonp method
    return this.http.jsonp(url, 'callback')
  }
}

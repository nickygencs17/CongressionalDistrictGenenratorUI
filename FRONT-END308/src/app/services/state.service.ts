import {Injectable} from '@angular/core';
// Import HttpClient class
import {HttpClient} from '@angular/common/http';
import {StateIdService} from "./state-id.service";


@Injectable()
export class StateService {

  constructor(private http: HttpClient,
              private state_id_service: StateIdService) {
  }


  getData() {
    const url = 'http://www.datasciencetoolkit.org/maps/api/geocode/json?sensor=false&address=' + this.state_id_service.state_id + ',US';
    return this.http.jsonp(url, 'callback')
  }
}

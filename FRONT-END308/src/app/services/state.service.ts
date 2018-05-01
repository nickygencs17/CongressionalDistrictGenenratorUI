import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StateIdService } from "./state-id.service";

@Injectable()
export class StateService {
  currentUser: any;

  constructor(private http: HttpClient,
              private state_id_service: StateIdService) {
  }

  getData() {
    const url = 'http://www.datasciencetoolkit.org/maps/api/geocode/json?sensor=false&address=' + this.state_id_service.state_id + ',US';
    return this.http.jsonp(url, 'callback');
  }

  runAlgo(id: string, populationDeviation: number, ccoefficient: number, fcoefficient: number) {
    let url = 'http://localhost:8080/algorithm?state=' + id + '&populationDeviation=' + populationDeviation + '&ccoefficient=' + ccoefficient + '&fcoefficient=' + fcoefficient;
    this.currentUser = localStorage.getItem('currentUser');
    let userJson = JSON.parse(this.currentUser);
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(userJson.username + ':' + userJson.password));
    return this.http.get(url, {headers: headers});
  }
}

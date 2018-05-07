import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {StateIdService} from "./state-id.service";

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

  getCompareData(state_id) {
    const url = 'http://www.datasciencetoolkit.org/maps/api/geocode/json?sensor=false&address=' + state_id + ',US';
    return this.http.jsonp(url, 'callback');
  }


  runAlgo(id: string, body: any) {
    let url = 'http://localhost:8080/algorithm';
    this.currentUser = localStorage.getItem('currentUser');
    let userJson = JSON.parse(this.currentUser);
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(userJson.username + ':' + userJson.password));
    return this.http.post(url, body, {headers: headers});
  }

  getUpdate(id) {
    let url = 'http://localhost:8080/algorithm/update/' + id;
    this.currentUser = localStorage.getItem('currentUser');
    let userJson = JSON.parse(this.currentUser);
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(userJson.username + ':' + userJson.password));
    return this.http.get(url, {headers: headers});
  }
}

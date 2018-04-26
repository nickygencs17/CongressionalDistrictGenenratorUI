import {Injectable} from '@angular/core';
// Import HttpClient class
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
    return this.http.jsonp(url, 'callback')
  }

  runAlgo(id: string, pcoefficient: number, ccoefficient: number, fcoefficient: number) {
    console.log(id);
    //http://localhost:8080/algorithm?state=WV&pcoefficient=1&ccoefficient=1&fcoefficient=1

    let url = 'http://localhost:8080/algorithm?state=' + id + '&pcoefficient=' + pcoefficient + '&ccoefficient=' + ccoefficient + '&fcoefficient=' + fcoefficient;
    console.log(url);

    this.currentUser = localStorage.getItem('currentUser');
    let userJson = JSON.parse(this.currentUser);
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(userJson.username + ':' + userJson.password));
    return this.http.get(url, {headers: headers})
  }
}

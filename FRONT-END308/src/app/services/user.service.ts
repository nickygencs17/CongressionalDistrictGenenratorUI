///<reference path="../utilities/navbar/navbar.component.ts"/>
import {Injectable, ViewChild} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { User } from '../entities/user';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }
  user_name: string;
  loggedin: boolean;
  isAdmin: boolean;
  resJson: any;
  hostname = 'localhost:8080';
  currentUser = {
    username: '',
    password: '',
    role: ''
  };

  login(username: string, password: string):Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get<any>('http://' + this.hostname + '/login', { headers: headers})
      .catch((e: any) => Observable.throw(this.errorHandler(e)));
  }

  errorHandler(error: any): void {
    alert('Username or Password Bad');
  }


  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.loggedin = false;
  }

  createUser(user: User) {
    console.log(user);
    this.http.post('http://' + this.hostname + '/user', user)
     .subscribe((data) => {
          console.log(data);
         this.resJson = data;
         console.log(this.resJson.status);
         if (this.resJson.status === 201) {
             alert('CREATED');
             this.loggedin = true;
             this.user_name = user.username;
             this.currentUser.username = user.username;
             this.currentUser.role = 'ROLE_USER';
             localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
             this.router.navigate(['']);
         }
         else if (this.resJson.status === 409) {
           alert('user exsits');
           this.router.navigate(['']);
         }

       },
       error => {
         alert('Username/Password Bad');
       });
  }
  getUsers(): any {
    let headers = new HttpHeaders();
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if(this.currentUser.role != 'ROLE_ADMIN') {
      alert("Not Authorized");
      this.router.navigate(['']);
    }
    headers = headers.append('Authorization', 'Basic ' + btoa(this.currentUser.username + ':' + this.currentUser.password));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.get<any>('http://' + this.hostname + '/user/all', { headers: headers});

  }

  isLoggedIn(): boolean {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if(this.currentUser) return true;
    return false;
  }

}




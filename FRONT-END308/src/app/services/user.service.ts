import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { User } from '../entities/user';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {

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

  constructor(private http: HttpClient, private router: Router) {
  }

  login(username: string, password: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get<any>('http://' + this.hostname + '/login', {headers: headers})
      .catch((e: any) => Observable.throw(this.errorHandler(e)));
  }

  errorHandler(error: any): void {
    alert('Username or Password Bad');
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.loggedin = false;
  }

  createUser(user: User) {
    this.http.post('http://' + this.hostname + '/user', user)
      .subscribe((data) => {
          this.resJson = data;
          if (this.resJson.status === 201) {
            alert('CREATED');
            if (localStorage.getItem('currentUser')) {
              this.router.navigate(['users']);
              return;
            }
            this.loggedin = true;
            this.user_name = user.username;
            this.currentUser.username = user.username;
            this.currentUser.role = 'ROLE_USER';
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            location.reload();
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

  getUsers(): Observable<any> {
    let headers = new HttpHeaders();
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (this.currentUser.role != 'ROLE_ADMIN') {
      alert("Not Authorized");
      this.router.navigate(['']);
    }
    headers = headers.append('Authorization', 'Basic ' + btoa(this.currentUser.username + ':' + this.currentUser.password));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http
      .get<any>('http://' + this.hostname + '/user/all', {headers: headers})
      .catch((error: any) => Observable.throw(error));
  }

  isLoggedIn(): boolean {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (this.currentUser) return true;
    return false;
  }

  deleteUser(username: string): Observable<any> {
    let headers = new HttpHeaders();
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (this.currentUser.role != 'ROLE_ADMIN') {
      alert("Not Authorized");
      this.router.navigate(['']);
    }
    headers = headers.append('Authorization', 'Basic ' + btoa(this.currentUser.username + ':' + this.currentUser.password));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http
      .delete<any>('http://' + this.hostname + '/user/delete?username=' + username, {headers: headers})
      .catch((error: any) => Observable.throw(error));
  }

  editUser(new_user): Observable<any> {
    let headers = new HttpHeaders();
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (this.currentUser.role != 'ROLE_ADMIN') {
      alert("Not Authorized");
      this.router.navigate(['']);
    }
    headers = headers.append('Authorization', 'Basic ' + btoa(this.currentUser.username + ':' + this.currentUser.password));
    return this.http.post('http://' + this.hostname + '/user/edit', new_user, {headers: headers})
      .catch((error: any) => Observable.throw(error));
  }
}




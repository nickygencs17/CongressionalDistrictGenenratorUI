import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';
import { User } from '../entities/user';
import { users } from '../entities/users';

@Injectable()
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }
  user_name: string;
  loggedin: boolean;
  resJson: any;
  hostname = 'localhost:8080';
  login(username: string, password: string) {
    return this.http.post<any>('/api/authenticate', { username: username, password: password })
      .map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  createUser(user: User) {
    this.http.post('http://' + this.hostname + '/storage/user', user)
     .subscribe((data) => {
         this.resJson = data;
         console.log(this.resJson.status);
         if (this.resJson.status === 201) {
             alert('CREATED');
             this.loggedin = true;
             this.user_name = user.username;
             localStorage.setItem('currentUser', JSON.stringify(user));
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
    return users;
  }
}




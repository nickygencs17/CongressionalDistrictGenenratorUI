import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';
import { User } from '../entities/user';

@Injectable()
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }
  user_name: string;
  loggedin: boolean;
  resJson: any;
  hostname = 'localhost:8080';
  currentUser = {
    username: '',
    password: '',
    role: ''
  };
  // login(username: string, password: string) {
  //   console.log("LOGIN");
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
  //   headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
  //   this.http.get('http://' + this.hostname + '/login', { headers: headers })
  //     .map(user => {
  //       // login successful if there's a jwt token in the response
  //       console.log(user);
  //       if (user) {
  //         // store user details and jwt token in local storage to keep user logged in between page refreshes
  //         localStorage.setItem('currentUser', JSON.stringify(user));
  //       }
  //       return user;
  //     });
  //
  // }
  login(username: string, password: string) {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.get<any>('http://' + this.hostname + '/login', { headers: headers})
      .subscribe((data) => {
          this.currentUser.username = username;
          this.currentUser.password = password;
          this.currentUser.role = data.entity.roles['0'];
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
         // localStorage.setItem()
        },
        error => {
          console.log(error);
          alert('Username/Password Bad');
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
    this.http.get('http://' + this.hostname + '/user/all')
      .subscribe((data) => {
          this.resJson = data;
          console.log(this.resJson.status);
          if (this.resJson.status === 201) {
            return data;
          }
          else if (this.resJson.status === 409) {
            alert('Error getting users');
            this.router.navigate(['']);
          }

        },
        error => {
          alert('Error getting users using GET request');
          this.router.navigate(['']);
        });
  }
}




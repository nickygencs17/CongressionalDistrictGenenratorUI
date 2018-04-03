import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {LogindialogComponent} from "../logindialog/logindialog.component";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "../../user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  ngOnInit(): void {
    if(this.userService.loggedin==true) {

      this.nav_bar_name = this.userService.user_name;
      this.logged_in=true;
    }

  }

  name: string;
  password: string;
  res: any;
  nav_bar_name = "Login";
  logged_in = false;
  hostname = 'localhost:8080';

  constructor(public dialog: MatDialog, public router: Router, private http: HttpClient, private userService:UserService) {}

  openDialog(): void {
    let dialogRef = this.dialog.open(LogindialogComponent, {
      height: '400px',
      width: '600px',
      data: { name: this.name, password: this.password}
    });

    dialogRef.afterClosed().subscribe(result => {
        this.name = result.name;
        this.password = result.password;
        this.login();

    });
  }


  login() {
    var username = this.name;
    var password = this.password;
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.get('http://'+ this.hostname + '/login', { headers: headers})
      .subscribe((data) => {
        this.res = data;
        if (this.res.entity.roles["0"]=='ROLE_USER'){
          this.logged_in=true;
          this.nav_bar_name=this.name;
          this.userService.user_name = this.name;
          this.userService.loggedin=true;
        }
      },
        error => {
          console.log(error);
          alert('Username/Password Bad');
        });
  }

  logout(){
    console.log("logout");
  }

  goHome() {
    this.router.navigate(['']);
  }
}


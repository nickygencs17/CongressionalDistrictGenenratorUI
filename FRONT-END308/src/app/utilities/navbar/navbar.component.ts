import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import { LogindialogComponent } from '../logindialog/logindialog.component';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { UserService} from '../../services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{




  currentUser: any;
  username: string;
  password: string;
  res: any;
  nav_bar_name = 'Login';
  logged_in: boolean;
  isAdmin: boolean;
  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser');
    if (this.currentUser) {
      this.nav_bar_name = this.currentUser.username;
      this.logged_in = true;
      if(this.currentUser.role === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    }
    else {
      this.logged_in = false;
      this.isAdmin = false;
    }

  }

  constructor(public dialog: MatDialog,
              public router: Router,
              private http: HttpClient,
              private userService: UserService,
              public location: Location) {}


  openDialog(): void {
    let dialogRef = this.dialog.open(LogindialogComponent, {
      height: '400px',
      width: '600px',
      data: { username: this.username, password: this.password }
    });

    dialogRef.afterClosed().subscribe(data => {

        if(!data){
          return;
        }
        else{
          this.username = data.username;
          this.password = data.password;
          this.userService.login(this.username, this.password)
            .subscribe((data) => {
                console.log(data.status);
                console.log(this.username + this.password);
                this.userService.currentUser.username = this.username;
                this.userService.currentUser.password = this.password;
                this.userService.currentUser.role = data.entity.roles['0'];
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                this.reload_fun();

              },
              error => {
                return;
              });
        }

    });

  }

  reload_fun(): any {
    location.reload();
  }

  goHome() {
    this.router.navigate(['']);
  }


  logout() {
    this.userService.logout();
    location.assign('');
    location.reload();
  }
}


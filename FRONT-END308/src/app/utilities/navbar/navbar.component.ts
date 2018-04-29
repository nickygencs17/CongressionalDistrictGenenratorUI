import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LogindialogComponent } from '../logindialog/logindialog.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  currentUser: any;
  username: string;
  password: string;
  nav_bar_name = 'Login';
  logged_in: boolean;
  isAdmin: boolean;
  displayName = 'v';

  constructor(public dialog: MatDialog,
              public router: Router,
              private http: HttpClient,
              private userService: UserService) {
  }

  ngOnInit(): void {

    this.currentUser = localStorage.getItem('currentUser');
    if (this.currentUser) {
      let userJson = JSON.parse(this.currentUser);
      this.nav_bar_name = userJson.username;
      this.logged_in = true;
      if (userJson.role === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    }
    else {
      this.logged_in = false;
      this.isAdmin = false;
    }

  }

  openDialog(): void {
    let dialogRef = this.dialog.open(LogindialogComponent, {
      height: '400px',
      width: '600px',
      data: {username: this.username, password: this.password}
    });

    dialogRef.afterClosed().subscribe(data => {

      if (data) {
        this.userService.login(data.username, data.password)
          .subscribe((res_data) => {
              this.userService.currentUser = {
                username: data.username,
                password: data.password,
                role: res_data.entity.roles['0']
              };
              this.userService.user_name = data.username;
              localStorage.setItem('currentUser', JSON.stringify(this.userService.currentUser));

              this.reload_fun();

            },
            error => {
              return;
            });
      }
      else {
        return;
      }

    });

  }

  reload_fun(): any {

    this.displayName = this.userService.currentUser.username;
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


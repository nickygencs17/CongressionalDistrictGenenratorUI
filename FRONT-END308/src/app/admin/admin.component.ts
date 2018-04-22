import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import {User} from "../entities/user";
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: User[];
  constructor(private userService: UserService, private router: Router) { }



  ngOnInit() {
    console.log("before request");
    this.userService.getUsers()
    .subscribe((res_data) => {
          console.log(res_data);
        if (res_data.status === 200) {
          this.users = res_data.entity;
        }
        else if (res_data.status === 409) {
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

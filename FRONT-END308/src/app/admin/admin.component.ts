import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: any[];
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.users = this.userService.getUsers().subscribe((data) => {
        if (data.status === 200) {
          this.users = data.entity;
        }
        else if (data.status === 409) {
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

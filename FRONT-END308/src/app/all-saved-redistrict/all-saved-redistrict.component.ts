import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {PostService} from "../services/post.service";

@Component({
  selector: 'app-all-saved-redistrict',
  templateUrl: './all-saved-redistrict.component.html',
  styleUrls: ['./all-saved-redistrict.component.css']
})
export class AllSavedRedistrictComponent implements OnInit {

  savedRedistrictsList: any[];
  currentUser: string;

  constructor(private postService: PostService, private router: Router, private userService: UserService) {
  }
  ngOnInit() {

    this.currentUser = localStorage.getItem('currentUser');
    if (this.currentUser) {
      let userJson = JSON.parse(this.currentUser);
      this.currentUser = userJson.username;
    }
    else {
      alert("Please login");
      this.router.navigate(['']);
    }
    this.userService.getSavedRedistrictsList(this.currentUser).subscribe((response) => {
        if (response.status === 200) {
          this.savedRedistrictsList = response.entity.Redistricts;
        }
        else if (response.status === 409) {
          this.router.navigate(['']);
        }
      }
      ,
      error => {
        alert('saved redistrict error');
      });
  }

  deleteRedistrict(id: string) {
    this.userService.deleteRedistrict(id).subscribe((response) => {
        if (response.status === 200) {
          location.reload();
        }
        else if (response.status === 409) {
          this.router.navigate(['']);
        }
      }
      ,
      error => {
        alert('Delete redistrict error');
      });
  }
}

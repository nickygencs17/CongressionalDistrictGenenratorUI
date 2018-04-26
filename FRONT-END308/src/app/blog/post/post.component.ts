import {Component, OnInit} from '@angular/core';
import {PostService} from '../../services/post.service';
import {Router} from '@angular/router';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts: any[];
  selectedPost: any;
  isAdmin: boolean;
  currentUser: any;

  constructor(private postService: PostService, private router: Router, private userService:UserService) {

  }

  ngOnInit() {

    this.currentUser = localStorage.getItem('currentUser');
    if (this.currentUser) {
      let userJson = JSON.parse(this.currentUser);
      console.log(userJson);
      if (userJson.role === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    }
    else {
      this.isAdmin = false;
    }



    this.postService.getPosts().subscribe((response) => {
        if (response.status === 200) {
          this.posts = response.entity;
        }
        else if (response.status === 409) {
          this.router.navigate(['']);
        }
      }
      ,
      error => {
        alert('Post Service error');
      });
  }

}

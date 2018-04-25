import {Component, OnInit} from '@angular/core';
import {PostService} from '../../services/post.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts: any[];
  selectedPost: any;

  constructor(private postService: PostService, private router: Router) {
  }

  ngOnInit() {
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

import { Component, OnInit } from '@angular/core';
import { Post } from '../../entitys/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts: Post[];
  selectedPost: Post;
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.posts = this.postService.getPosts();
  }


  onSelect(post: Post) {
    this.selectedPost = post;
  }

}

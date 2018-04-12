import { Injectable } from '@angular/core';
import {  Post } from '../entities/post';
import { POSTS } from '../entities/posts';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class PostService {

  hostname = 'localhost:8080';
  resJson: any;
  constructor(private router: Router, private http: HttpClient) { }

  getPosts(): any {
    this.http.get('http://' + this.hostname + '/post/all')
      .subscribe((data) => {
          this.resJson = data;
          console.log(this.resJson.status);
          if (this.resJson.status === 201) {
            return this.resJson.entity;
          }
          else if (this.resJson.status === 409) {
            this.router.navigate(['']);
          }

        },
        error => {
          console.log(error);
        });
  }

  getPost(id: number): Post {
    return POSTS.filter((post) => (post.id === id))[0];
  }
  addPost(post: Post): void {
    POSTS.push(post);
  }

}

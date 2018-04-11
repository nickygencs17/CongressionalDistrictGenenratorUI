import { Injectable } from '@angular/core';
import {  Post } from '../entities/post';
import { POSTS } from '../entities/posts';

@Injectable()
export class PostService {

  constructor() { }

  getPosts(): Post[] {
    return POSTS;
  }

  getPost(id: number): Post {
    return POSTS.filter((post) => (post.id === id))[0];
  }
  addPost(post: Post): void {
    POSTS.push(post);
  }

}

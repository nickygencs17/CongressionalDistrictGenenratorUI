import {Injectable} from '@angular/core';
import {Post} from '../entities/post';
import {POSTS} from '../entities/posts';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PostService {

  hostname = 'localhost:8080';
  resJson: any;

  constructor(private router: Router, private http: HttpClient) {
  }

  getPosts(): any {
    return this.http.get('http://' + this.hostname + '/post/all');
  }

  getPost(id: number): any {
    return this.http.get('http://' + this.hostname + '/post/id/' + id);
  }

  addPost(post: Post): void {
    //POSTS.push(post);
    console.log(post);
  }

}

import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PostService} from '../../services/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {HttpClient, HttpHeaders} from "@angular/common/http"
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.css']
})
export class PostdetailComponent implements OnInit {

  post: any;
  comments: any[];
  addComment = false;
  hostname = 'localhost:8080';
  resJson: any;
  currentUser: any;
  post_id: number;

  constructor(private postservice: PostService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router,
              private datePipe: DatePipe,
              private http: HttpClient,) {
  }

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  ngOnInit() {
    this.scrollToBottom();
    let id = +this.route.snapshot.params['id'];
    this.post_id = id;
    this.post = this.postservice.getPost(id).subscribe((response) => {
        if (response.status === 200) {
          this.post = response.entity.POST;
          this.comments = response.entity.COMMENTS;
          console.log(response.entity);
        }
        else if (response.status === 409) {
          this.router.navigate(['']);
        }
      }
      ,
      error => {
        alert('Post Service error');
      });
    ;
  }

  goBack(): void {
    this.location.back();
  }

  addCommentFun(){

    this.addComment = !this.addComment;
    console.log(this.addComment);
    this.scrollToBottom();

  }

  save(comment_text) {


    console.log("here");

    this.currentUser = localStorage.getItem('currentUser');
    console.log(this.currentUser);
    let userJson = JSON.parse(this.currentUser);

    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(userJson.username + ':' + userJson.password));

    var date = new Date();
    let new_comment_res = {
      author: userJson.username,
      comment_text: comment_text,
      comment_time_date: this.datePipe.transform(date,"medium").toString(),
      post_id: this.post_id
    }

    console.log(new_comment_res);

    this.http.post<any>('http://' + this.hostname + '/post/comment', new_comment_res, {headers: headers})
      .subscribe((data) => {
          this.resJson = data;
          console.log(this.resJson);
          if (this.resJson.status === 201) {
            alert('CREATED');
            location.reload();

          }
        },
        error => {
          alert(error);
        });
  }


  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }
}
/*
{
  "author": "string",
  "comment_id": 0,
  "comment_text": "string",
  "comment_time_date": "string",
  "post_id": "string"
}
 */

import {Component, Injectable, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Location} from '@angular/common';
import {Post} from '../../entities/post';
import {PostService} from '../../services/post.service';
import { DatePipe } from '@angular/common';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {

  post = new Post();
  hostname = 'localhost:8080';
  resJson: any;
  currentUser: any;

  constructor(private http: HttpClient,
              public location: Location,
              public router: Router,
              private datePipe: DatePipe) {
  }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

  onNoClick(): void {

  }

  addpost(new_post) {
    console.log(new_post);
    var date = new Date();
    let new_post_res = {
      author: new_post.author,
      image_url: new_post.image,
      post_text: new_post.description,
      time_date: this.datePipe.transform(date,"medium").toString(),
      title: new_post.title
    }
    console.log(new_post_res);

    console.log("here");

    this.currentUser = localStorage.getItem('currentUser');
    console.log(this.currentUser);
    let userJson = JSON.parse(this.currentUser);

    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(userJson.username + ':' + userJson.password));


    this.http.post<any>('http://' + this.hostname + '/post', new_post_res, {headers: headers})
      .subscribe((data) => {
          this.resJson = data;
          console.log(this.resJson);
          if (this.resJson.status === 201) {
            alert('CREATED');
            this.location.back();

          }
        },
        error => {
          alert(error);
        });
  }
}


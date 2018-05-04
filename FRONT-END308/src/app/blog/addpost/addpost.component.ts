import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DatePipe, Location} from '@angular/common';
import {Post} from '../../entities/post';
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
              private datePipe: DatePipe,
              private userService: UserService) {
  }

  ngOnInit() {

    if (!this.userService.isLoggedIn()) {
      alert("Please login");
      this.router.navigate(['']);
    }
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (this.currentUser.role === 'ROLE_USER') {
      this.router.navigate(['']);
    }

  }

  goBack(): void {
    this.location.back();
  }

  onNoClick(): void {

  }

  addpost(new_post) {
    var date = new Date();
    this.currentUser = localStorage.getItem('currentUser');
    let userJson = JSON.parse(this.currentUser);
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(userJson.username + ':' + userJson.password));
    let new_post_res = {
      author: userJson.username,
      image_url: new_post.image,
      post_text: new_post.description,
      time_date: this.datePipe.transform(date, "medium").toString(),
      title: new_post.title
    };
    this.http.post<any>('http://' + this.hostname + '/post', new_post_res, {headers: headers})
      .subscribe((data) => {
          this.resJson = data;
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


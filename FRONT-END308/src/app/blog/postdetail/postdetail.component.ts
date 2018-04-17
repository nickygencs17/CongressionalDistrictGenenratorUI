import { Component, OnInit } from '@angular/core';
import { Post } from "../../entities/post";
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.css']
})
export class PostdetailComponent implements OnInit {

  post: any;
  comments: any[];

  constructor(private postservice: PostService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router) { }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
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
      });;
  }

  goBack(): void {
    this.location.back();
  }

}

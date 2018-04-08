import { Component, OnInit } from '@angular/core';
import { Post } from "../../entitys/post";
import { PostService } from '../../services/post.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.css']
})
export class PostdetailComponent implements OnInit {

  post: Post;

  constructor(private postservice: PostService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    this.post = this.postservice.getPost(id);
  }

  goBack(): void {
    this.location.back();
  }

}

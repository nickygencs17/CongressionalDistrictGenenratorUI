import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Router} from "@angular/router";
import {FormControl, Validators} from "@angular/forms";
import { Location } from '@angular/common';
import { Post } from '../../entities/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {

  post = new Post();
  constructor(public location: Location,
              public router: Router,
              public postservice: PostService) { }
  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

  onNoClick(): void {

  }
  addpost() {

  }
}

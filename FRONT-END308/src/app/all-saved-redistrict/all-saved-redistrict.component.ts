import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {PostService} from "../services/post.service";
import {StateService} from "../services/state.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-all-saved-redistrict',
  templateUrl: './all-saved-redistrict.component.html',
  styleUrls: ['./all-saved-redistrict.component.css']
})
export class AllSavedRedistrictComponent implements OnInit {

  savedRedistrictsList: any[];
  currentUser: string;
  response: any;
  loading = false;
  message = "Loading Algo...";
  atleastOne :boolean;

  constructor(
    private http: HttpClient,
    private postService: PostService,
    private router: Router,
    private userService: UserService,
    private stateService:StateService) {
  }
  ngOnInit() {
    this.atleastOne = true;
    this.currentUser = localStorage.getItem('currentUser');
    if (this.currentUser) {
      let userJson = JSON.parse(this.currentUser);
      this.currentUser = userJson.username;
    }
    else {
      alert("Please login");
      this.router.navigate(['']);
    }
    this.userService.getSavedRedistrictsList(this.currentUser).subscribe((response) => {
        if (response.status === 200) {
          this.savedRedistrictsList = response.entity.Redistricts;
          if(this.savedRedistrictsList.length == 0) {
            this.atleastOne = false;
          }
        }
        else if (response.status === 409) {
          this.router.navigate(['']);
        }
      }
      ,
      error => {
        alert('saved redistrict error');
      });
  }

  deleteRedistrict(id: string) {
    this.userService.deleteRedistrict(id).subscribe((response) => {
        if (response.status === 200) {
          location.reload();
        }
        else if (response.status === 409) {
          this.router.navigate(['']);
        }
      }
      ,
      error => {
        alert('Delete redistrict error');
      });
  }

  loadRedistrict(id: string, state_id:string) {
    console.log(id);
    this.stateService.algo_state = state_id;
    this.stateService.algo_id = id;
    console.log(this.stateService.algo_id);

    this.loading = true;
    this.stateService.getRedistrict(this.stateService.algo_id).subscribe((response) => {
        this.response = response;
        if (this.response.status === 200) {
          this.stateService.redistrictAlgoObj = this.response.entity;
          console.log("where here");
          console.log(this.stateService.redistrictAlgoObj);
          //not yet but foward to redistrict;
          this.router.navigate(['redistrict']);
        }
        else {
          alert("what is this brah?" + this.response.status);
        }
      }
      ,
      error => {
        alert('saved redistrict error');
      });
  }
}

import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    if(!this.userService.isLoggedIn()) {
      alert("Please login");
      this.router.navigate(['']);

    }
  }

}

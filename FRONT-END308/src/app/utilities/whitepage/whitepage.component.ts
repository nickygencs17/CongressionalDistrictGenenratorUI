import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router"
import {HttpClient} from "@angular/common/http";
import {StateIdService} from "../../state-id.service";
import {StateService} from "../../state.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-whitepage',
  templateUrl: './whitepage.component.html',
  styleUrls: ['./whitepage.component.css']
})
export class WhitepageComponent implements OnInit {

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private location: Location,
              public router: Router) { }


  ngOnInit() {
    this.router.navigate(['/state/' + this.route.snapshot.params['id']]);
  }

}

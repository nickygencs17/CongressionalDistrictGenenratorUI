import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from "../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { map } from "rxjs/operators/map";
import { startWith } from "rxjs/operators/startWith";
import { merge } from "rxjs/observable/merge";
import { of as observableOf } from "rxjs/observable/of";
import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators/catchError";
import { switchMap } from "rxjs/operators/switchMap";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Location } from "@angular/common";

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  displayedColumns = ['time_date', 'log_details'];
  exampleDatabase: ExampleHttpDao | null;
  dataSource = new MatTableDataSource();

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  res: any;
  currentUser: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router,
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
    else {
      this.exampleDatabase = new ExampleHttpDao(this.http, this.userService);
    }


    // If the user changes the sort order, reset back to the first page.

    merge(this.sort.sortChange)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active, this.sort.direction);
        }),
        map(data => {
          this.res = data;
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = this.res.entity.length;

          return this.res.entity;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource.data = data);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}

export interface GerymanderingApi {
  items: Log [];
  total_count: number;
}

export interface Log {
  time_date: string,
  log_id: number,
  log_details: string;

}


export class ExampleHttpDao {

  id: string;

  constructor(private http: HttpClient, private userService: UserService) {
  }

  getRepoIssues(sort: string, full_name: string): Observable<GerymanderingApi> {

    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(this.userService.currentUser.username + ':' + this.userService.currentUser.password));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');


    const requestUrl = 'http://localhost:8080/log/all';

    return this.http.get<GerymanderingApi>(requestUrl, {headers: headers});
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators/map";
import {startWith} from "rxjs/operators/startWith";
import {merge} from "rxjs/observable/merge";
import {of as observableOf} from "rxjs/observable/of";
import {Observable} from "rxjs/Observable";
import {catchError} from "rxjs/operators/catchError";
import {switchMap} from "rxjs/operators/switchMap";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-presidentelectiontable',
  templateUrl: './presidentelectiontable.component.html',
  styleUrls: ['./presidentelectiontable.component.css']
})
export class PresidentelectiontableComponent implements OnInit {
  displayedColumns = ['election_year', 'pres_name','vpres_name', 'party', 'votes_for','vote_percent','ec_vote','is_winner'];
  exampleDatabase: ExampleHttpDao | null;
  dataSource = new MatTableDataSource();

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  res: any;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.exampleDatabase = new ExampleHttpDao(this.http, this.route);

    console.log(this.exampleDatabase)


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
          console.log(this.res.entity.PRESIDENT_ELECTION_INFO);
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = this.res.entity.PRESIDENT_ELECTION_INFO.length;

          return this.res.entity.PRESIDENT_ELECTION_INFO;
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
  items: PresidentElection [];
  total_count: number;
}

export interface PresidentElection {
  id: number,
  election_year: number,
  party: string,
  pres_name: string,
  vpres_name: string,
  votes_for: number,
  vote_percent: number,
  ec_vote: number,
  state_id: string,
  is_winner: boolean

}


export class ExampleHttpDao {

  id: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

  getRepoIssues(sort: string, full_name: string): Observable<GerymanderingApi> {
    this.id = this.route.snapshot.params['id'];
    const requestUrl = 'http://localhost:8080/state/electionInfo/' + this.id;

    return this.http.get<GerymanderingApi>(requestUrl);
  }
}

/*
      {
        "id": 3,
        "election_year": 2016,
        "party": "democratic",
        "pres_name": "hillary clinton",
        "vpres_name": "tim kaine",
        "votes_for": 188794,
        "vote_percent": 26.43,
        "ec_vote": 0,
        "state_id": "wv",
        "is_winner": false
      }
 */

import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {map} from "rxjs/operators/map";
import {startWith} from "rxjs/operators/startWith";
import {merge} from "rxjs/observable/merge";
import {of as observableOf} from "rxjs/observable/of";
import {Observable} from "rxjs/Observable";
import {catchError} from "rxjs/operators/catchError";
import {switchMap} from "rxjs/operators/switchMap";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-congresselectiontable',
  templateUrl: './congresselectiontable.component.html',
  styleUrls: ['./congresselectiontable.component.css']
})
export class CongresselectiontableComponent implements OnInit {



  displayedColumns = ['election_year', 'candidate_name','party', 'percent_of_votes','congress_id'];
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
          console.log(this.res.entity.CONGRESS_ELECTION_INFO);
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = this.res.entity.CONGRESS_ELECTION_INFO.length;

          return this.res.entity.CONGRESS_ELECTION_INFO;
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
  items: CongressElection [];
  total_count: number;
}

export interface CongressElection {
  id: number,
  is_winner: boolean,
  percent_of_votes: number,
  party: string,
  candidate_name: string,
  congress_id: string,
  state_id: string
  election_year: number


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
        "id": 410,
        "is_winner": true,
        "percent_of_votes": 70.3,
        "party": "democratic",
        "candidate_name": "Alan Mollohan",
        "congress_id": "wv_cd_1",
        "state_id": "wv",
        "election_year": 1994
      }
 */

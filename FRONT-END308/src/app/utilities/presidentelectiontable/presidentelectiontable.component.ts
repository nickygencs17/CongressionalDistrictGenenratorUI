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
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-presidentelectiontable',
  templateUrl: './presidentelectiontable.component.html',
  styleUrls: ['./presidentelectiontable.component.css']
})
export class PresidentelectiontableComponent implements OnInit {
  displayedColumns = ['election_year', 'pres_name', 'vpres_name', 'party', 'votes_for', 'vote_percent', 'ec_vote', 'is_winner'];
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
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = this.res.entity.PRESIDENT_ELECTION_INFO.length;

          console.log(this.res.entity.PRESIDENT_ELECTION_INFO);
          console.log('here');
          console.log(this.resultsLength);
          for (let i = 0; i < this.resultsLength; i++) {
            // console.log('here');
            // console.log(this.res.entity.PRESIDENT_ELECTION_INFO[i].party);

            if (this.res.entity.PRESIDENT_ELECTION_INFO[i].party == 'Republican'){
              this.res.entity.PRESIDENT_ELECTION_INFO[i].color = 'red';
            }
            else if (this.res.entity.PRESIDENT_ELECTION_INFO[i].party == 'Democratic'){
              this.res.entity.PRESIDENT_ELECTION_INFO[i].color = 'blue';
            }
            else{
              this.res.entity.PRESIDENT_ELECTION_INFO[i].color = 'black';
            }


          }
          console.log('here1');
          console.log(this.res.entity.PRESIDENT_ELECTION_INFO);

          return this.res.entity.PRESIDENT_ELECTION_INFO;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource.data = data);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
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
  is_winner: boolean,
  color: string

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

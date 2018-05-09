import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns = ['name', 'type', 'party', 'created'];
  exampleDatabase: ExampleHttpDao | null;
  dataSource = new MatTableDataSource();

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  res: any;


  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;

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
          this.resultsLength = this.res.entity.CURRENT_OFFICIALS.length;

          for (let i = 0; i < this.resultsLength; i++) {
            // console.log('here');
            // console.log(this.res.entity.PRESIDENT_ELECTION_INFO[i].party);

            if (this.res.entity.CURRENT_OFFICIALS[i].party == 'Republican'){
              this.res.entity.CURRENT_OFFICIALS[i].color = 'red';
            }
            else if (this.res.entity.CURRENT_OFFICIALS[i].party == 'Democratic'){
              this.res.entity.CURRENT_OFFICIALS[i].color = 'blue';
            }
            else if (this.res.entity.CURRENT_OFFICIALS[i].party == 'Libertarian'){
              this.res.entity.CURRENT_OFFICIALS[i].color = 'yellow';
            }
            else if (this.res.entity.CURRENT_OFFICIALS[i].party == 'Green'){
              this.res.entity.CURRENT_OFFICIALS[i].color = 'green';
            }
            else{
              this.res.entity.CURRENT_OFFICIALS[i].color = 'black';
            }


          }

          return this.res.entity.CURRENT_OFFICIALS;
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
  items: Officials [];
  total_count: number;
}

export interface Officials {
  id: number,
  state_id: string,
  type_office: string,
  full_name: string,
  party: string,
  district_id: string;

}


export class ExampleHttpDao {

  id: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

  getRepoIssues(sort: string, full_name: string): Observable<GerymanderingApi> {
    this.id = this.route.snapshot.params['id'];
    const requestUrl = 'http://localhost:8080/state/sateInfo/' + this.id;

    return this.http.get<GerymanderingApi>(requestUrl);
  }
}

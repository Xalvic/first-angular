// import { ProductService } from '../product.service';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

/**
 * @title Table retrieving data through HTTP
 */
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'price', 'unit'];
  exampleDatabase: ProductService | null;
  data: GithubIssue[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _httpClient: HttpClient) {}

  ngAfterViewInit() {
    this.exampleDatabase = new ProductService(this._httpClient);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(this.paginator.pageIndex);
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.count;

          return data.results;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      )
      .subscribe((data) => (this.data = data));
  }
}

export interface GithubApi {
  results: GithubIssue[];
  count: number;
}

export interface GithubIssue {
  name: string;
  price: string;
  unit: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ProductService {
  constructor(private _httpClient: HttpClient) {}

  getRepoIssues(
    // sort: string,
    // order: string,
    page: number
  ): Observable<GithubApi> {
    const href =
      'http://ec2-13-59-62-104.us-east-2.compute.amazonaws.com:8090/api/v1/fish/';
    const requestUrl = `${href}?page=${page + 1}`;

    return this._httpClient.get<GithubApi>(requestUrl);
  }
}

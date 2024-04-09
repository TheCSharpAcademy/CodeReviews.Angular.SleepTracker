import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Sleep } from '../models/Sleep.model';
import { ISleep } from '../models/ISleep.model';

@Injectable({
  providedIn: 'root',
})
export class SleepService {
  private apiURL = 'https://localhost:7047/api/Sleep';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getRecordsWithoutFilters(): Observable<ISleep[]> {
    return this.httpClient
      .get<ISleep[]>(this.apiURL + '/GetSleepRecordsWithoutFilter')
      .pipe(
        catchError(
          this.handleError<ISleep[]>('GetSleepRecordsWithoutFilter', [])
        )
      );
  }

  deleteRecord(id: number): Observable<ISleep> {
    const url = `${this.apiURL}/DeleteSleepRecord/${id}`;
    return this.httpClient
      .delete<ISleep>(url, this.httpOptions)
      .pipe(catchError(this.handleError<ISleep>('deleteRecord')));
  }

  addRecord(sleep: Sleep): Observable<Sleep> {
    console.log(JSON.stringify(sleep, null, 2));
    return this.httpClient
      .post<Sleep>(
        this.apiURL + '/PostSleepRecord',
        JSON.stringify(sleep, null, 2),
        this.httpOptions
      )
      .pipe(catchError(this.handleError<Sleep>('addRecord')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}

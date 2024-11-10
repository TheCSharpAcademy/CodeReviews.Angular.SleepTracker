import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs';
import { SleepInterface } from '../models/sleep-interface';

@Injectable({
  providedIn: 'root',
})
export class SleepApiServiceService {
  private apiURL = 'https://localhost:7047/api/Sleep';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getRecordsWithoutFilters(): Observable<SleepInterface[]> {
    return this.httpClient
      .get<SleepInterface[]>(this.apiURL + '/GetSleepRecordsWithoutFilter')
      .pipe(
        catchError(
          this.handleError<SleepInterface[]>('GetSleepRecordsWithoutFilter', [])
        )
      );
  }

  deleteSleepRecord(id: number): Observable<SleepInterface> {
    const url = `${this.apiURL}/DeleteSleepRecord/${id}`;
    return this.httpClient
      .delete<SleepInterface>(url, this.httpOptions)
      .pipe(catchError(this.handleError<SleepInterface>('deleteRecord')));
  }

  addRecord(sleep: SleepInterface): Observable<SleepInterface> {
    return this.httpClient
      .post<SleepInterface>(
        this.apiURL + '/PostSleepRecord',
        JSON.stringify(sleep, null, 2),
        this.httpOptions
      )
      .pipe(catchError(this.handleError<SleepInterface>('addRecord')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}

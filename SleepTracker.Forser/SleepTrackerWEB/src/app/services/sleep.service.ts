import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Sleep } from '../models/Sleep.model';
import { ISleep } from '../models/ISleep.model';
import { SleepRecord } from '../sleep-record.modal';

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

  findRecord(id: number): Observable<SleepRecord> {
    const url = `${this.apiURL}/GetSleepRecord/${id}`;
    return this.httpClient
      .get<SleepRecord>(url)
      .pipe(catchError(this.handleError<SleepRecord>(`FindRecord id=${id}`)));
  }

  deleteRecord(id: number): Observable<ISleep> {
    const url = `${this.apiURL}/DeleteSleepRecord/${id}`;
    return this.httpClient
      .delete<ISleep>(url, this.httpOptions)
      .pipe(catchError(this.handleError<ISleep>('deleteRecord')));
  }

  updateRecord(id: number, sleep: SleepRecord): Observable<SleepRecord> {
    return this.httpClient
      .put<SleepRecord>(
        '${this.apiURL}',
        JSON.stringify('', null, 2),
        this.httpOptions
      )
      .pipe(catchError(this.handleError<SleepRecord>('editRecord')));
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

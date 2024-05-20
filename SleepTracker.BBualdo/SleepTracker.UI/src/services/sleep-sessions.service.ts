import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { SleepSession } from '../models/SleepSession';
import { url } from '../config/config';
import { SnackbarService } from './snackbar.service';
import { ErrorsService } from './errors.service';
import { SleepSessionAddDTO } from '../models/SleepSessionAddDTO';
import { SleepSessionUpdateDTO } from '../models/SleepSessionUpdateDTO';

@Injectable({
  providedIn: 'root',
})
export class SleepSessionsService {
  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService,
    private errorsService: ErrorsService,
  ) {}

  getSessions(): Observable<SleepSession[]> {
    return this.http
      .get<SleepSession[]>(url)
      .pipe(catchError(this.handleError.bind(this)));
  }

  addSession(session: SleepSessionAddDTO): Observable<SleepSessionAddDTO> {
    return this.http.post<SleepSessionAddDTO>(url, session).pipe(
      tap(() => this.snackbarService.snackbarLog('Session added.')),
      catchError(this.handleError.bind(this)),
    );
  }

  updateSession(
    session: SleepSessionUpdateDTO,
  ): Observable<SleepSessionUpdateDTO> {
    return this.http.put<SleepSessionUpdateDTO>(url + session.id, session).pipe(
      tap(() => this.snackbarService.snackbarLog('Session updated.')),
      catchError(this.handleError),
    );
  }

  deleteSession(session: SleepSession): Observable<SleepSession> {
    return this.http.delete<SleepSession>(url + session.id).pipe(
      tap(() => this.snackbarService.snackbarLog('Session deleted.')),
      catchError(this.handleError.bind(this)),
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      this.errorsService.openDialog();
      this.errorsService.add(`No connection. Try again later.`);
    }

    if (error.status === 500) {
      this.errorsService.openDialog();
      this.errorsService.add('Something bad happened. Try again later.');
    }

    return throwError(
      () => new Error('Something bad happened. ' + error.message),
    );
  }
}

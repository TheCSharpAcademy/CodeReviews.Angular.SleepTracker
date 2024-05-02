import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, asyncScheduler, catchError, map, scheduled, tap, throwError } from 'rxjs';
import { DateToDuration, SleepLog, SleepLogPageData } from '../models/sleep-logs';
import { query } from '@angular/animations';
import { NotificationsService } from './notifications.service';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SleepLogsService {

  private baseUrl = "/api/sleeplogs";

  constructor(
    private http: HttpClient,
    private notificationService: NotificationsService
  ) {}

  getAllLogs(startIndex: number = 0, date?: string) : Observable<SleepLogPageData | null> {
    
    let options = new HttpParams();
    
    options = date? options.set('date', date) : options;
    options = startIndex? options.set('startIndex', startIndex) : options;

    return this.http.get<SleepLogPageData | null>(`${this.baseUrl}/all`, {
      responseType: 'json',
      withCredentials: true,
      params: options
    }).pipe(
      tap( {next: () => this.log(`Items fetched succesfully`, `success`)}),
      catchError(this.logError()),
      map( (resp) => {
        if( resp != null) {
          return {
          sleepLogs : resp.sleepLogs.map( log => {
            log.duration = DateToDuration(log);
            log.startDate = formatDate(new Date(log.startDate!), 'yyyy-MM-ddTHH:mm', 'en');
            log.endDate = formatDate(new Date(log.endDate!), 'yyyy-MM-ddTHH:mm', 'en');
            return log; }),
          currentPage : resp.currentPage,
          pageSize: resp.pageSize,
          totalPages: resp.totalPages,
          totalRecords: resp.totalRecords}
        }
        return null;  
      }),
    );
  }

  getLogs(startIndex: number = 0, date?: string) : Observable<SleepLogPageData | null> {
    
    let options = new HttpParams();
    
    options = date? options.set('date', date) : options;
    options = startIndex? options.set('startIndex', startIndex) : options;

    return this.http.get<SleepLogPageData | null>(`${this.baseUrl}`, {
      responseType: 'json',
      withCredentials: true,
      params: options
    }).pipe(
      tap( {next: () => this.log(`Items fetched succesfully`, `success`)}),
      catchError(this.logError()),
      map( (resp) => { 
        if( resp != null) {
          return {
          sleepLogs : resp.sleepLogs.map( log => {
            log.duration = DateToDuration(log);
            log.startDate = formatDate(new Date(log.startDate!), 'yyyy-MM-ddTHH:mm', 'en');
            log.endDate = formatDate(new Date(log.endDate!), 'yyyy-MM-ddTHH:mm', 'en');
            return log; }),
          currentPage : resp.currentPage,
          pageSize: resp.pageSize,
          totalPages: resp.totalPages,
          totalRecords: resp.totalRecords}
        }
        return null;  
      }),
    );
  }

  getLog( id: number) : Observable<SleepLog | null> {
    return this.http.get<SleepLog | null>( `${this.baseUrl}/${id}`, {
      responseType: 'json',
      withCredentials: true
    }).pipe(
      tap( {next: () => this.log(`Item fetched succesfully`, 'success')}),
      catchError(this.logError()),
      map( log => {
        if(log != null){
          log.duration = DateToDuration(log);
          log.startDate = formatDate(new Date(log.startDate!), 'yyyy-MM-ddTHH:mm', 'en');
          log.endDate = formatDate(new Date(log.endDate!), 'yyyy-MM-ddTHH:mm', 'en');
          return log;
        }
        return null;
      })
    );
  }

  postLog( log: SleepLog, userdId: string = '') : Observable<SleepLog | null> {
    let options = new HttpParams();
    
    options = userdId? options.set('userId', userdId) : options;

    return this.http.post<SleepLog | null>(`${this.baseUrl}`, log, {
      responseType: 'json',
      withCredentials: true,
      params: options
    }).pipe(
      tap( {next: () => this.log(`Item created succesfully`, 'success')}),
      catchError( this.logError()),
      map( log => {
        if(log != null){
          log.duration = DateToDuration(log);
          log.startDate = formatDate(new Date(log.startDate!), 'yyyy-MM-ddTHH:mm', 'en');
          log.endDate = formatDate(new Date(log.endDate!), 'yyyy-MM-ddTHH:mm', 'en');
          return log;
        }
        return null;
      })
    );
  }

  putLog( log: SleepLog ) : Observable<SleepLog | null> {
    return this.http.put<SleepLog | null>( `${this.baseUrl}/${log.id}`, log, {
      responseType: 'json',
      withCredentials: true,
    }).pipe(
      tap( {next: () => this.log(`Item modified succesfully`, 'success')}),
      catchError( this.logError()),
    );
  }

  deleteLog( id: number ) : Observable<boolean> {
    return this.http.delete<boolean>( `${this.baseUrl}/${id}`, {
      observe: 'response',
      responseType: 'json',
      withCredentials: true
    }).pipe(
      tap( {next: () => this.log(`Item deleted succesfully`, 'success')}),
      catchError( this.logError() ),
      map( resp => {
        if( resp != null && resp.status == 200){
          return true
        }
        return false
      })
    );
  }

  private log(message: string, type: string) {
    this.notificationService.add( message, type);
  }

  private logError(){
    return (error: any): Observable<null> => {
      this.log(`Unable to complete operation, please try again later. Error code: ${error.status}`, 'error');
      return scheduled([null], asyncScheduler);
    };
  }
}

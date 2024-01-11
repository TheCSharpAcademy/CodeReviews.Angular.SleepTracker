import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { SleepRecord } from './sleep-table/sleep-record';
import { ISleepInput } from './ISleepInput';
import { ErrorHandlingService } from './error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class SleepRecordService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private apiUrl:string = 'https://localhost:7277/api/SleepRecord'

 constructor(private http:HttpClient, private errorHandlerService: ErrorHandlingService) { }

 getSleepRecords(page: number, limit:number, month?:number) : Observable<SleepRecord[]>{
  let url = `${this.apiUrl}/${limit}/${page}`
  if(month !== undefined){
    url += `?month=${month}`;
  }
  return this.http.get<SleepRecord[]>(url).pipe(
    map((data: SleepRecord[]) => {
      data.map((record) => {
        record.sleepRecordStart = new Date(record.sleepRecordStart);
        return record;
      })
      return data;
    })
  );
 }

 getSleepRecordCount(month?:number) : Observable<number>{
  let url = `${this.apiUrl}/getCount`;
  if(month !== undefined){
    url += `?month=${month}`;
  }
  return this.http.get<number>(url).pipe(
    map((data: any) => {
      return parseInt(data);
    })
  );
 }

 getSleepRecordMonths() : Observable<number[]> {
  const url = `${this.apiUrl}/getMonths`;
  return this.http.get<number[]>(url).pipe(
    map((data:any[]) => {
      map((record:any) => {
        return Number.parseInt(record)
      })
      return data;
    })
  )
 }

 addSleepRecord(input: ISleepInput) : Observable<SleepRecord>{
  return this.http.post<SleepRecord>(this.apiUrl, input, this.httpOptions).pipe(
    catchError(this.handleError)
  );
 }

 private handleError(error: HttpErrorResponse) {
  console.error(error.error);
  
  return throwError(() => new Error('Something bad happened; please try again later.'));
 }
}

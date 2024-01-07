import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SleepRecord } from './sleep-table/sleep-record';

@Injectable({
  providedIn: 'root'
})
export class SleepRecordService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private apiUrl:string = 'https://localhost:7277/api/SleepRecord'

 constructor(private http:HttpClient) { }

 getSleepRecords(page: number, limit:number) : Observable<SleepRecord[]>{
  const url = `${this.apiUrl}/${limit}/${page}`
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

 getSleepRecordCount() : Observable<number>{
  const url = `${this.apiUrl}/getCount`;
  return this.http.get<number>(url).pipe(
    map((data: any) => {
      return parseInt(data);
    })
  );
 }
}

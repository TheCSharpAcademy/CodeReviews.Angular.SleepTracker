import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { SleepRecord } from "./sleep-record.model";

@Injectable({
  providedIn: 'root'
})
export class SleepTrackerDbService {
  private baseUrl = 'http://localhost:5216/api/Sleep';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get(this.baseUrl);
  }

  addSleep(sleepRecord: SleepRecord){
    return this.http.post<SleepRecord>(this.baseUrl, sleepRecord, this.httpOptions)
  }

  deleteSleep(id: Number) {
    const deleteUrl = `${this.baseUrl}/${id}`;
    return this.http.delete<SleepRecord>(deleteUrl, this.httpOptions);

  }
}

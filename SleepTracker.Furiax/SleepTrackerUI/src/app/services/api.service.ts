import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SleepRecord } from "../sleep-record";

@Injectable({
    providedIn: 'root'
})
export class ApiService{
  readonly apiUrl = 'https://localhost:7218/api/sleep';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    constructor(private http: HttpClient){}

    getSleeps(): Observable<SleepRecord[]>{
      return this.http.get<SleepRecord[]>(this.apiUrl);
    }

    getSleep(id: number): Observable<SleepRecord>{
      const url = `${this.apiUrl}/${id}`;
      return this.http.get<SleepRecord>(url);
    }

    updateSleep(sleep: SleepRecord): Observable<any>{
      const url = `${this.apiUrl}/${sleep.id}`;
      return this.http.put(url, sleep, this.httpOptions);
    }

    addSleep(sleep: SleepRecord): Observable<SleepRecord>{
      return this.http.post<SleepRecord>(this.apiUrl, sleep, this.httpOptions);
    }

    deleteSleep(id: number): Observable<SleepRecord>{
      const url = `${this.apiUrl}/${id}`;
      return this.http.delete<SleepRecord>(url, this.httpOptions);
    }
}

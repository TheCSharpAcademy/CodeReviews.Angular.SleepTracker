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

}

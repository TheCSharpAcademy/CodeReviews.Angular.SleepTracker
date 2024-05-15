import { Injectable } from '@angular/core';
import { Observable, of, map, catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Sleep } from './sleep.model';

@Injectable({
  providedIn: 'root'
})
export class SleeptrackerService {
  private apiUrl: string = 'https://localhost:7240/api/sleeps/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getSleepRecords(): Observable<Sleep[]>{
    return this.http.get<Sleep[]>(this.apiUrl);
  }
}

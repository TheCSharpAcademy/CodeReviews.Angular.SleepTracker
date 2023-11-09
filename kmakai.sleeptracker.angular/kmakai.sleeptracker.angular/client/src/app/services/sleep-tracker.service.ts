import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Record } from '../models/Record';

@Injectable({
  providedIn: 'root',
})
export class SleepTrackerService {
  apiURL = 'https://localhost:7031/api/sleeprecords';
  httpHeaders = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  constructor(private http: HttpClient) {}

  getRecords() {
    return this.http.get<Record[]>(this.apiURL);
  }

  getRecord(id: number) {
    return this.http.get<Record>(`${this.apiURL}/${id}`);
  }

  addRecord(record: Record) {
    return this.http.post<Record>(this.apiURL, record, this.httpHeaders);
  }

  deleteRecord(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}

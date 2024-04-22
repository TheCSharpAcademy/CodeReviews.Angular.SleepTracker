import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SleepHttpService {

  private apiUrl = "https://localhost:7239"
  recordData$ = new Subject();

  getApiRoute() {
    return this.apiUrl;
  }

  constructor(private http: HttpClient) { }

  getRecords(model: string, id?: number): Observable<any> {
    if (id) {
      return this.http.get<any>(`${this.apiUrl}/${model}/${id}`);
    }
    return this.http.get<any>(`${this.apiUrl}/${model}`);
  }

  postItem(item: any, model: string): Observable<any> {
   return this.http.post(`${this.apiUrl}/${model}`, item);
      
  }

  updateItem(item: any, model: string) {

    this.http.put(`${this.apiUrl}/${model}/${item.id}`, item)
      .subscribe({
        next: (r) => console.log("Api sucess", r),
        error: (e) => console.error("Api error", e)
      })
  }

  deleteRow(id: number, model: string): Observable<any> {

   return this.http.delete(`${this.apiUrl}/${model}/${id}`);
      
  }
}

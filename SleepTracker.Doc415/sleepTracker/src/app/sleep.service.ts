import { inject, Injectable,signal } from '@angular/core';
import { type SleepData } from './sleepData.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SleepService {
  private httpClient=inject(HttpClient);
  private url="https://localhost:7157/api/SleepLog"
  sleepRecords=signal<SleepData[]>([]);
  totalRecords=signal<number>(0);
  

  getSleepRecords(pageNumber:number,itemsPerPage:number,date?:string){
    return this.httpClient.get<{logs:SleepData[],logsCount:number}>(`${this.url}?pageNumber=${pageNumber}&itemsPerPage=${itemsPerPage}&date=${date}`)
  }

  addSleepRecord(sleepData:SleepData){
    return this.httpClient.post<SleepData>(`${this.url}`,sleepData)
  }

  deleteSleepRecord(logId:string){ 
    return this.httpClient.delete<any>(`${this.url}/${logId}`)    
  }

  convertToSleepTimeView(time:number){
    let hours=(Math.floor(time/3600)).toString().padStart(2,'0')
    let minutes= (Math.floor((time % 3600) / 60)).toString().padStart(2,'0')
    let seconds= (Math.floor(time%60)).toString().padStart(2,'0')
    let result= `${hours}:${minutes}:${seconds}`
    return result
  }
}

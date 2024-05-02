import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { SleepLog } from '../models/sleep-logs';
import { Observable, interval, map, timer } from 'rxjs';
import { SleepLogsService } from './sleep-logs.service';

@Injectable({
  providedIn: 'root'
})
export class SleepLogSessionService implements OnDestroy{

  constructor(
    private sleepLogsService: SleepLogsService
  ) { }

  sleepLogSession? : SleepLog ;
  isRunning : Boolean = false;

  start(){
    if(!this.isRunning){
      this.sleepLogSession = {
        startDate : new Date(Date.now()).toISOString(),
        endDate : '',
        duration : '',
        comments : '',
        userName : '',
      };
      this.isRunning = true;
    }
  }

  getElapsedTime() : Observable<number> {
    return interval(1000);
  }

  stop() {
    if( this.isRunning = true && this.sleepLogSession != undefined){
      this.sleepLogSession.endDate = new Date(Date.now()).toISOString();
      this.isRunning = false;
    }
  }

  save() {
    if( this.sleepLogSession != undefined){
      console.log('saving')
      this.sleepLogsService.postLog(this.sleepLogSession).subscribe( res => {
        if(res != null){
          this.sleepLogSession = undefined;
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.stop();
    this.save();
  }
}

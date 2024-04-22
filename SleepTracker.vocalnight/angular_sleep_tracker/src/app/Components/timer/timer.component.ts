import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CdTimerComponent, CdTimerModule } from 'angular-cd-timer';
import { SleepModel } from '../../Model/SleepModel';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CdTimerModule, MatButtonModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent {

  @ViewChild('basicTimer') timerModule: CdTimerModule | undefined;
  @Output() newTimerRecord = new EventEmitter<SleepModel>();

  
  onTimerStop(timer: CdTimerComponent) {
    let currSeconds = timer.get().seconds;
    let startDate = new Date();
    let endDate = new Date();
    
    startDate.setSeconds(startDate.getSeconds() - (currSeconds));
    endDate.setSeconds(startDate.getSeconds() + (currSeconds));

    let timePassed = this.EditTimer(timer.get().hours.toString()) + ':' + this.EditTimer(timer.get().minutes.toString()) + ':' + this.EditTimer(timer.get().seconds.toString())

    let sleep = new SleepModel(0, startDate.getTime(), endDate.getTime(), timePassed)

    this.newTimerRecord.emit(sleep);

    timer.reset();
  }

  EditTimer(time: string) {
    console.log(time);
    if (time.length === 1) {
      return '0' + time;
    }
    return time;
  }
  
}

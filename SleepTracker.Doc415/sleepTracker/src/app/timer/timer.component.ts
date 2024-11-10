import { CommonModule, formatDate } from '@angular/common';
import { Component,inject,output } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { SleepService } from '../sleep.service';
import { CardComponent } from "../shared/card/card.component";
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [MatButtonModule, CommonModule, CardComponent],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent {
  private _snackBar = inject(MatSnackBar);
  onWakeUp=output<number>();
  counter=0;
  private interval=1000;
  timerId:any;
  isSleeping=false;
  
  constructor(public sleepService:SleepService){}

  startTimer(){
    if(!this.isSleeping){
      this.isSleeping=true;
      this.timerId=setInterval(() => this.increaseCounter(), this.interval);
    }
  }

  stopTimer(){
    if(this.timerId){
      clearInterval(this.timerId)
      this.isSleeping=false;
    }
  }

  wakeUp(){
    clearInterval(this.timerId)
    this.sleepService.addSleepRecord({id:``, date:formatDate(Date(),'yyyy-MM-dd','en'), sleepTime:this.counter}).subscribe({
      next: (resData) => {
        this.sleepService.sleepRecords.set([
          resData,
          ...this.sleepService.sleepRecords(),
        ]);
        this.sleepService.totalRecords.set(
          this.sleepService.totalRecords() + 1
        );
        this._snackBar.open('Sleep logged!', 'Dismiss', {
          duration: 3000
        });
      },
      error: (err) => {this._snackBar.open(`Failed!`, 'Dismiss', {
        duration: 3000
      });},
    });
    this.isSleeping=false;
    this.counter=0;
  }

  increaseCounter(){
    this.counter++;
  }

  get minutes() {
    return Math.floor(this.counter/60)%60
  }

  get hours() {
    return Math.floor(this.counter/360)%360
  }
}

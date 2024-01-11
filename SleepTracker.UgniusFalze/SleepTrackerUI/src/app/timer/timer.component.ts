import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Observable, Subscription, timer } from 'rxjs';
import { AddTimerResultComponent } from '../add-timer-result/add-timer-result.component';
import { SleepRecordService } from '../sleep-record-service.service';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, NgIf],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent {

  private initialDate?: Date;
  private timer?:Subscription;
  private seconds:number;
  public convertedSeconds:string = '00:00:00';
  public timerRunning: boolean = false;
  public saveable: boolean = false;
  constructor(public dialog: MatDialog, public service: SleepRecordService){
    this.seconds = 0;
  }

  private convertToString(seconds: number){
    return new Date(seconds * 1000).toISOString().substring(11, 19);
  }


  timerControl(){
    this.saveable = true;
    if(this.timerRunning){
      this.timer?.unsubscribe();
      this.timerRunning = false;
    }else{
      this.timer = timer(0, 1000).subscribe(n => {
        this.seconds += 1;
        this.convertedSeconds = this.convertToString(this.seconds);
      });
      this.timerRunning = true;
      this.initialDate = new Date();
    }
  }

  timerSave(){
    if(this.timerRunning){
      this.timer?.unsubscribe();
    }
    this.timerRunning = false;

    const dialogRef = this.dialog.open(AddTimerResultComponent, {
      width:'500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result === "save"){
        const recordStart = new Date(this.initialDate!);
        this.initialDate?.setSeconds(this.initialDate.getSeconds() + this.seconds);
        const recordEnd = new Date(this.initialDate!);
        this.service.addSleepRecord({RecordStart: recordStart, RecordEnd: recordEnd}).subscribe();
        this.seconds = 0;
        this.convertedSeconds = this.convertToString(this.seconds);
        this.saveable = false;
      }
    })
  }


}

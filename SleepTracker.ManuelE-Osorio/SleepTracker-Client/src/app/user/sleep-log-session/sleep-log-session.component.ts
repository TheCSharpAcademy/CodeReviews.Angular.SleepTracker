import { Component, OnDestroy, OnInit } from '@angular/core';
import { SleepLogSessionService } from '../../services/sleep-log-session.service';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { SleepLog } from '../../models/sleep-logs';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-sleep-log-session',
  standalone: true,
  imports: [
    NgIf, 
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule
  ],
  templateUrl: './sleep-log-session.component.html',
  styleUrl: './sleep-log-session.component.css'
})
export class SleepLogSessionComponent implements OnInit, OnDestroy{

  constructor(
    private sleepLogSessionService : SleepLogSessionService 
  ) {}

  initialTime: number = 0;
  elapsedTime: string = "";
  timerSubscription?: Subscription;
  isRunning = false;
  isSaveable = false;


  start() {
    if(!this.isRunning){
      this.sleepLogSessionService.start();
      this.timerSubscription = this.sleepLogSessionService.getElapsedTime().subscribe( res => 
        this.elapsedTime = this.duration(this.initialTime + res));
      this.isRunning = true;
    }
  }

  stop () {
    if(this.isRunning == true && this.timerSubscription != undefined){
      this.sleepLogSessionService.stop();
      this.timerSubscription.unsubscribe()
      this.isRunning = false;
      this.isSaveable = true;
    }
  }

  save () {
    if( this.isSaveable){
      this.sleepLogSessionService.save();
      this.isSaveable = false;
    }
  }

  private duration(seconds: number) : string {
    let hours = 0;
    let minutes = 0;
    hours = Math.floor(seconds/(60*60))
    minutes = Math.floor(seconds/(60))-hours*60;
    seconds = seconds - hours*60*60 - minutes *60;
    return `${hours.toString().padStart(2,"0")}:${minutes.toString().padStart(2,"0")}.${seconds}`;
  }

  ngOnInit(): void {
    if(this.sleepLogSessionService.isRunning){
      this.initialTime = Math.floor((Date.now() - new Date(this.sleepLogSessionService.sleepLogSession!.startDate!).valueOf())/1000);
      this.start();
    }
  }

  ngOnDestroy(): void {
    this.timerSubscription?.unsubscribe();
  }
}

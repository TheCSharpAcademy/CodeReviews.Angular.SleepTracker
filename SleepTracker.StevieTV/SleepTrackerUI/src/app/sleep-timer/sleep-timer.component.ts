import { DatePipe } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { Router } from "@angular/router";
import { SleepTrackerDbService } from "../sleep-tracker-db.service";
import { SleepRecord } from "../sleep-record.model";

@Component({
  selector: 'app-sleep-timer',
  standalone: true,
  imports: [
    DatePipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  templateUrl: './sleep-timer.component.html',
  styleUrl: './sleep-timer.component.css'
})
export class SleepTimerComponent implements OnInit {
  timerStartedAt: number = 0;
  timer: number = 0;
  timerRunning!: boolean;
  timerRef: any;
  sleepRecord: SleepRecord = {
    id: 0,
    startTime: new Date(Date.now()),
    endTime: new Date(Date.now())
  }

  constructor(private sleepService: SleepTrackerDbService, private router: Router) {
  }

  ngOnInit(): void {
    this.timerRunning = false
  }

  startTimer() {
    this.timerRunning = true;
    if (this.timer == 0) {
      this.sleepRecord.startTime = new Date(Date.now());
      this.sleepRecord.endTime = new Date(Date.now());
    }
    this.timerStartedAt = Date.now() - (this.timer || 0);
    this.timerRef = setInterval(() => {
      this.timer = Date.now() - this.timerStartedAt;
    });
  }

  stopTimer() {
    clearInterval(this.timerRef);
    this.sleepRecord.endTime = new Date(Date.now())
    this.timerRunning = false;
  }

  resetTimer() {
    this.stopTimer();
    this.timer = 0;
    this.sleepRecord.startTime = new Date(Date.now());
    this.sleepRecord.endTime = new Date(Date.now());
    this.timerRunning = false;
  }

  saveSleepSession() {
    this.sleepService.addSleep(this.sleepRecord)
      .subscribe({
          next: (complete) => {
            console.log(complete);
            this.router.navigate(['/menu'])
          },
          error: (error) => {
            console.log(error);
          }
        }
      );
  }
}

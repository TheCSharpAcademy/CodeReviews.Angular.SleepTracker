import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SleepRecordService } from '../shared/sleep-record.service';
import { CreateSleepRecord } from '../shared/create-sleep-record.interface';
import { SuccessSnackBarComponent } from '../snack-bars/success-snack-bar/success-snack-bar.component';
import { ErrorSnackBarComponent } from '../snack-bars/error-snack-bar/error-snack-bar.component';

@Component({
  selector: 'app-sleep-timer',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './sleep-timer.component.html',
  styleUrl: './sleep-timer.component.scss',
})
export class SleepTimerComponent implements OnDestroy {
  private _snackBar = inject(MatSnackBar);
  counter: number = 0;
  inProgress: boolean = false;
  timerRef: any;
  timerRunning: boolean = false;
  started: Date | undefined;
  finished: Date | undefined;

  constructor(
    private sleepRecordService: SleepRecordService,
    private router: Router
  ) {}

  getTimerString(milliseconds: number): string {
    const hours = Math.floor(
      (milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    let builder: string = '';
    builder += `${hours}:`.padStart(3, '0');
    builder += `${minutes}:`.padStart(3, '0');
    builder += `${seconds}`.padStart(2, '0');
    return builder;
  }

  onStartTimer() {
    this.timerRunning = true;
    if (!this.started)
    {
      this.started = new Date();
    }
    const startTime = Date.now() - (this.counter || 0);
    this.timerRef = setInterval(() => {
      this.counter = Date.now() - startTime;
    }, 1000);
  }

  onPauseTimer() {
    this.timerRunning = false;
    this.finished = new Date();
    clearInterval(this.timerRef);
  }

  onResetTimer() {
    this.timerRunning = false;
    this.started = undefined;
    this.finished = undefined;
    this.counter = 0;
    clearInterval(this.timerRef);
  }

  ngOnDestroy() {
    clearInterval(this.timerRef);
  }

  onCancel() {
    this.router.navigate(['/']);
  }

  onCreate() {
    if (this.started && this.finished) {
      this.inProgress = true;
      const request: CreateSleepRecord = {
        started: this.getSleepRecordDate(this.started),
        finished: this.getSleepRecordDate(this.finished),
      };
      this.sleepRecordService.createSleepRecord(request).subscribe((result) => {
        this.inProgress = false;
        if (result) {
          this.openSuccessSnackBar('Sleep created successfully!');
          this.router.navigate(['/']);
        } else {
          this.openErrorSnackBar('Unable to create Sleep!');
        }
      });
    }
  }

  isAbleToCreate(): boolean {
    if (!this.started && !this.finished)
    {
      return false;
    }
    return !this.timerRunning || this.inProgress;
  }

  // NOTE: I do not care for seconds and milliseconds.
  getSleepRecordDate(date: Date) : Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
  }

  openErrorSnackBar(message: string) {
    this._snackBar.openFromComponent(ErrorSnackBarComponent, {
      data: message,
      duration: 3000,
    });
  }

  openSuccessSnackBar(message: string) {
    this._snackBar.openFromComponent(SuccessSnackBarComponent, {
      data: message,
      duration: 3000,
    });
  }
}

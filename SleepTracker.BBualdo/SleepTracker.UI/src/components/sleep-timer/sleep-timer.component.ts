import { Component, NgZone, OnDestroy } from '@angular/core';
import { BackButtonComponent } from '../back-button/back-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgClass } from '@angular/common';
import { Subscription, interval, map } from 'rxjs';
import { SleepSessionsService } from '../../services/sleep-sessions.service';
import { SleepSessionAddDTO } from '../../models/SleepSessionAddDTO';
import { SnackbarService } from '../../services/snackbar.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-sleep-timer',
  standalone: true,
  templateUrl: './sleep-timer.component.html',
  styleUrl: './sleep-timer.component.scss',
  imports: [BackButtonComponent, MatIconModule, MatTooltipModule, NgClass],
})
export class SleepTimerComponent implements OnDestroy {
  status: 'idle' | 'running' | 'paused' = 'idle';

  secondsCount: number = 0;
  private timer: Subscription | undefined;
  session: SleepSessionAddDTO = { startTime: '', endTime: '' };

  constructor(
    private ngZone: NgZone,
    private sessionsService: SleepSessionsService,
    private snackbarService: SnackbarService,
    private dataService: DataService,
  ) {}

  start() {
    this.session.startTime = new Date().toISOString();
    if (this.status === 'idle' || this.status === 'paused') {
      this.status = 'running';

      this.timer = interval(1000)
        .pipe(map(() => this.ngZone.run(() => this.secondsCount++)))
        .subscribe();
    }
  }

  pause() {
    this.session.endTime = new Date().toISOString();
    if (this.status === 'running') {
      this.status = 'paused';
      if (this.timer) {
        this.timer.unsubscribe();
      }
    }
  }

  stop() {
    this.session.startTime = '';
    this.session.endTime = '';
    if (this.status === 'running' || this.status === 'paused') {
      this.status = 'idle';
      if (this.timer) {
        this.timer.unsubscribe();
      }
      this.secondsCount = 0;
    }
  }

  save() {
    if (this.session.startTime === '' || this.session.endTime === '') {
      this.snackbarService.snackbarLog('Saving failed.');
      return;
    }
    this.sessionsService.addSession(this.session).subscribe(() => {
      this.sessionsService.getSessions().subscribe((sessions) => {
        this.dataService.sessionsSubject.next(sessions);
      });
    });
    this.stop();
  }

  formatSeconds(): string {
    const hours = Math.floor(this.secondsCount / 3600);
    const minutes = Math.floor((this.secondsCount % 3600) / 60);
    const seconds = this.secondsCount % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  ngOnDestroy(): void {
    if (this.timer) {
      this.timer.unsubscribe();
    }
  }
}

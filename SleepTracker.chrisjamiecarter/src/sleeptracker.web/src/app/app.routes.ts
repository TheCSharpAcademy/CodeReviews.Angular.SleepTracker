import { Routes } from '@angular/router';
import { SleepRecordsComponent } from './sleep-records/sleep-records.component';
import { SleepTimerComponent } from './sleep-timer/sleep-timer.component';

export const routes: Routes = [
  {
    path: '',
    component: SleepRecordsComponent,
    title: 'Sleep Tracker - Home',
  },
  {
    path: 'sleep/timer',
    component: SleepTimerComponent,
    title: 'Sleep Tracker - Timer',
  },
];

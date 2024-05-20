import { Injectable } from '@angular/core';
import { SleepSessionsService } from './sleep-sessions.service';
import { BehaviorSubject } from 'rxjs';
import { SleepSession } from '../models/SleepSession';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  sessionsSubject = new BehaviorSubject<SleepSession[]>([]);
  sessions$ = this.sessionsSubject.asObservable();

  constructor(private sessionsService: SleepSessionsService) {
    this.sessionsService.getSessions().subscribe((sessions) => {
      this.sessionsSubject.next(sessions);
    });
  }
}

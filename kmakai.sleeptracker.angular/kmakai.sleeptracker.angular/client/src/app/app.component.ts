import { Component } from '@angular/core';
import { Record } from './models/Record';
import { SleepTrackerService } from './services/sleep-tracker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'client';

  constructor(private sleepService: SleepTrackerService) {}
}

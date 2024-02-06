import { Component } from '@angular/core';
import { SleepRecord } from '../sleep-record';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-sleep-overview',
  templateUrl: './sleep-overview.component.html',
  styleUrl: './sleep-overview.component.css'
})
export class SleepOverviewComponent {
  
  sleeps: SleepRecord[] = [];

  constructor(private api: ApiService) { }
  
  testSleeps(): void{
    this.api.getSleeps()
      .subscribe({
        next: (sleeps) => { console.log(sleeps); },
        error: (response) => { console.log("error occurred" + response); }
      });
  }
}
